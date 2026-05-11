"use client";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  Clipboard,
  Copy,
  FileText,
  Loader2,
  Map,
  PlayCircle,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { buildMockReport } from "@/lib/mock-report";
import { normaliseOpportunityResponse } from "@/lib/normaliseOpportunityResponse";
import { DecodeReport, DecodeRequest, EvidenceStrength, FeedbackStyle, Impact, PillarStatus, RoadmapItem, Timeline } from "@/lib/types";

const demoJobDescription =
  "Software Engineering Intern. We are looking for a motivated student with programming experience, problem-solving ability, teamwork, communication skills, agile development exposure, and an interest in building scalable systems. Experience with testing, cloud platforms, APIs, or databases is desirable.";

const demoUserBackground =
  "I am a second-year Computer Science student. I have built a React weather app, worked on a Java group project, volunteered as a peer mentor, and helped organise a university society event. I have used Python for a small data analysis project but I have not done an internship before.";

const timelineOptions: Timeline[] = ["Apply now", "7 days", "30 days", "3 months"];
const feedbackOptions: FeedbackStyle[] = ["Encouraging", "Strict recruiter", "Mentor"];

type RoadmapKey = keyof DecodeReport["roadmap"];

type RoadmapPhase = {
  key: RoadmapKey;
  label: string;
  tone: string;
  icon: string;
  color: string;
};

const roadmapPhases: RoadmapPhase[] = [
  { key: "immediateFixes", label: "Immediate fixes", tone: "Now", icon: "⚡", color: "#ef4444" },
  { key: "sevenDayPlan", label: "Short-term preparation", tone: "This week", icon: "📅", color: "#4f8ef7" },
  { key: "thirtyDayPlan", label: "Evidence building", tone: "This month", icon: "🔨", color: "#a855f7" },
  { key: "threeMonthPlan", label: "Longer-term growth", tone: "Next quarter", icon: "🚀", color: "#22c55e" }
];

function impactBadgeTone(impact: Impact) {
  if (impact === "High") return "bg-rose-100 text-rose-700";
  if (impact === "Medium") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-600";
}

export default function Home() {
  const [form, setForm] = useState<DecodeRequest>({
    jobDescription: "",
    userBackground: "",
    timeline: "7 days",
    feedbackStyle: "Encouraging"
  });
  const [report, setReport] = useState<DecodeReport | null>(null);
  const [reportSource, setReportSource] = useState<"azure" | "mock" | "client-fallback" | "">("");
  const [reportReason, setReportReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copiedItem, setCopiedItem] = useState("");

  const completedCount = useMemo(
    () => Object.values(completedTasks).filter(Boolean).length,
    [completedTasks]
  );

  const totalRoadmapItems = useMemo(() => {
    if (!report) {
      return 0;
    }

    return Object.values(report.roadmap).reduce((total, items) => total + items.length, 0);
  }, [report]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.jobDescription.trim() || !form.userBackground.trim()) {
      setError("Add both the opportunity details and your background before decoding.");
      return;
    }

    setLoading(true);
    setCompletedTasks({});

    try {
      const response = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to decode this opportunity.");
      }

      const source = (response.headers.get("x-decode-source") as "azure" | "mock" | null) ?? "azure";
      const reason = response.headers.get("x-decode-reason") ?? "";
      setReportSource(source);
      setReportReason(reason);
      setReport(normaliseOpportunityResponse(data));
      window.setTimeout(() => {
        document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (submitError) {
      setReport(buildMockReport(form));
      setReportSource("client-fallback");
      setReportReason(submitError instanceof Error ? submitError.message : "fetch failed");
      setError(
        submitError instanceof Error
          ? `${submitError.message} Showing demo results so you can still explore the report.`
          : "The decoder API could not be reached. Showing demo results so you can still explore the report."
      );
      window.setTimeout(() => {
        document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setForm({
      jobDescription: demoJobDescription,
      userBackground: demoUserBackground,
      timeline: "7 days",
      feedbackStyle: "Mentor"
    });
    setError("");
  }

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedItem(id);
    window.setTimeout(() => setCopiedItem(""), 1400);
  }

  function toggleTask(taskId: string, value: boolean) {
    setCompletedTasks((current) => ({ ...current, [taskId]: value }));
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Azure OpenAI career coach</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Opportunity Decoder</h1>
            </div>
          </div>
          <p className="max-w-xl text-base font-medium text-slate-600">
            Decode the role. Discover your evidence. Apply with confidence.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">Decode an opportunity</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Paste the role and your evidence</h2>
              </div>
              <FileText className="h-8 w-8 text-blue-600" aria-hidden="true" />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <TextArea
                label="Job description/person specification"
                value={form.jobDescription}
                placeholder="Paste the opportunity, person specification, scholarship brief, or internship advert..."
                onChange={(value) => setForm((current) => ({ ...current, jobDescription: value }))}
              />
              <TextArea
                label="CV, skills, projects, volunteering, societies, or other experiences"
                value={form.userBackground}
                placeholder="Paste your CV summary or describe your modules, projects, jobs, responsibilities, societies, and achievements..."
                onChange={(value) => setForm((current) => ({ ...current, userBackground: value }))}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Target timeline</span>
                  <select
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={form.timeline}
                    onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value as Timeline }))}
                  >
                    {timelineOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Feedback style</span>
                  <select
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={form.feedbackStyle}
                    onChange={(event) => setForm((current) => ({ ...current, feedbackStyle: event.target.value as FeedbackStyle }))}
                  >
                    {feedbackOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Target className="h-5 w-5" aria-hidden="true" />}
                  {loading ? "Decoding your opportunity..." : "Decode Opportunity"}
                </button>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <PlayCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  Use demo example
                </button>
              </div>
            </form>
          </div>

          <aside className="rounded-[1.5rem] border border-white/80 bg-slate-950 p-6 text-white shadow-soft">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h2 className="text-2xl font-bold">What the decoder produces</h2>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                "Readiness score and application stage",
                "8-pillar engineering career dashboard",
                "Evidence map from advert language to your background",
                "Roadmap from current state to ready-to-apply",
                "CV bullets, motivation answer, STAR stories, and apply recommendation"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-cyan-300" aria-hidden="true" />
                  <span className="text-sm leading-6 text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {report ? (
          <section id="dashboard" className="space-y-6">
            {reportSource && reportSource !== "azure" ? (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                <Sparkles className="mt-0.5 h-5 w-5 flex-none text-amber-600" aria-hidden="true" />
                <div>
                  <p className="font-bold">
                    Showing the built-in demo report — the live Azure call did not run.
                  </p>
                  <p className="mt-1 text-amber-800">
                    The scores and recommendations below are static placeholders, so they will look
                    the same for every CV. Reason: <span className="font-mono text-xs">{reportReason || "unknown"}</span>. Check your <span className="font-mono text-xs">npm run dev</span> terminal for a <span className="font-mono text-xs">[decode]</span> log line with details.
                  </p>
                </div>
              </div>
            ) : null}
            <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
              <ScorePanel report={report} />
              <SummaryPanel report={report} />
            </section>

            <section className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
              <SectionTitle icon={<Trophy className="h-6 w-6" />} kicker="8-pillar dashboard" title="Readiness by career development pillar" />
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {report.pillarScores.map((pillar) => (
                  <article key={pillar.pillar} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-slate-950">{pillar.pillar}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(pillar.status)}`}>
                        {pillar.status}
                      </span>
                    </div>
                    <ProgressBar score={pillar.score} />
                    <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.explanation}</p>
                    <div className="mt-4 space-y-3 text-sm">
                      <InfoBlock title="Evidence found" value={pillar.evidenceFound.join(", ") || "None yet"} />
                      <InfoBlock title="Gap" value={pillar.gap} />
                      <InfoBlock title="Next action" value={pillar.nextAction} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
              <SectionTitle icon={<Map className="h-6 w-6" />} kicker="Evidence map" title="Translate the advert into proof" />
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-sm">
                  <thead>
                    <tr className="text-slate-600">
                      {["Job requirement", "User evidence", "Strength", "Pillar", "Suggested improvement"].map((heading) => (
                        <th key={heading} className="border-b border-slate-200 bg-slate-50 px-4 py-3 font-bold first:rounded-tl-xl last:rounded-tr-xl">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.evidenceMap.map((item, index) => (
                      <tr key={`${item.requirement}-${index}`} className="align-top">
                        <td className="border-b border-slate-100 px-4 py-4 font-semibold text-slate-950">{item.requirement}</td>
                        <td className="border-b border-slate-100 px-4 py-4 text-slate-600">{item.userEvidence}</td>
                        <td className="border-b border-slate-100 px-4 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${evidenceClass(item.evidenceStrength)}`}>
                            {item.evidenceStrength}
                          </span>
                        </td>
                        <td className="border-b border-slate-100 px-4 py-4 text-slate-600">{item.relatedPillar}</td>
                        <td className="border-b border-slate-100 px-4 py-4 text-slate-600">{item.suggestedImprovement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <SectionTitle icon={<Clipboard className="h-6 w-6" />} kicker="Interactive roadmap" title="From current state to ready-to-apply" />
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  {completedCount}/{totalRoadmapItems} completed
                </span>
              </div>
              <InteractiveRoadmap
                report={report}
                completedTasks={completedTasks}
                onToggleTask={toggleTask}
              />
            </section>

            <section className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
              <SectionTitle icon={<BadgeCheck className="h-6 w-6" />} kicker="Application booster" title="Make the application sharper" />
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <BoosterCard title="Tailored CV bullets">
                  <div className="space-y-3">
                    {report.cvBullets.map((bullet, index) => (
                      <CopyRow key={bullet} id={`bullet-${index}`} text={bullet} copiedItem={copiedItem} onCopy={copyText} />
                    ))}
                  </div>
                </BoosterCard>
                <BoosterCard title="Short motivation answer">
                  <CopyRow id="motivation" text={report.motivationAnswer} copiedItem={copiedItem} onCopy={copyText} />
                </BoosterCard>
                <BoosterCard title="Interview talking points">
                  <SimpleList items={report.interviewTalkingPoints} />
                </BoosterCard>
                <BoosterCard title="STAR story suggestions">
                  <SimpleList items={report.starStorySuggestions} />
                </BoosterCard>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">Should I apply?</p>
                  <h3 className="mt-2 text-2xl font-bold">{report.applyRecommendation.decision}</h3>
                  <p className="mt-3 text-sm leading-6 text-blue-50">{report.applyRecommendation.reason}</p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Confidence message</p>
                  <p className="mt-2 text-lg font-semibold leading-7 text-emerald-950">{report.confidenceMessage}</p>
                </div>
              </div>
            </section>
          </section>
        ) : null}
      </section>
    </main>
  );
}

function TextArea({
  label,
  value,
  placeholder,
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        className="min-h-36 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ScorePanel({ report }: { report: DecodeReport }) {
  const ringColor =
    report.overallReadinessScore >= 75
      ? "#059669"
      : report.overallReadinessScore >= 55
        ? "#2563eb"
        : "#f59e0b";

  return (
    <div className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Overall readiness</p>
      <div className="mt-5 flex flex-col items-center text-center">
        <div
          className="score-ring flex h-48 w-48 items-center justify-center rounded-full"
          style={{ "--score": report.overallReadinessScore, "--ring-color": ringColor } as React.CSSProperties}
          aria-label={`Overall readiness score ${report.overallReadinessScore} out of 100`}
        >
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
            <span className="text-5xl font-black text-slate-950">{report.overallReadinessScore}</span>
            <span className="text-sm font-bold text-slate-500">/ 100</span>
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-bold text-slate-950">{report.applicationReadinessStage}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{report.estimatedReadinessTimeline}</p>
      </div>
    </div>
  );
}

function SummaryPanel({ report }: { report: DecodeReport }) {
  return (
    <div className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-soft">
      <SectionTitle icon={<Target className="h-6 w-6" />} kicker="Opportunity summary" title="What this role is really asking for" />
      <p className="mt-4 text-base leading-7 text-slate-700">{report.roleSummary}</p>
      <p className="mt-3 text-base leading-7 text-slate-700">{report.plainEnglishExplanation}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <MiniPanel title="Employer wants" items={report.employerWants} />
        <MiniPanel title="Priority gaps" items={report.topPriorityGaps} />
        <MiniPanel title="Fastest wins" items={report.fastestWins} />
      </div>
    </div>
  );
}

function MiniPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.slice(0, 5).map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
            <ArrowRight className="mt-1 h-4 w-4 flex-none text-blue-600" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionTitle({ icon, kicker, title }: { icon: React.ReactNode; kicker: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">{kicker}</p>
        <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      </div>
    </div>
  );
}

function ProgressBar({ score }: { score: number }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm font-bold text-slate-700">
        <span>Score</span>
        <span>{score}/100</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-slate-800">{title}</p>
      <p className="mt-1 leading-6 text-slate-600">{value}</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{children}</span>;
}

function BoosterCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CopyRow({
  id,
  text,
  copiedItem,
  onCopy
}: {
  id: string;
  text: string;
  copiedItem: string;
  onCopy: (id: string, text: string) => void;
}) {
  const copied = copiedItem === id;

  return (
    <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <p className="min-w-0 flex-1 text-sm leading-6 text-slate-700">{text}</p>
      <button
        type="button"
        onClick={() => onCopy(id, text)}
        className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        aria-label="Copy text"
        title="Copy text"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200">
          <Check className="mt-1 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function statusClass(status: PillarStatus) {
  const classes: Record<PillarStatus, string> = {
    Strong: "bg-emerald-100 text-emerald-700",
    Developing: "bg-blue-100 text-blue-700",
    "Needs attention": "bg-amber-100 text-amber-800",
    Missing: "bg-rose-100 text-rose-700"
  };

  return classes[status];
}

function evidenceClass(strength: EvidenceStrength) {
  const classes: Record<EvidenceStrength, string> = {
    "Strong evidence": "bg-emerald-100 text-emerald-700",
    "Hidden evidence": "bg-violet-100 text-violet-700",
    "Weak evidence": "bg-amber-100 text-amber-800",
    "Missing evidence": "bg-rose-100 text-rose-700"
  };

  return classes[strength];
}

type RoadmapStepData = {
  phase: RoadmapPhase;
  milestone: RoadmapItem;
  milestoneId: string;
  branches: RoadmapItem[];
  branchIds: string[];
};

function InteractiveRoadmap({
  report,
  completedTasks,
  onToggleTask
}: {
  report: DecodeReport;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string, value: boolean) => void;
}) {
  const steps: RoadmapStepData[] = roadmapPhases
    .map((phase) => {
      const items = report.roadmap[phase.key];
      if (!items || items.length === 0) {
        return null;
      }

      const [milestone, ...rest] = items;
      return {
        phase,
        milestone,
        milestoneId: `${phase.key}-0-${milestone.task}`,
        branches: rest,
        branchIds: rest.map((item, index) => `${phase.key}-${index + 1}-${item.task}`)
      };
    })
    .filter((step): step is RoadmapStepData => step !== null);

  if (steps.length === 0) {
    return (
      <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
        The decoder did not return any roadmap actions yet.
      </p>
    );
  }

  const milestonesDone = steps.filter((step) => completedTasks[step.milestoneId]).length;
  const milestoneProgress = Math.round((milestonesDone / steps.length) * 100);
  const finalDecision = report.applyRecommendation.decision;
  const finalScore = report.overallReadinessScore;

  return (
    <div className="relative mx-auto w-full max-w-3xl pb-32 pt-10">
      <div className="relative w-full">
        <div
          className="absolute left-1/2 top-0 z-10 h-6 w-6 rounded-full bg-slate-800"
          style={{
            transform: "translate(-50%, -50%)",
            border: "4px solid #fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-12 whitespace-nowrap rounded-full bg-slate-900 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white"
        >
          Today · {finalScore}/100
        </div>

        {steps.map((step, index) => (
          <RoadmapPhaseStep
            key={step.phase.key}
            step={step}
            index={index}
            totalSteps={steps.length}
            completedTasks={completedTasks}
            onToggleTask={onToggleTask}
          />
        ))}

        <div
          className="absolute bottom-0 left-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white"
          style={{
            transform: "translate(-50%, 50%)",
            background: "#22c55e",
            border: "5px solid #fff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
          }}
          aria-hidden="true"
        >
          ⭐
        </div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center">
          <div className="text-lg font-extrabold text-emerald-600">{finalDecision}</div>
          <div className="mt-1 text-sm font-semibold text-slate-500">
            {milestonesDone}/{steps.length} milestones complete · {milestoneProgress}% of plan done
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapPhaseStep({
  step,
  index,
  totalSteps,
  completedTasks,
  onToggleTask
}: {
  step: RoadmapStepData;
  index: number;
  totalSteps: number;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string, value: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;
  const { phase, milestone, milestoneId, branches, branchIds } = step;
  const milestoneDone = Boolean(completedTasks[milestoneId]);
  const curvePath = isLeft ? "M50,0 C10,25 10,75 50,100" : "M50,0 C90,25 90,75 50,100";

  return (
    <div
      style={{
        position: "relative",
        height: 260,
        width: "100%",
        zIndex: hovered ? 50 : totalSteps - index
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
        aria-hidden="true"
      >
        <path d={curvePath} fill="none" stroke="#1e293b" strokeWidth="28" vectorEffect="non-scaling-stroke" />
        <path
          d={curvePath}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="3"
          strokeDasharray="12,12"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: isLeft ? "20%" : "80%",
          transform: "translate(-50%, -50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#fff",
          border: `3px solid ${phase.color}`,
          zIndex: 1
        }}
        aria-hidden="true"
      />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "absolute",
          top: "50%",
          left: isLeft ? "20%" : "80%",
          zIndex: 10
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            left: isLeft ? -24 : -360,
            width: 380,
            height: 200,
            zIndex: 0
          }}
          aria-hidden="true"
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            top: -48,
            width: 48,
            height: 48,
            background: milestoneDone ? "#22c55e" : phase.color,
            borderRadius: "50% 50% 50% 0",
            transform: `rotate(-45deg) ${hovered ? "scale(1.15)" : "scale(1)"}`,
            transformOrigin: "bottom left",
            boxShadow: hovered ? "0 8px 16px rgba(0,0,0,0.2)" : "0 4px 10px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "3px solid #fff",
            zIndex: 2
          }}
        >
          <div style={{ transform: "rotate(45deg)", color: "#fff", fontSize: 20 }}>
            {milestoneDone ? "✓" : phase.icon}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: -38,
            left: isLeft ? 36 : -36,
            transform: isLeft ? "none" : "translateX(-100%)",
            background: "rgba(255,255,255,0.95)",
            padding: "6px 14px",
            borderRadius: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontWeight: 700,
            fontSize: 14,
            color: "#0f172a",
            whiteSpace: "nowrap",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.2s",
            pointerEvents: "none",
            border: "1px solid #e2e8f0",
            zIndex: 1
          }}
        >
          {phase.label}
        </div>

        <div
          style={{
            position: "absolute",
            top: -80,
            left: isLeft ? 48 : -368,
            width: 320,
            opacity: hovered ? 1 : 0,
            visibility: hovered ? "visible" : "hidden",
            transform: hovered ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: hovered ? "auto" : "none",
            zIndex: 10
          }}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-[11px] font-extrabold uppercase tracking-widest"
                style={{ color: phase.color }}
              >
                {phase.tone}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${impactBadgeTone(milestone.impact)}`}>
                {milestone.impact} impact
              </span>
            </div>
            <h4 className="mt-2 text-base font-extrabold leading-snug text-slate-950">{milestone.task}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{milestone.whyItMatters}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge>{milestone.relatedPillar}</Badge>
              <Badge>{milestone.difficulty}</Badge>
              <Badge>{milestone.estimatedTime}</Badge>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-blue-300">
              <input
                type="checkbox"
                checked={milestoneDone}
                onChange={(event) => onToggleTask(milestoneId, event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{milestoneDone ? "Milestone complete" : "Mark milestone complete"}</span>
            </label>

            {branches.length > 0 && (
              <div className="mt-4 border-t border-slate-200 pt-3">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                  Related side quests
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {branches.map((branch, branchIndex) => {
                    const branchId = branchIds[branchIndex];
                    const branchDone = Boolean(completedTasks[branchId]);
                    return (
                      <label
                        key={branchId}
                        className="flex cursor-pointer items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200 transition hover:ring-blue-300"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={branchDone}
                          onChange={(event) => onToggleTask(branchId, event.target.checked)}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-slate-950">{branch.task}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {branch.difficulty} · {branch.estimatedTime} · {branch.impact} impact
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
