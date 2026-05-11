import { NextRequest, NextResponse } from "next/server";
import { buildMockReport } from "@/lib/mock-report";
import { DecodeReport, DecodeRequest, pillars } from "@/lib/types";

const systemPrompt =
  "You are an expert AI career coach helping students and early-career applicants understand career opportunities. You assess a user's current state against a specific job description using the 8 Pillars of Engineering Career Development. Be honest, supportive, practical, and specific. Do not invent experience. Do not guarantee job success. Highlight hidden evidence where the student has relevant experience but has not expressed it in employer language. Return valid JSON only.";

const pillarFramework = `
1. Technical Foundations: programming, computer science fundamentals, tools, frameworks, debugging, testing, data structures, algorithms, APIs, cloud, and software engineering principles.
2. Professional Experience: internships, placements, freelance work, part-time technical work, open-source contributions, research assistantships, or other real-world professional exposure. This is the highest signal.
3. Portfolio & Proof of Work: GitHub projects, deployed apps, technical write-ups, demos, documentation, hackathon projects, and evidence that the user can build things.
4. Soft Skills: communication, teamwork, leadership, mentoring, stakeholder communication, problem-solving, adaptability, organisation, and confidence.
5. Industry Exposure & Events: insight days, career fairs, hackathons, networking events, employer events, spring weeks, conferences, and awareness of how the industry works.
6. Credentials & Continuous Learning: certifications, online courses, university modules, learning plans, bootcamps, independent study, and willingness to keep improving.
7. Strategic Positioning: CV framing, LinkedIn, personal branding, career narrative, role focus, and ability to explain why they fit.
8. Application Readiness & Interview Preparation: CV quality, tailored motivation, STAR examples, interview preparation, coding practice, commercial awareness, and confidence.
`;

const requiredSchema = `
{
  "roleSummary": "string",
  "plainEnglishExplanation": "string",
  "overallReadinessScore": 0,
  "applicationReadinessStage": "Ready to apply | Nearly ready | Needs focused preparation | Build evidence first",
  "estimatedReadinessTimeline": "string",
  "employerWants": ["string"],
  "pillarScores": [
    {
      "pillar": "string",
      "score": 0,
      "status": "Strong | Developing | Needs attention | Missing",
      "explanation": "string",
      "evidenceFound": ["string"],
      "gap": "string",
      "nextAction": "string"
    }
  ],
  "evidenceMap": [
    {
      "requirement": "string",
      "userEvidence": "string",
      "evidenceStrength": "Strong evidence | Hidden evidence | Weak evidence | Missing evidence",
      "relatedPillar": "string",
      "suggestedImprovement": "string"
    }
  ],
  "topPriorityGaps": ["string"],
  "fastestWins": ["string"],
  "roadmap": {
    "immediateFixes": [{ "task": "string", "whyItMatters": "string", "relatedPillar": "string", "difficulty": "Easy | Medium | Hard", "estimatedTime": "string", "impact": "Low | Medium | High" }],
    "sevenDayPlan": [{ "task": "string", "whyItMatters": "string", "relatedPillar": "string", "difficulty": "Easy | Medium | Hard", "estimatedTime": "string", "impact": "Low | Medium | High" }],
    "thirtyDayPlan": [{ "task": "string", "whyItMatters": "string", "relatedPillar": "string", "difficulty": "Easy | Medium | Hard", "estimatedTime": "string", "impact": "Low | Medium | High" }],
    "threeMonthPlan": [{ "task": "string", "whyItMatters": "string", "relatedPillar": "string", "difficulty": "Easy | Medium | Hard", "estimatedTime": "string", "impact": "Low | Medium | High" }]
  },
  "applyRecommendation": { "decision": "Apply now | Apply after small edits | Build evidence first | Not the right fit yet", "reason": "string" },
  "cvBullets": ["string"],
  "motivationAnswer": "string",
  "interviewTalkingPoints": ["string"],
  "starStorySuggestions": ["string"],
  "confidenceMessage": "string"
}
`;

export async function POST(request: NextRequest) {
  let body: DecodeRequest;

  try {
    body = (await request.json()) as DecodeRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.jobDescription?.trim() || !body.userBackground?.trim()) {
    return NextResponse.json(
      { error: "Job description and user background are required." },
      { status: 400 }
    );
  }

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

  if (!endpoint || !apiKey || !deployment || !apiVersion) {
    return NextResponse.json(buildMockReport(body));
  }

  try {
    const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
    const controller = new AbortController();
    const timeout = windowlessTimeout(() => controller.abort(), 15000);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: buildUserPrompt(body)
          }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const detail = await response.text();
      console.error("Azure OpenAI request failed", response.status, detail);
      return NextResponse.json(buildMockReport(body));
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      return NextResponse.json(buildMockReport(body));
    }

    const parsed = JSON.parse(content) as DecodeReport;
    return NextResponse.json(normaliseReport(parsed));
  } catch (error) {
    console.error("Decode route failed", error);
    return NextResponse.json(buildMockReport(body));
  }
}

function windowlessTimeout(callback: () => void, delay: number) {
  return setTimeout(callback, delay);
}

function buildUserPrompt(body: DecodeRequest) {
  return `
Job description/person specification:
${body.jobDescription}

User background:
${body.userBackground}

Selected timeline:
${body.timeline}

Feedback style:
${body.feedbackStyle}

8 Pillars of Engineering Career Development:
${pillarFramework}

Required JSON schema:
${requiredSchema}

Instructions:
- Return valid JSON only, with no markdown.
- Include exactly these 8 pillar scores: ${pillars.join(", ")}.
- Do not invent internships, awards, courses, tools, or outcomes that the user did not provide.
- If evidence is implied but not explicit, mark it as hidden or weak and explain how to make it employer-ready.
- Make roadmap items practical for a student with limited professional networks.
`;
}

function normaliseReport(report: DecodeReport): DecodeReport {
  return {
    ...report,
    overallReadinessScore: clampScore(report.overallReadinessScore),
    pillarScores: report.pillarScores?.map((pillar) => ({
      ...pillar,
      score: clampScore(pillar.score),
      evidenceFound: Array.isArray(pillar.evidenceFound) ? pillar.evidenceFound : []
    })) ?? []
  };
}

function clampScore(score: number) {
  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}
