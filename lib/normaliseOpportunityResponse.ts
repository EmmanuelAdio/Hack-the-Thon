import {
  ApplicationReadinessStage,
  ApplyDecision,
  DecodeReport,
  Difficulty,
  EvidenceStrength,
  Impact,
  PillarStatus,
  RoadmapItem
} from "@/lib/types";

const defaultReport: DecodeReport = {
  roleSummary: "No role summary was returned.",
  plainEnglishExplanation:
    "The decoder returned a partial report. Review the available sections and try again if anything important is missing.",
  overallReadinessScore: 0,
  applicationReadinessStage: "Needs focused preparation",
  estimatedReadinessTimeline: "No readiness timeline was returned.",
  employerWants: [],
  pillarScores: [],
  evidenceMap: [],
  topPriorityGaps: [],
  fastestWins: [],
  roadmap: {
    immediateFixes: [],
    sevenDayPlan: [],
    thirtyDayPlan: [],
    threeMonthPlan: []
  },
  applyRecommendation: {
    decision: "Build evidence first",
    reason: "No apply recommendation was returned."
  },
  cvBullets: [],
  motivationAnswer: "No motivation answer was returned.",
  interviewTalkingPoints: [],
  starStorySuggestions: [],
  confidenceMessage: "Use the returned evidence as a starting point, then tighten the details before applying."
};

const stages: ApplicationReadinessStage[] = [
  "Ready to apply",
  "Nearly ready",
  "Needs focused preparation",
  "Build evidence first"
];

const pillarStatuses: PillarStatus[] = ["Strong", "Developing", "Needs attention", "Missing"];
const evidenceStrengths: EvidenceStrength[] = [
  "Strong evidence",
  "Hidden evidence",
  "Weak evidence",
  "Missing evidence"
];
const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
const impacts: Impact[] = ["Low", "Medium", "High"];
const applyDecisions: ApplyDecision[] = [
  "Apply now",
  "Apply after small edits",
  "Build evidence first",
  "Not the right fit yet"
];

export function normaliseOpportunityResponse(rawResponse: unknown): DecodeReport {
  const raw = unwrapResponse(rawResponse);
  const score = numberFrom(raw, [
    "overallReadinessScore",
    "readinessScore",
    "overall_score",
    "compatibilityScore",
    "compatibility",
    "score"
  ]);

  return {
    roleSummary: stringFrom(raw, ["roleSummary", "role_summary", "summary", "role", "jobSummary"], defaultReport.roleSummary),
    plainEnglishExplanation: stringFrom(
      raw,
      ["plainEnglishExplanation", "plain_english_explanation", "plainEnglish", "explanation", "overview"],
      defaultReport.plainEnglishExplanation
    ),
    overallReadinessScore: clampScore(score ?? defaultReport.overallReadinessScore),
    applicationReadinessStage: enumFrom(
      raw,
      ["applicationReadinessStage", "application_readiness_stage", "readinessStage", "stage", "status"],
      stages,
      stageFromScore(score)
    ),
    estimatedReadinessTimeline: stringFrom(
      raw,
      ["estimatedReadinessTimeline", "estimated_readiness_timeline", "readinessTimeline", "estimatedTimeline", "timeline"],
      defaultReport.estimatedReadinessTimeline
    ),
    employerWants: stringArrayFrom(raw, [
      "employerWants",
      "employer_wants",
      "employerNeeds",
      "requirements",
      "keyRequirements"
    ]),
    pillarScores: normalisePillarScores(valueFrom(raw, ["pillarScores", "pillar_scores", "pillars"])),
    evidenceMap: normaliseEvidenceMap(valueFrom(raw, ["evidenceMap", "evidence_map", "requirementEvidence", "evidence"])),
    topPriorityGaps: stringArrayFrom(raw, ["topPriorityGaps", "top_priority_gaps", "priorityGaps", "gaps"]),
    fastestWins: stringArrayFrom(raw, ["fastestWins", "fastest_wins", "quickWins", "wins"]),
    roadmap: normaliseRoadmap(valueFrom(raw, ["roadmap", "plan", "actionPlan"])),
    applyRecommendation: normaliseApplyRecommendation(
      valueFrom(raw, ["applyRecommendation", "apply_recommendation", "recommendation", "apply"])
    ),
    cvBullets: stringArrayFrom(raw, ["cvBullets", "cv_bullets", "resumeBullets", "applicationBullets"]),
    motivationAnswer: stringFrom(
      raw,
      ["motivationAnswer", "motivation_answer", "coverLetterAnswer", "whyThisRole"],
      defaultReport.motivationAnswer
    ),
    interviewTalkingPoints: stringArrayFrom(raw, [
      "interviewTalkingPoints",
      "interview_talking_points",
      "talkingPoints"
    ]),
    starStorySuggestions: stringArrayFrom(raw, [
      "starStorySuggestions",
      "star_story_suggestions",
      "starStories",
      "starExamples"
    ]),
    confidenceMessage: stringFrom(
      raw,
      ["confidenceMessage", "confidence_message", "encouragement", "finalMessage"],
      defaultReport.confidenceMessage
    )
  };
}

function unwrapResponse(rawResponse: unknown) {
  const raw = asRecord(rawResponse);
  for (const key of ["report", "result", "data", "opportunityReport"]) {
    const candidate = raw[key];
    if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
      return candidate as Record<string, unknown>;
    }
  }
  return raw;
}

function normalisePillarScores(value: unknown): DecodeReport["pillarScores"] {
  if (!Array.isArray(value)) {
    return defaultReport.pillarScores;
  }

  return value.map((item) => {
    const raw = asRecord(item);
    const score = clampScore(numberFrom(raw, ["score", "value", "readinessScore", "points"]) ?? 0);

    return {
      pillar: stringFrom(raw, ["pillar", "name", "title", "category"], "Unnamed pillar"),
      score,
      status: enumFrom(raw, ["status", "rating", "level"], pillarStatuses, pillarStatusFromScore(score)),
      explanation: stringFrom(raw, ["explanation", "summary", "rationale", "reason"], "No explanation was returned."),
      evidenceFound: stringArrayFrom(raw, ["evidenceFound", "evidence_found", "evidence", "userEvidence"]),
      gap: stringFrom(raw, ["gap", "gaps", "missing", "weakness"], "No gap was returned."),
      nextAction: stringFrom(raw, ["nextAction", "next_action", "action", "recommendation"], "No next action was returned.")
    };
  });
}

function normaliseEvidenceMap(value: unknown): DecodeReport["evidenceMap"] {
  if (!Array.isArray(value)) {
    return defaultReport.evidenceMap;
  }

  return value.map((item) => {
    const raw = asRecord(item);

    return {
      requirement: stringFrom(raw, ["requirement", "jobRequirement", "criterion", "employerWant"], "Unnamed requirement"),
      userEvidence: stringFrom(raw, ["userEvidence", "user_evidence", "evidence", "match"], "No evidence was returned."),
      evidenceStrength: enumFrom(
        raw,
        ["evidenceStrength", "evidence_strength", "strength", "confidence"],
        evidenceStrengths,
        "Weak evidence"
      ),
      relatedPillar: stringFrom(raw, ["relatedPillar", "related_pillar", "pillar"], "Unmapped pillar"),
      suggestedImprovement: stringFrom(
        raw,
        ["suggestedImprovement", "suggested_improvement", "improvement", "nextAction"],
        "No suggested improvement was returned."
      )
    };
  });
}

function normaliseRoadmap(value: unknown): DecodeReport["roadmap"] {
  const raw = asRecord(value);

  return {
    immediateFixes: normaliseRoadmapItems(
      valueFrom(raw, ["immediateFixes", "immediate_fixes", "immediate", "now"])
    ),
    sevenDayPlan: normaliseRoadmapItems(
      valueFrom(raw, ["sevenDayPlan", "seven_day_plan", "sevenDays", "7_days", "7days"])
    ),
    thirtyDayPlan: normaliseRoadmapItems(
      valueFrom(raw, ["thirtyDayPlan", "thirty_day_plan", "thirtyDays", "30_days", "30days"])
    ),
    threeMonthPlan: normaliseRoadmapItems(
      valueFrom(raw, ["threeMonthPlan", "three_month_plan", "threeMonths", "3_months", "3months"])
    )
  };
}

function normaliseRoadmapItems(value: unknown): RoadmapItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return {
        task: item,
        whyItMatters: "This action was recommended by the decoder.",
        relatedPillar: "Application Readiness & Interview Preparation",
        difficulty: "Medium",
        estimatedTime: "Time varies",
        impact: "Medium"
      };
    }

    const raw = asRecord(item);

    return {
      task: stringFrom(raw, ["task", "title", "action", "name"], "Unnamed task"),
      whyItMatters: stringFrom(
        raw,
        ["whyItMatters", "why_it_matters", "why", "reason", "description"],
        "This action was recommended by the decoder."
      ),
      relatedPillar: stringFrom(
        raw,
        ["relatedPillar", "related_pillar", "pillar"],
        "Application Readiness & Interview Preparation"
      ),
      difficulty: enumFrom(raw, ["difficulty", "effort"], difficulties, "Medium"),
      estimatedTime: stringFrom(raw, ["estimatedTime", "estimated_time", "time", "duration"], "Time varies"),
      impact: enumFrom(raw, ["impact", "priority"], impacts, "Medium")
    };
  });
}

function normaliseApplyRecommendation(value: unknown): DecodeReport["applyRecommendation"] {
  if (typeof value === "string") {
    return {
      decision: "Apply after small edits",
      reason: value
    };
  }

  const raw = asRecord(value);

  return {
    decision: enumFrom(raw, ["decision", "status", "recommendation"], applyDecisions, defaultReport.applyRecommendation.decision),
    reason: stringFrom(raw, ["reason", "rationale", "explanation"], defaultReport.applyRecommendation.reason)
  };
}

function valueFrom(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }

  return undefined;
}

function stringFrom(record: Record<string, unknown>, keys: string[], fallback: string) {
  const value = valueFrom(record, keys);

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return fallback;
}

function numberFrom(record: Record<string, unknown>, keys: string[]) {
  const value = valueFrom(record, keys);

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function stringArrayFrom(record: Record<string, unknown>, keys: string[]) {
  const value = valueFrom(record, keys);

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        const raw = asRecord(item);
        return stringFrom(raw, ["text", "label", "name", "title", "requirement"], "");
      })
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function enumFrom<T extends string>(
  record: Record<string, unknown>,
  keys: string[],
  allowedValues: readonly T[],
  fallback: T
) {
  const value = stringFrom(record, keys, "");
  const directMatch = allowedValues.find((option) => option.toLowerCase() === value.toLowerCase());

  return directMatch ?? fallback;
}

function clampScore(score: number) {
  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function stageFromScore(score?: number): ApplicationReadinessStage {
  const normalisedScore = clampScore(score ?? 0);

  if (normalisedScore >= 80) {
    return "Ready to apply";
  }

  if (normalisedScore >= 65) {
    return "Nearly ready";
  }

  if (normalisedScore >= 40) {
    return "Needs focused preparation";
  }

  return "Build evidence first";
}

function pillarStatusFromScore(score: number): PillarStatus {
  if (score >= 75) {
    return "Strong";
  }

  if (score >= 55) {
    return "Developing";
  }

  if (score >= 25) {
    return "Needs attention";
  }

  return "Missing";
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}
