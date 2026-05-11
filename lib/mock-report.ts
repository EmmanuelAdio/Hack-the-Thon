import { DecodeReport, DecodeRequest } from "@/lib/types";

export function buildMockReport(request: Partial<DecodeRequest> = {}): DecodeReport {
  const timeline = request.timeline ?? "7 days";

  return {
    roleSummary:
      "This opportunity is a software engineering internship focused on programming fundamentals, teamwork, communication, and early exposure to scalable systems. Testing, cloud, APIs, and databases are useful bonus signals.",
    plainEnglishExplanation:
      "You already have several relevant signals, but they need to be translated into employer language. Your React app, Java group project, peer mentoring, society organising, and Python project can all support the application if you make the outcomes, tools, and collaboration clearer.",
    overallReadinessScore: 72,
    applicationReadinessStage: "Nearly ready",
    estimatedReadinessTimeline:
      timeline === "Apply now"
        ? "You can apply now after a focused CV and motivation refresh."
        : `With a ${timeline} target, prioritise CV framing, project evidence, and interview stories before submitting.`,
    employerWants: [
      "Programming experience with clear examples of shipped or working code",
      "Problem-solving ability shown through projects or coursework",
      "Teamwork and communication in group delivery settings",
      "Awareness of agile development and scalable systems",
      "Desirable exposure to testing, cloud platforms, APIs, or databases"
    ],
    pillarScores: [
      {
        pillar: "Technical Foundations",
        score: 74,
        status: "Developing",
        explanation:
          "React, Java, and Python give you credible technical foundations for an internship, especially if you describe what you built and how you debugged problems.",
        evidenceFound: ["React weather app", "Java group project", "Python data analysis project"],
        gap: "Testing, APIs, databases, and cloud exposure are not yet clearly evidenced.",
        nextAction: "Add a technical skills section and include one bullet per project naming tools, APIs, and testing decisions."
      },
      {
        pillar: "Professional Experience",
        score: 35,
        status: "Needs attention",
        explanation:
          "You have no internship yet, which is normal for the target user, but this is the highest-signal pillar for employers.",
        evidenceFound: ["Peer mentoring", "Society event organisation"],
        gap: "No direct professional software engineering exposure is shown.",
        nextAction: "Reframe mentoring and society work as responsibility, stakeholder communication, and delivery experience."
      },
      {
        pillar: "Portfolio & Proof of Work",
        score: 70,
        status: "Developing",
        explanation:
          "Your React and Python projects are strong starting points, but they need visible proof through GitHub, READMEs, screenshots, and outcomes.",
        evidenceFound: ["React weather app", "Python data analysis project", "Java group project"],
        gap: "The projects are not yet described as demonstrable proof of work.",
        nextAction: "Improve one GitHub README with screenshots, setup steps, features, and what you learned."
      },
      {
        pillar: "Soft Skills",
        score: 82,
        status: "Strong",
        explanation:
          "Peer mentoring, teamwork in Java, and organising a society event give strong communication, collaboration, and leadership evidence.",
        evidenceFound: ["Peer mentoring", "Java group project", "Society event organisation"],
        gap: "The impact of these activities needs clearer examples and outcomes.",
        nextAction: "Prepare two STAR stories: one for teamwork and one for helping another student solve a problem."
      },
      {
        pillar: "Industry Exposure & Events",
        score: 48,
        status: "Needs attention",
        explanation:
          "The society event shows initiative, but the role asks for awareness of software delivery and scalable systems.",
        evidenceFound: ["University society event organisation"],
        gap: "No explicit employer events, hackathons, agile practice, or industry learning are mentioned.",
        nextAction: "Attend one employer session or watch one engineering talk, then add a short reflection to your preparation notes."
      },
      {
        pillar: "Credentials & Continuous Learning",
        score: 62,
        status: "Developing",
        explanation:
          "Your Computer Science degree and independent Python project show active learning, but extra learning around testing or cloud would strengthen the fit.",
        evidenceFound: ["Second-year Computer Science student", "Python data analysis project"],
        gap: "No recent course, certification, or focused learning plan is named.",
        nextAction: "Complete a short testing or cloud fundamentals module and mention the practical takeaway."
      },
      {
        pillar: "Strategic Positioning",
        score: 66,
        status: "Developing",
        explanation:
          "Your raw evidence fits the role better than it may first appear, but the narrative needs to connect projects, teamwork, and motivation.",
        evidenceFound: ["Programming projects", "Peer mentoring", "Society leadership"],
        gap: "Your background does not yet explicitly say why this software engineering internship is the next step.",
        nextAction: "Write a 4-sentence career narrative linking CS study, projects, teamwork, and interest in scalable systems."
      },
      {
        pillar: "Application Readiness & Interview Preparation",
        score: 58,
        status: "Needs attention",
        explanation:
          "You are close enough to apply, but your CV bullets, motivation answer, and interview stories need a focused polish.",
        evidenceFound: ["Multiple project and teamwork examples"],
        gap: "No tailored CV bullets, STAR examples, or coding preparation are shown.",
        nextAction: "Tailor the CV to this advert and practise three short interview answers before applying."
      }
    ],
    evidenceMap: [
      {
        requirement: "Programming experience",
        userEvidence: "React weather app, Java group project, Python data analysis project",
        evidenceStrength: "Strong evidence",
        relatedPillar: "Technical Foundations",
        suggestedImprovement: "Name the languages, libraries, problem solved, and one technical challenge for each project."
      },
      {
        requirement: "Teamwork and communication",
        userEvidence: "Java group project and peer mentoring",
        evidenceStrength: "Strong evidence",
        relatedPillar: "Soft Skills",
        suggestedImprovement: "Add a CV bullet showing collaboration, communication, and the result of the group project."
      },
      {
        requirement: "Agile development exposure",
        userEvidence: "Group project may have involved planning, tasks, or reviews",
        evidenceStrength: "Hidden evidence",
        relatedPillar: "Professional Experience",
        suggestedImprovement: "If true, describe stand-ups, task boards, Git branches, sprints, or retrospectives in simple terms."
      },
      {
        requirement: "Testing, APIs, cloud, or databases",
        userEvidence: "React weather app may have used an API, but testing/cloud/database evidence is absent",
        evidenceStrength: "Weak evidence",
        relatedPillar: "Technical Foundations",
        suggestedImprovement: "Add API details to the project and write a few basic tests or deploy the app."
      },
      {
        requirement: "Interest in scalable systems",
        userEvidence: "No direct scalable systems example yet",
        evidenceStrength: "Missing evidence",
        relatedPillar: "Strategic Positioning",
        suggestedImprovement: "Prepare a motivation sentence explaining what scalable systems means to you and what you want to learn."
      }
    ],
    topPriorityGaps: [
      "No internship or direct professional engineering experience yet",
      "Testing, cloud, APIs, and deployment evidence needs to be clearer",
      "Application materials need tailored CV bullets and interview-ready stories"
    ],
    fastestWins: [
      "Rewrite project bullets using action, tool, outcome, and learning",
      "Improve one GitHub README with screenshots and setup instructions",
      "Prepare one motivation answer and three STAR stories"
    ],
    roadmap: {
      immediateFixes: [
        {
          task: "Rewrite three CV bullets for the React, Java, and Python projects",
          whyItMatters: "Clear project bullets make existing evidence visible to recruiters quickly.",
          relatedPillar: "Strategic Positioning",
          difficulty: "Easy",
          estimatedTime: "60-90 minutes",
          impact: "High"
        },
        {
          task: "Draft a 90-second motivation answer for this internship",
          whyItMatters: "It helps you explain why the role is a logical next step.",
          relatedPillar: "Application Readiness & Interview Preparation",
          difficulty: "Easy",
          estimatedTime: "30 minutes",
          impact: "High"
        }
      ],
      sevenDayPlan: [
        {
          task: "Upgrade the React weather app README",
          whyItMatters: "A recruiter can understand your proof of work without running the project.",
          relatedPillar: "Portfolio & Proof of Work",
          difficulty: "Easy",
          estimatedTime: "2 hours",
          impact: "High"
        },
        {
          task: "Add basic tests or API notes to one project",
          whyItMatters: "Testing and API exposure directly match the desirable criteria.",
          relatedPillar: "Technical Foundations",
          difficulty: "Medium",
          estimatedTime: "3-5 hours",
          impact: "High"
        }
      ],
      thirtyDayPlan: [
        {
          task: "Deploy one portfolio project and add the live link to your CV",
          whyItMatters: "A deployed project is stronger evidence than a description alone.",
          relatedPillar: "Portfolio & Proof of Work",
          difficulty: "Medium",
          estimatedTime: "1 weekend",
          impact: "High"
        },
        {
          task: "Complete a short cloud or testing fundamentals course",
          whyItMatters: "It fills a named gap in the internship advert.",
          relatedPillar: "Credentials & Continuous Learning",
          difficulty: "Medium",
          estimatedTime: "6-8 hours",
          impact: "Medium"
        }
      ],
      threeMonthPlan: [
        {
          task: "Contribute to a small open-source issue or university technical project",
          whyItMatters: "It creates professional-style evidence when you do not yet have an internship.",
          relatedPillar: "Professional Experience",
          difficulty: "Hard",
          estimatedTime: "2-4 weeks",
          impact: "High"
        },
        {
          task: "Build a deeper portfolio project with database, API, tests, and deployment",
          whyItMatters: "It creates evidence across the largest number of readiness pillars.",
          relatedPillar: "Portfolio & Proof of Work",
          difficulty: "Hard",
          estimatedTime: "4-8 weeks",
          impact: "High"
        }
      ]
    },
    applyRecommendation: {
      decision: "Apply after small edits",
      reason:
        "You have enough relevant evidence to be credible, but a quick tailoring pass will make the application much stronger."
    },
    cvBullets: [
      "Built a React weather application that retrieves and presents live weather data, strengthening API integration, UI development, and debugging skills.",
      "Collaborated in a Java group project, contributing to feature delivery, problem-solving discussions, and shared code quality decisions.",
      "Mentored fellow students and helped organise a university society event, developing communication, leadership, and stakeholder coordination skills."
    ],
    motivationAnswer:
      "I am applying because this internship connects directly with the software projects I have started building at university and independently. Through React, Java, and Python projects, I have developed a foundation in programming and problem-solving, and my peer mentoring and society work have strengthened how I communicate and collaborate. I am especially interested in learning how engineering teams build reliable, scalable systems in a professional environment.",
    interviewTalkingPoints: [
      "How your React app helped you learn API-driven development and debugging",
      "What you contributed to the Java group project and how the team worked together",
      "How peer mentoring improved your communication and ability to explain technical ideas"
    ],
    starStorySuggestions: [
      "A teamwork story from the Java group project where you resolved ambiguity or divided work effectively",
      "A communication story from peer mentoring where you helped someone understand a difficult concept",
      "A leadership story from organising the society event under time or coordination pressure"
    ],
    confidenceMessage:
      "You are not starting from zero. Your experience is real; the next step is making it legible to an employer."
  };
}
