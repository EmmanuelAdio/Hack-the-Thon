export type Timeline = "Apply now" | "7 days" | "30 days" | "3 months";
export type FeedbackStyle = "Encouraging" | "Strict recruiter" | "Mentor";

export type PillarStatus = "Strong" | "Developing" | "Needs attention" | "Missing";
export type ApplicationReadinessStage =
  | "Ready to apply"
  | "Nearly ready"
  | "Needs focused preparation"
  | "Build evidence first";
export type EvidenceStrength =
  | "Strong evidence"
  | "Hidden evidence"
  | "Weak evidence"
  | "Missing evidence";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Impact = "Low" | "Medium" | "High";
export type ApplyDecision =
  | "Apply now"
  | "Apply after small edits"
  | "Build evidence first"
  | "Not the right fit yet";

export type DecodeRequest = {
  jobDescription: string;
  userBackground: string;
  timeline: Timeline;
  feedbackStyle: FeedbackStyle;
};

export type PillarScore = {
  pillar: string;
  score: number;
  status: PillarStatus;
  explanation: string;
  evidenceFound: string[];
  gap: string;
  nextAction: string;
};

export type EvidenceMapItem = {
  requirement: string;
  userEvidence: string;
  evidenceStrength: EvidenceStrength;
  relatedPillar: string;
  suggestedImprovement: string;
};

export type RoadmapItem = {
  task: string;
  whyItMatters: string;
  relatedPillar: string;
  difficulty: Difficulty;
  estimatedTime: string;
  impact: Impact;
};

export type DecodeReport = {
  roleSummary: string;
  plainEnglishExplanation: string;
  overallReadinessScore: number;
  applicationReadinessStage: ApplicationReadinessStage;
  estimatedReadinessTimeline: string;
  employerWants: string[];
  pillarScores: PillarScore[];
  evidenceMap: EvidenceMapItem[];
  topPriorityGaps: string[];
  fastestWins: string[];
  roadmap: {
    immediateFixes: RoadmapItem[];
    sevenDayPlan: RoadmapItem[];
    thirtyDayPlan: RoadmapItem[];
    threeMonthPlan: RoadmapItem[];
  };
  applyRecommendation: {
    decision: ApplyDecision;
    reason: string;
  };
  cvBullets: string[];
  motivationAnswer: string;
  interviewTalkingPoints: string[];
  starStorySuggestions: string[];
  confidenceMessage: string;
};

export const pillars = [
  "Technical Foundations",
  "Professional Experience",
  "Portfolio & Proof of Work",
  "Soft Skills",
  "Industry Exposure & Events",
  "Credentials & Continuous Learning",
  "Strategic Positioning",
  "Application Readiness & Interview Preparation"
] as const;
