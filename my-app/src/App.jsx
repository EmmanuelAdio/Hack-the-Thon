import { useState } from "react";

const COLORS = {
  primary: "#1a1a2e",
  accent: "#4f8ef7",
  accentLight: "#e8f0fe",
  success: "#22c55e",
  successLight: "#dcfce7",
  warning: "#f59e0b",
  warningLight: "#fef3c7",
  danger: "#ef4444",
  dangerLight: "#fee2e2",
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  textMuted: "#64748b",
  textLight: "#94a3b8",
};

const MOCK_JOBS = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Ltd",
    location: "London, UK",
    compatibility: 74,
    color: "#4f8ef7",
    icon: "💻",
    events: [
      { id: 1, name: "London Tech Hackathon 2025", type: "Hackathon", date: "15 Jun 2025", location: "Shoreditch, London", relevance: 92, description: "48-hour hackathon focused on AI/ML applications. Build a project and network with engineers at top UK tech firms." },
      { id: 2, name: "AWS Re:Invent UK Summit", type: "Conference", date: "22 Jul 2025", location: "ExCeL London", relevance: 85, description: "AWS annual cloud computing conference. Sessions on serverless, DevOps, and modern architecture patterns." },
      { id: 3, name: "Clean Code Workshop", type: "Workshop", date: "3 Aug 2025", location: "Online", relevance: 78, description: "Hands-on workshop covering SOLID principles, refactoring techniques, and code review best practices." },
    ],
    projects: [
      { id: 1, name: "Full-Stack Web App", difficulty: "Medium", duration: "4–6 weeks", skills: ["React", "Node.js", "PostgreSQL"], description: "Build a complete CRUD application with authentication, REST API, and a responsive frontend. Deploy to Heroku or Vercel.", impact: 88 },
      { id: 2, name: "Open Source Contribution", difficulty: "Hard", duration: "Ongoing", skills: ["Git", "Code Review", "Documentation"], description: "Contribute to a popular GitHub project — fix bugs, add features, or improve docs. Demonstrates collaboration skills.", impact: 82 },
      { id: 3, name: "CLI Tool", difficulty: "Easy", duration: "1–2 weeks", skills: ["Python", "Bash", "Testing"], description: "Create a command-line utility that solves a real problem. Package it properly with tests and a README.", impact: 65 },
    ],
    qualifications: [
      { id: 1, name: "AWS Certified Developer – Associate", provider: "Amazon Web Services", cost: "£150", duration: "3 months prep", priority: "High", description: "Validates ability to develop and maintain applications on AWS. Highly sought after by UK tech employers." },
      { id: 2, name: "BCS Professional Certificate in IT", provider: "BCS, The Chartered Institute for IT", cost: "£200", duration: "6 months", priority: "Medium", description: "Industry-recognised UK qualification demonstrating professional IT competency and ethical practice." },
    ],
    roadmap: [
      {
        id: 'step1',
        milestone: { type: 'qualifications', id: 1, title: 'AWS Certified Developer', icon: '🎓', color: '#a855f7' },
        branches: [
          { type: 'events', id: 2, title: 'AWS Summit', icon: '📅', color: COLORS.accent },
          { type: 'projects', id: 3, title: 'CLI Tool', icon: '🔨', color: COLORS.warning },
        ]
      },
      {
        id: 'step2',
        milestone: { type: 'projects', id: 1, title: 'Full-Stack Web App', icon: '🔨', color: COLORS.warning },
        branches: [
          { type: 'events', id: 1, title: 'Hackathon', icon: '📅', color: COLORS.accent },
          { type: 'events', id: 3, title: 'Workshop', icon: '📅', color: COLORS.accent },
        ]
      },
      {
        id: 'step3',
        milestone: { type: 'qualifications', id: 2, title: 'BCS IT Certificate', icon: '🎓', color: '#a855f7' },
        branches: [
          { type: 'projects', id: 2, title: 'Open Source', icon: '🔨', color: COLORS.warning },
        ]
      },
    ],
    gaps: ["System design knowledge", "Cloud infrastructure experience", "CI/CD pipeline familiarity"],
    strengths: ["Programming fundamentals", "Problem solving", "Version control"],
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Creative Studio",
    location: "Manchester, UK",
    compatibility: 58,
    color: "#a855f7",
    icon: "🎨",
    events: [
      { id: 1, name: "UX London 2025", type: "Conference", date: "10 May 2025", location: "London", relevance: 95, description: "Europe's leading UX conference. Talks from world-class designers at Google, Airbnb, and BBC." },
      { id: 2, name: "Figma Community Meetup", type: "Meetup", date: "28 May 2025", location: "Manchester", relevance: 80, description: "Local Figma users group. Portfolio critiques, component library tips, and networking with local designers." },
    ],
    projects: [
      { id: 1, name: "Mobile App Redesign", difficulty: "Medium", duration: "3–4 weeks", skills: ["Figma", "User Research", "Prototyping"], description: "Pick an existing app with UX issues and redesign it. Document your research, wireframes, and final prototype.", impact: 91 },
      { id: 2, name: "Design System", difficulty: "Hard", duration: "6–8 weeks", skills: ["Component Design", "Documentation", "Accessibility"], description: "Build a complete design system with tokens, components, and usage guidelines. Showcases systematic thinking.", impact: 85 },
    ],
    qualifications: [
      { id: 1, name: "Google UX Design Certificate", provider: "Google / Coursera", cost: "£35/month", duration: "6 months", priority: "High", description: "Comprehensive UX design programme. Covers design thinking, Figma, and building a professional portfolio." },
      { id: 2, name: "UXQB Certified Professional for Usability and UX", provider: "UXQB", cost: "£300", duration: "2 months prep", priority: "Medium", description: "International usability certification recognised across Europe. Demonstrates foundational UX expertise." },
    ],
    roadmap: [
      {
        id: 'step1',
        milestone: { type: 'qualifications', id: 1, title: 'Google UX Cert', icon: '🎓', color: '#a855f7' },
        branches: [
          { type: 'events', id: 1, title: 'UX London', icon: '📅', color: COLORS.accent },
        ]
      },
      {
        id: 'step2',
        milestone: { type: 'projects', id: 1, title: 'App Redesign', icon: '🔨', color: COLORS.warning },
        branches: [
          { type: 'events', id: 2, title: 'Figma Meetup', icon: '📅', color: COLORS.accent },
        ]
      },
      {
        id: 'step3',
        milestone: { type: 'qualifications', id: 2, title: 'UXQB Cert', icon: '🎓', color: '#a855f7' },
        branches: [
          { type: 'projects', id: 2, title: 'Design System', icon: '🔨', color: COLORS.warning },
        ]
      },
    ],
    gaps: ["Figma proficiency", "User research methods", "Accessibility standards"],
    strengths: ["Visual creativity", "Attention to detail", "Stakeholder communication"],
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "FinanceFirst",
    location: "Edinburgh, UK",
    compatibility: 41,
    color: "#14b8a6",
    icon: "📊",
    events: [
      { id: 1, name: "Data Science Festival", type: "Festival", date: "19 Sep 2025", location: "Online & London", relevance: 90, description: "Annual celebration of data. 150+ sessions on analytics, ML, and business intelligence. Free to attend." },
    ],
    projects: [
      { id: 1, name: "Sales Dashboard", difficulty: "Easy", duration: "2–3 weeks", skills: ["Power BI", "Excel", "SQL"], description: "Build an interactive business dashboard from a real dataset. Focus on storytelling with data and actionable insights.", impact: 89 },
      { id: 2, name: "Predictive Model", difficulty: "Hard", duration: "5–7 weeks", skills: ["Python", "Pandas", "Scikit-learn"], description: "Train a machine learning model on a public dataset. Document methodology, feature engineering, and results clearly.", impact: 78 },
    ],
    qualifications: [
      { id: 1, name: "Microsoft Power BI Data Analyst Associate", provider: "Microsoft", cost: "£165", duration: "2 months prep", priority: "High", description: "Industry-standard certification for business intelligence. Directly relevant to most UK data analyst job postings." },
      { id: 2, name: "Google Data Analytics Certificate", provider: "Google / Coursera", cost: "£35/month", duration: "6 months", priority: "Medium", description: "Covers the full data analysis lifecycle using R, SQL, and Tableau. Good entry-level credential." },
    ],
    roadmap: [
      {
        id: 'step1',
        milestone: { type: 'qualifications', id: 2, title: 'Google Data Cert', icon: '🎓', color: '#a855f7' },
        branches: [
          { type: 'projects', id: 1, title: 'Sales Dashboard', icon: '🔨', color: COLORS.warning },
        ]
      },
      {
        id: 'step2',
        milestone: { type: 'qualifications', id: 1, title: 'Microsoft BI Cert', icon: '🎓', color: '#a855f7' },
        branches: [
          { type: 'events', id: 1, title: 'Data Festival', icon: '📅', color: COLORS.accent },
        ]
      },
      {
        id: 'step3',
        milestone: { type: 'projects', id: 2, title: 'Predictive Model', icon: '🔨', color: COLORS.warning },
        branches: []
      },
    ],
    gaps: ["SQL proficiency", "Statistical analysis", "Data visualisation tools", "Python/R skills"],
    strengths: ["Numeracy", "Excel basics", "Attention to detail"],
  },
];

const MOCK_PROFILE = {
  name: "Alex Thompson",
  email: "alex.thompson@email.com",
  location: "Leeds, UK",
  headline: "Computer Science Graduate | Aspiring Software Engineer",
  experience: [
    { id: 1, role: "Junior Developer (Intern)", company: "StartupXYZ", duration: "Jun 2024 – Sep 2024", description: "Built React components and assisted with backend API development using Node.js and MongoDB." },
    { id: 2, role: "IT Support Assistant", company: "University of Leeds", duration: "Sep 2023 – May 2024", description: "Provided technical support to staff and students. Managed ticketing system and resolved hardware/software issues." },
  ],
  education: [
    { id: 1, degree: "BSc Computer Science", institution: "University of Leeds", grade: "2:1", year: "2024" },
    { id: 2, degree: "A-Levels: Maths, Physics, Computing", institution: "Leeds Grammar School", grade: "A, A, B", year: "2021" },
  ],
  skills: ["JavaScript", "React", "Python", "Git", "SQL", "HTML/CSS", "Node.js"],
  hobbies: ["Robotics club", "Competitive programming", "Photography", "Hiking"],
  idealJobs: ["Software Engineer", "Full-Stack Developer", "DevOps Engineer"],
  interests: ["Artificial Intelligence", "Web Development", "Open Source", "Cloud Computing"],
};

function CompatibilityBar({ value, size = "md", color }) {
  const barColor = color || (value >= 70 ? COLORS.success : value >= 50 ? COLORS.warning : COLORS.danger);
  const h = size === "lg" ? 10 : size === "sm" ? 5 : 7;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, background: COLORS.border, borderRadius: 99, height: h, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, background: barColor, height: "100%", borderRadius: 99, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
      <span style={{ fontSize: size === "lg" ? 18 : size === "sm" ? 12 : 14, fontWeight: 600, color: barColor, minWidth: size === "lg" ? 44 : 36, textAlign: "right" }}>{value}%</span>
    </div>
  );
}

function Badge({ children, type = "neutral" }) {
  const styles = {
    neutral: { bg: COLORS.surfaceAlt, color: COLORS.textMuted, border: COLORS.border },
    success: { bg: COLORS.successLight, color: "#15803d", border: "#bbf7d0" },
    warning: { bg: COLORS.warningLight, color: "#b45309", border: "#fde68a" },
    danger: { bg: COLORS.dangerLight, color: "#b91c1c", border: "#fecaca" },
    info: { bg: COLORS.accentLight, color: "#1d4ed8", border: "#bfdbfe" },
  };
  const s = styles[type];
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 500, display: "inline-block" }}>{children}</span>
  );
}

function PriorityBadge({ priority }) {
  const type = priority === "High" ? "danger" : priority === "Medium" ? "warning" : "neutral";
  return <Badge type={type}>{priority} priority</Badge>;
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "20px 24px", ...style, cursor: onClick ? "pointer" : "default", transition: "box-shadow 0.15s, transform 0.15s" }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      {children}
    </div>
  );
}

function NavBar({ page, setPage, profileName }) {
  return (
    <div style={{ background: COLORS.primary, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("dashboard")}>
        <span style={{ fontSize: 22 }}>🎯</span>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>CareerMatch</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {[["dashboard", "Dashboard"], ["account", "My Profile"], ["add-job", "Add Job"]].map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)} style={{ background: page === id ? "rgba(255,255,255,0.15)" : "transparent", color: page === id ? "#fff" : "rgba(255,255,255,0.65)", border: "none", borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontSize: 14, fontWeight: page === id ? 600 : 400, transition: "all 0.15s" }}>{label}</button>
        ))}
        <div style={{ width: 1, background: "rgba(255,255,255,0.15)", margin: "12px 8px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setPage("account")}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>AT</div>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{profileName}</span>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ jobs, onSelectJob, setPage }) {
  const avg = Math.round(jobs.reduce((s, j) => s + j.compatibility, 0) / jobs.length);
  const best = jobs.reduce((a, b) => a.compatibility > b.compatibility ? a : b);
  return (
    <div style={{ padding: "36px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: "-0.5px" }}>Good morning, Alex 👋</h1>
        <p style={{ color: COLORS.textMuted, margin: "6px 0 0", fontSize: 15 }}>Here's your career compatibility overview. Let's close those gaps.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
        {[
          { label: "Jobs Tracked", value: jobs.length, icon: "📋", sub: "active applications" },
          { label: "Avg Compatibility", value: `${avg}%`, icon: "🎯", sub: "across all jobs" },
          { label: "Best Match", value: `${best.compatibility}%`, icon: "⭐", sub: best.title },
        ].map(m => (
          <Card key={m.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>{m.icon}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.5px" }}>{m.value}</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textLight }}>{m.sub}</div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0 }}>Your Jobs</h2>
        <button onClick={() => setPage("add-job")} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>+ Add New Job</button>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {jobs.map(job => (
          <Card key={job.id} onClick={() => onSelectJob(job)} style={{ display: "grid", gridTemplateColumns: "48px 1fr 320px 180px", alignItems: "center", gap: 20, padding: "18px 24px" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: job.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{job.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>{job.title}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>{job.company} · {job.location}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {job.strengths.slice(0, 2).map(s => <Badge key={s}>{s}</Badge>)}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>Compatibility</span>
              <CompatibilityBar value={job.compatibility} size="md" color={job.color} />
              <span style={{ fontSize: 12, color: COLORS.textLight }}>{job.gaps.length} gap{job.gaps.length !== 1 ? "s" : ""} to close</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <button style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View Details →</button>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ marginTop: 24, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", border: "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>🚀 Ready to improve your match?</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Update your profile to get more accurate compatibility scores and tailored recommendations.</div>
          </div>
          <button onClick={() => setPage("account")} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Update Profile</button>
        </div>
      </Card>
    </div>
  );
}

function RoadmapStep({ job, step, index }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;
  
  const milestone = step.milestone;
  const milestoneItem = job[milestone.type].find(item => item.id === milestone.id);
  const branchItems = step.branches.map(branch => ({
    ...branch,
    item: job[branch.type].find(item => item.id === branch.id)
  }));

  return (
    <div style={{ position: 'relative', height: 260, width: '100%', zIndex: hovered ? 50 : job.roadmap.length - index }}>
      
      {/* Curved Road SVG Segment */}
      {/* We use vectorEffect="non-scaling-stroke" so the stroke width stays constant even as the SVG stretches */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {/* Asphalt Base */}
        <path d={isLeft ? "M50,0 C10,25 10,75 50,100" : "M50,0 C90,25 90,75 50,100"} fill="none" stroke="#1e293b" strokeWidth="28" vectorEffect="non-scaling-stroke" />
        {/* Dashed Center Line */}
        <path d={isLeft ? "M50,0 C10,25 10,75 50,100" : "M50,0 C90,25 90,75 50,100"} fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="12,12" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Anchor Dot on the Road */}
      <div style={{
        position: 'absolute', top: '50%', left: isLeft ? '20%' : '80%', transform: 'translate(-50%, -50%)',
        width: 12, height: 12, borderRadius: '50%', background: '#fff', border: `3px solid ${milestone.color}`, zIndex: 1
      }} />

      {/* Interactive Node Wrapper */}
      {/* Positioned exactly at the peak of the curve (20% or 80%) */}
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          top: '50%',
          left: isLeft ? '20%' : '80%',
          zIndex: 10,
        }}
      >
        {/* Invisible Bridge to prevent hover loss between pin and card */}
        <div style={{
           position: 'absolute',
           top: -100,
           left: isLeft ? -24 : -360,
           width: 380,
           height: 200,
           zIndex: 0
        }} />

        {/* Map Pin */}
        <div style={{
          position: 'absolute',
          left: 0, top: -48, // Aligns the rotated tip exactly to (0,0) of this wrapper
          width: 48, height: 48,
          background: milestone.color,
          borderRadius: '50% 50% 50% 0',
          transform: `rotate(-45deg) ${hovered ? 'scale(1.15)' : 'scale(1)'}`,
          transformOrigin: 'bottom left',
          boxShadow: hovered ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '3px solid #fff',
          zIndex: 2
        }}>
          <div style={{ transform: 'rotate(45deg)', color: '#fff', fontSize: 20 }}>{milestone.icon}</div>
        </div>

        {/* Always-visible Mini Label (hides on hover) */}
        <div style={{
          position: 'absolute',
          top: -38,
          left: isLeft ? 36 : -36,
          transform: isLeft ? 'none' : 'translateX(-100%)',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '6px 14px',
          borderRadius: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontWeight: 700, fontSize: 14, color: COLORS.text, whiteSpace: 'nowrap',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.2s',
          pointerEvents: 'none',
          border: `1px solid ${COLORS.border}`,
          zIndex: 1
        }}>
          {milestone.title}
        </div>

        {/* Detailed Hover Card */}
        <div style={{
          position: 'absolute',
          top: -80, // Centers roughly with the pin
          left: isLeft ? 48 : -368,
          width: 320,
          opacity: hovered ? 1 : 0,
          visibility: hovered ? 'visible' : 'hidden',
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: hovered ? 'auto' : 'none',
          zIndex: 10
        }}>
          <Card style={{ padding: '20px', margin: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: milestone.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {milestone.type.slice(0, -1)}
              </span>
              {milestone.type === 'qualifications' && <PriorityBadge priority={milestoneItem.priority} />}
            </div>
            
            <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.text, marginBottom: 6, lineHeight: 1.2 }}>
              {milestone.title}
            </div>
            
            <p style={{ color: COLORS.textMuted, fontSize: 14, margin: '0 0 16px', lineHeight: 1.5 }}>
              {milestoneItem.description}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: COLORS.textLight, marginBottom: branchItems.length ? 16 : 0 }}>
              <span style={{ fontWeight: 600 }}>{milestone.type === 'qualifications' ? milestoneItem.provider : milestoneItem.duration}</span>
              <Badge type="info">{milestone.type === 'qualifications' ? milestoneItem.duration : `Impact: ${milestoneItem.impact}%`}</Badge>
            </div>

            {/* Side Quests (Branches) appended inside the hover card */}
            {branchItems.length > 0 && (
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                  Related Side Quests
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {branchItems.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: COLORS.surfaceAlt, padding: '10px 14px', borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: b.color + '20', color: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                        {b.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, lineHeight: 1.2 }}>{b.title}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{b.item.location || b.item.difficulty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function RoadmapView({ job }) {
  if (!job.roadmap) return <div>No roadmap defined for this job.</div>;

  return (
    <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: '40px 0 80px', width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Wrapper ensures everything is perfectly anchored to the SVG layout */}
      <div style={{ position: 'relative', width: '100%' }}>
        
        {/* Start Cap (Top Origin) */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, width: 24, height: 24, borderRadius: '50%', background: '#1e293b', border: '4px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
        
        {job.roadmap.map((step, index) => (
          <RoadmapStep key={step.id} job={job} step={step} index={index} />
        ))}

        {/* End Cap (Bottom Destination) */}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)', zIndex: 10, width: 64, height: 64, borderRadius: '50%', background: COLORS.success, border: '5px solid #fff', boxShadow: '0 6px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff' }}>
          ⭐
        </div>
        <div style={{ position: 'absolute', bottom: -54, left: '50%', transform: 'translateX(-50%)', fontSize: 18, fontWeight: 800, color: COLORS.success, whiteSpace: 'nowrap' }}>
          100% Match Reached
        </div>
      </div>
    </div>
  );
}

function JobDetailPage({ job, onBack }) {
  const [activeTab, setActiveTab] = useState("roadmap");
  const tabs = [
    { id: "roadmap", label: "🗺️ Path Roadmap", count: job.roadmap?.length || 0 },
    { id: "events", label: "📅 Events", count: job.events.length },
    { id: "projects", label: "🔨 Projects", count: job.projects.length },
    { id: "qualifications", label: "🎓 Qualifications", count: job.qualifications.length },
  ];

  return (
    <div style={{ padding: "36px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 24, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>← Back to Dashboard</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, marginBottom: 32 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 14, background: job.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{job.icon}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: "-0.5px" }}>{job.title}</h1>
              <p style={{ color: COLORS.textMuted, margin: "4px 0 16px", fontSize: 14 }}>{job.company} · {job.location}</p>
              <CompatibilityBar value={job.compatibility} size="lg" color={job.color} />
            </div>
          </div>
        </Card>
        <Card style={{ background: COLORS.surfaceAlt }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>Gap Analysis</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.success, marginBottom: 6 }}>✓ Your Strengths</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {job.strengths.map(s => <Badge key={s} type="success">{s}</Badge>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.danger, marginBottom: 6 }}>✗ Gaps to Close</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {job.gaps.map(g => <Badge key={g} type="danger">{g}</Badge>)}
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${COLORS.border}`, marginBottom: 24, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: "none", border: "none", borderBottom: activeTab === tab.id ? `2px solid ${job.color}` : "2px solid transparent", padding: "12px 24px", cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? job.color : COLORS.textMuted, marginBottom: -2, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            {tab.label}
            <span style={{ background: activeTab === tab.id ? job.color + "20" : COLORS.surfaceAlt, color: activeTab === tab.id ? job.color : COLORS.textMuted, borderRadius: 99, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{tab.count}</span>
          </button>
        ))}
      </div>
      
      {activeTab === "roadmap" && <RoadmapView job={job} />}

      {activeTab === "events" && (
        <div style={{ display: "grid", gap: 16 }}>
          {job.events.map(ev => (
            <Card key={ev.id}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>{ev.name}</span>
                    <Badge type="info">{ev.type}</Badge>
                  </div>
                  <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "0 0 10px", lineHeight: 1.6 }}>{ev.description}</p>
                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: COLORS.textLight }}>
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                </div>
                <div style={{ textAlign: "center", background: COLORS.successLight, borderRadius: 10, padding: "10px 16px", minWidth: 80 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#15803d" }}>{ev.relevance}%</div>
                  <div style={{ fontSize: 11, color: "#15803d", fontWeight: 500 }}>Relevance</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {activeTab === "projects" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {job.projects.map(proj => (
            <Card key={proj.id}>
              <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>{proj.name}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <Badge type={proj.difficulty === "Easy" ? "success" : proj.difficulty === "Medium" ? "warning" : "danger"}>{proj.difficulty}</Badge>
                    <Badge>⏱ {proj.duration}</Badge>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: job.color }}>{proj.impact}%</div>
                  <div style={{ fontSize: 10, color: COLORS.textLight, fontWeight: 500 }}>Impact</div>
                </div>
              </div>
              <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>{proj.description}</p>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Skills you'll gain</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.skills.map(s => <Badge key={s} type="info">{s}</Badge>)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {activeTab === "qualifications" && (
        <div style={{ display: "grid", gap: 16 }}>
          {job.qualifications.map(qual => (
            <Card key={qual.id}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>🎓 {qual.name}</span>
                    <PriorityBadge priority={qual.priority} />
                  </div>
                  <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "0 0 10px", lineHeight: 1.6 }}>{qual.description}</p>
                  <div style={{ display: "flex", gap: 20, fontSize: 13, color: COLORS.textLight }}>
                    <span>🏫 {qual.provider}</span>
                    <span>💷 {qual.cost}</span>
                    <span>⏳ {qual.duration}</span>
                  </div>
                </div>
                <button style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Learn More</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountPage() {
  const [editingSkill, setEditingSkill] = useState(false);
  const [skills, setSkills] = useState(MOCK_PROFILE.skills);
  const [newSkill, setNewSkill] = useState("");
  const p = MOCK_PROFILE;
  return (
    <div style={{ padding: "36px 40px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, margin: "0 0 8px", letterSpacing: "-0.5px" }}>My Profile</h1>
      <p style={{ color: COLORS.textMuted, margin: "0 0 32px", fontSize: 15 }}>Your career profile powers your compatibility scores. Keep it up to date.</p>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 700, flexShrink: 0 }}>AT</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>{p.name}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 2 }}>{p.headline}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 13, color: COLORS.textLight }}>
              <span>📍 {p.location}</span>
              <span>✉️ {p.email}</span>
            </div>
          </div>
          <button style={{ background: COLORS.surfaceAlt, color: COLORS.text, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>✏️ Edit</button>
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0 }}>💼 Work Experience</h3>
            <button style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {p.experience.map(exp => (
              <div key={exp.id} style={{ borderLeft: `3px solid ${COLORS.accent}`, paddingLeft: 12 }}>
                <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 14 }}>{exp.role}</div>
                <div style={{ color: COLORS.accent, fontSize: 13, fontWeight: 500 }}>{exp.company}</div>
                <div style={{ color: COLORS.textLight, fontSize: 12, margin: "2px 0 4px" }}>{exp.duration}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.5 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0 }}>🎓 Education</h3>
            <button style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {p.education.map(edu => (
              <div key={edu.id} style={{ borderLeft: `3px solid #a855f7`, paddingLeft: 12 }}>
                <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 14 }}>{edu.degree}</div>
                <div style={{ color: "#a855f7", fontSize: 13, fontWeight: 500 }}>{edu.institution}</div>
                <div style={{ color: COLORS.textLight, fontSize: 12, marginTop: 2 }}>{edu.grade} · {edu.year}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0 }}>⚡ Skills</h3>
            <button onClick={() => setEditingSkill(!editingSkill)} style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{editingSkill ? "Done" : "+ Add"}</button>
          </div>
          {editingSkill && (
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill..." onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); }}} style={{ flex: 1, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none", background: COLORS.surfaceAlt }} />
              <button onClick={() => { if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); }}} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>Add</button>
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, background: COLORS.accentLight, borderRadius: 6, padding: "4px 10px" }}>
                <span style={{ fontSize: 13, color: COLORS.accent, fontWeight: 500 }}>{s}</span>
                {editingSkill && <button onClick={() => setSkills(skills.filter(sk => sk !== s))} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.accent, padding: 0, fontSize: 14, lineHeight: 1 }}>×</button>}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0 }}>🎯 Ideal Job Roles</h3>
            <button style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {p.idealJobs.map(j => <Badge key={j} type="info">{j}</Badge>)}
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 8 }}>Interests</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.interests.map(i => <Badge key={i}>{i}</Badge>)}
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0 }}>🏆 Hobbies & Interests</h3>
          <button style={{ background: COLORS.accentLight, color: COLORS.accent, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {p.hobbies.map(h => <Badge key={h}>{h}</Badge>)}
        </div>
      </Card>
    </div>
  );
}

function AddJobPage({ onAddJob, setPage }) {
  const [form, setForm] = useState({ title: "", company: "", location: "", description: "", salary: "", jobType: "Full-time" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = () => {
    if (!form.title || !form.company) return;
    setSubmitted(true);
    setTimeout(() => { onAddJob(form); setPage("dashboard"); }, 1800);
  };
  if (submitted) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
      <div style={{ fontSize: 60 }}>🎯</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, margin: 0 }}>Analysing compatibility...</h2>
      <p style={{ color: COLORS.textMuted, fontSize: 15 }}>We're comparing your profile against the job requirements.</p>
      <div style={{ width: 300, height: 6, background: COLORS.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", background: COLORS.accent, borderRadius: 99, animation: "loadBar 1.6s ease-out forwards" }} />
      </div>
      <style>{`@keyframes loadBar { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
  return (
    <div style={{ padding: "36px 40px", maxWidth: 680, margin: "0 auto" }}>
      <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 24, padding: 0 }}>← Back to Dashboard</button>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, margin: "0 0 8px", letterSpacing: "-0.5px" }}>Add a New Job</h1>
      <p style={{ color: COLORS.textMuted, margin: "0 0 32px", fontSize: 15 }}>Paste the job details and we'll analyse your compatibility and suggest improvements.</p>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Job Title *</label>
            <input value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Software Engineer" style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", background: COLORS.surfaceAlt }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Company *</label>
            <input value={form.company} onChange={e => update("company", e.target.value)} placeholder="e.g. Google UK" style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", background: COLORS.surfaceAlt }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Location</label>
            <input value={form.location} onChange={e => update("location", e.target.value)} placeholder="e.g. London, UK" style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", background: COLORS.surfaceAlt }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Job Type</label>
            <select value={form.jobType} onChange={e => update("jobType", e.target.value)} style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", background: COLORS.surfaceAlt }}>
              {["Full-time", "Part-time", "Contract", "Internship", "Graduate Scheme"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Salary Range (optional)</label>
          <input value={form.salary} onChange={e => update("salary", e.target.value)} placeholder="e.g. £35,000 – £45,000" style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", background: COLORS.surfaceAlt }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Job Description / Requirements</label>
          <textarea value={form.description} onChange={e => update("description", e.target.value)} placeholder="Paste the full job description here. The more detail you provide, the more accurate your compatibility score will be..." rows={8} style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", background: COLORS.surfaceAlt, resize: "vertical", lineHeight: 1.6 }} />
        </div>
        <div style={{ background: COLORS.accentLight, borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#1d4ed8" }}>
          💡 <strong>Tip:</strong> Our AI will cross-reference your profile skills, experience, and qualifications against the job requirements to generate a detailed compatibility report with personalised recommendations.
        </div>
        <button onClick={handleSubmit} disabled={!form.title || !form.company} style={{ width: "100%", background: form.title && form.company ? COLORS.accent : COLORS.border, color: form.title && form.company ? "#fff" : COLORS.textLight, border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: form.title && form.company ? "pointer" : "not-allowed", transition: "all 0.15s" }}>
          🎯 Analyse My Compatibility
        </button>
      </Card>
    </div>
  );
}

function SignInPage({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={{ minHeight: "100vh", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎯</div>
          <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-1px" }}>CareerMatch</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, margin: 0 }}>AI-powered career compatibility analysis</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 32 }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@email.com" type="email" style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={onSignIn} style={{ width: "100%", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s" }}>Sign In →</button>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", marginTop: 16, marginBottom: 0 }}>Don't have an account? <span style={{ color: COLORS.accent, cursor: "pointer" }}>Sign up free</span></p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 28 }}>
          {["AI-Powered", "UK Focused", "Free to Use"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              <span style={{ color: COLORS.success }}>✓</span>{f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState(MOCK_JOBS);

  if (!signedIn) return <SignInPage onSignIn={() => setSignedIn(true)} />;

  const handleSelectJob = (job) => { setSelectedJob(job); setPage("job-detail"); };
  const handleAddJob = (form) => {
    const icons = ["🏢", "🖥️", "📱", "🔬", "💡", "📝"];
    const colors = ["#4f8ef7", "#a855f7", "#14b8a6", "#f59e0b", "#ef4444", "#22c55e"];
    const newJob = { id: jobs.length + 1, title: form.title, company: form.company, location: form.location || "UK", compatibility: Math.floor(Math.random() * 40) + 30, color: colors[jobs.length % colors.length], icon: icons[jobs.length % icons.length], events: [], projects: [], qualifications: [], gaps: ["Analysing..."], strengths: ["Analysing..."], roadmap: [] };
    setJobs([...jobs, newJob]);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.surfaceAlt, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <NavBar page={page} setPage={(p) => { setPage(p); if (p !== "job-detail") setSelectedJob(null); }} profileName="Alex T." />
      <div>
        {page === "dashboard" && <DashboardPage jobs={jobs} onSelectJob={handleSelectJob} setPage={setPage} />}
        {page === "job-detail" && selectedJob && <JobDetailPage job={selectedJob} onBack={() => setPage("dashboard")} />}
        {page === "account" && <AccountPage />}
        {page === "add-job" && <AddJobPage onAddJob={handleAddJob} setPage={setPage} />}
      </div>
    </div>
  );
}