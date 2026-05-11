import { NextRequest, NextResponse } from "next/server";
import { buildMockReport } from "@/lib/mock-report";
import { normaliseOpportunityResponse } from "@/lib/normaliseOpportunityResponse";
import { DecodeRequest, pillars } from "@/lib/types";

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
  "roleSummary": "<one short paragraph>",
  "plainEnglishExplanation": "<one paragraph in plain English>",
  "overallReadinessScore": <integer between 0 and 100, calculated from the evidence, never 0 unless the user has truly provided no evidence>,
  "applicationReadinessStage": "<one of: Ready to apply | Nearly ready | Needs focused preparation | Build evidence first>",
  "estimatedReadinessTimeline": "<short sentence>",
  "employerWants": ["<short bullet>"],
  "pillarScores": [
    {
      "pillar": "<one of the 8 pillar names>",
      "score": <integer 0-100, calculated for this pillar from evidence — must vary across pillars>,
      "status": "<one of: Strong | Developing | Needs attention | Missing>",
      "explanation": "<2-3 sentences>",
      "evidenceFound": ["<short phrase>"],
      "gap": "<short sentence>",
      "nextAction": "<short sentence>"
    }
  ],
  "evidenceMap": [
    {
      "requirement": "<single advert requirement>",
      "userEvidence": "<short summary of matching evidence>",
      "evidenceStrength": "<one of: Strong evidence | Hidden evidence | Weak evidence | Missing evidence>",
      "relatedPillar": "<pillar name>",
      "suggestedImprovement": "<short sentence>"
    }
  ],
  "topPriorityGaps": ["<short bullet>"],
  "fastestWins": ["<short bullet>"],
  "roadmap": {
    "immediateFixes": [{ "task": "<imperative task>", "whyItMatters": "<short sentence>", "relatedPillar": "<pillar>", "difficulty": "<Easy | Medium | Hard>", "estimatedTime": "<short>", "impact": "<Low | Medium | High>" }],
    "sevenDayPlan": [{ "task": "<imperative task>", "whyItMatters": "<short sentence>", "relatedPillar": "<pillar>", "difficulty": "<Easy | Medium | Hard>", "estimatedTime": "<short>", "impact": "<Low | Medium | High>" }],
    "thirtyDayPlan": [{ "task": "<imperative task>", "whyItMatters": "<short sentence>", "relatedPillar": "<pillar>", "difficulty": "<Easy | Medium | Hard>", "estimatedTime": "<short>", "impact": "<Low | Medium | High>" }],
    "threeMonthPlan": [{ "task": "<imperative task>", "whyItMatters": "<short sentence>", "relatedPillar": "<pillar>", "difficulty": "<Easy | Medium | Hard>", "estimatedTime": "<short>", "impact": "<Low | Medium | High>" }]
  },
  "applyRecommendation": { "decision": "<one of: Apply now | Apply after small edits | Build evidence first | Not the right fit yet>", "reason": "<short sentence>" },
  "cvBullets": ["<single CV bullet>"],
  "motivationAnswer": "<one short paragraph>",
  "interviewTalkingPoints": ["<short bullet>"],
  "starStorySuggestions": ["<short bullet>"],
  "confidenceMessage": "<one short sentence>"
}
`;

function mockResponse(body: DecodeRequest, reason: string) {
  console.warn(`[decode] falling back to mock report — reason: ${reason}`);
  return NextResponse.json(buildMockReport(body), {
    headers: { "x-decode-source": "mock", "x-decode-reason": reason }
  });
}

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
    const missing = [
      !endpoint && "AZURE_OPENAI_ENDPOINT",
      !apiKey && "AZURE_OPENAI_API_KEY",
      !deployment && "AZURE_OPENAI_DEPLOYMENT",
      !apiVersion && "AZURE_OPENAI_API_VERSION"
    ]
      .filter(Boolean)
      .join(", ");
    return mockResponse(body, `missing env vars: ${missing}`);
  }

  console.log(`[decode] calling Azure deployment=${deployment} apiVersion=${apiVersion}`);

  try {
    const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
    const controller = new AbortController();
    const timeout = windowlessTimeout(() => controller.abort(), 30000);
    let response: Response;
    try {
      response = await fetch(url, {
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
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[decode] Azure HTTP ${response.status}:`, detail.slice(0, 800));
      return mockResponse(body, `azure http ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      console.error("[decode] Azure response had no content", JSON.stringify(data).slice(0, 800));
      return mockResponse(body, "azure response missing content");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error("[decode] Azure content was not valid JSON:", content.slice(0, 800));
      return mockResponse(body, "azure content not valid json");
    }

    const normalised = normaliseOpportunityResponse(parsed);
    console.log(
      `[decode] Azure success — overallReadinessScore=${normalised.overallReadinessScore} pillarScores=${normalised.pillarScores
        .map((p) => p.score)
        .join(",")}`
    );

    return NextResponse.json(normalised, {
      headers: { "x-decode-source": "azure" }
    });
  } catch (error) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    console.error("[decode] route threw:", message);
    return mockResponse(body, `route error: ${message}`);
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
- Return valid JSON only, with no markdown, no comments, and no angle-bracket placeholders.
- Replace every <...> placeholder in the schema with a real value derived from the user background and the job description. The angle brackets are type hints, not literal output.
- Score the user honestly: compute overallReadinessScore as a weighted estimate of the 8 pillar scores against this specific role, then return it as an integer between 0 and 100. Never return 0 unless the user has provided literally no evidence. Most realistic CVs should land between 25 and 85.
- Each of the 8 pillar scores must also be an integer between 0 and 100 and should vary based on the evidence — do not return all the same value.
- Include exactly these 8 pillar scores in this order: ${pillars.join(", ")}.
- Do not invent internships, awards, courses, tools, or outcomes that the user did not provide.
- If evidence is implied but not explicit, mark it as hidden or weak and explain how to make it employer-ready.
- Make roadmap items practical for a student with limited professional networks.
`;
}
