# Opportunity Decoder

Decode the role. Discover your evidence. Apply with confidence.

Opportunity Decoder is a hackathon MVP that helps students understand how close they are to being ready for a specific career opportunity. A student pastes a job description and their CV, skills, projects, volunteering, or other experiences. The app uses Azure OpenAI server-side to create an evidence map, readiness dashboard, and practical roadmap from "where I am now" to "ready to apply".

## Problem statement

Students often self-reject from internships, placements, insight schemes, scholarships, and graduate roles because they do not know how to translate their existing experience into employer language. This is especially true for students with no internship experience, first-generation students, students from underrepresented backgrounds, and students without strong professional networks.

## Solution

Opportunity Decoder analyses a target opportunity against a student's current evidence. It shows what they already have, what hidden evidence they are not communicating well, which gaps are blocking readiness, and which actions will move them fastest towards a credible application.

## What makes it innovative

This is not just a CV writer or job matcher. The core idea is opportunity access through evidence mapping and readiness roadmapping. The product helps students see that projects, societies, mentoring, coursework, volunteering, part-time work, and hackathons can all become career evidence when framed clearly and honestly.

## 8 Pillars of Engineering Career Development

1. Technical Foundations
2. Professional Experience
3. Portfolio & Proof of Work
4. Soft Skills
5. Industry Exposure & Events
6. Credentials & Continuous Learning
7. Strategic Positioning
8. Application Readiness & Interview Preparation

Each pillar receives a score, status, explanation, evidence found, blocking gap, and next action.

## Use Case Diagram

The diagram below gives a compact SysML-style overview of how the main users interact with Opportunity Decoder. It groups the core student journey, advisor actions, and shared AI processes so the system boundary stays readable and uses space more efficiently in GitHub Markdown.

```mermaid
flowchart LR

    seeker[Career Seeker]
    
    advisor[Career Advisor]

    subgraph system[Opportunity Decoder]
        direction LR

        subgraph seekerCases[Career Seeker Use Cases]
            direction TB
            UC1([Enter career goal<br/>Paste job description])
            UC2([Upload CV and experiences])
            UC3([Generate readiness analysis])
            UC4([View 8-pillar dashboard])
            UC5([Review evidence map])
            UC6([Follow interactive roadmap])
            UC7([View application readiness])
            UC8([Export or share roadmap])
        end

        subgraph sharedCases[Shared AI Processes]
            direction TB
            UC9([Generate readiness score])
            UC10([Identify skill and evidence gaps])
            UC11([Identify hidden evidence])
            UC12([Generate roadmap])
            UC13([Generate CV and interview suggestions])
        end

        subgraph advisorCases[Career Advisor Use Cases]
            direction TB
            UC14([Review student profile])
            UC15([Review AI-generated analysis])
            UC16([Verify roadmap recommendations])
            UC17([Suggest improvements])
            UC18([Refine roadmap])
            UC19([Track student progress])
        end
    end

    seeker --- UC1
    seeker --- UC2
    seeker --- UC3
    seeker --- UC4
    seeker --- UC5
    seeker --- UC6
    seeker --- UC7
    seeker --- UC8

    advisor --- UC14
    advisor --- UC15
    advisor --- UC16
    advisor --- UC17
    advisor --- UC18
    advisor --- UC19

    UC3 -.-> UC9
    UC3 -.-> UC10
    UC3 -.-> UC11
    UC3 -.-> UC12
    UC3 -.-> UC13

    UC16 -.-> UC6
    UC18 -.-> UC6
```

## Azure OpenAI integration

The app calls Azure OpenAI only from the server-side API route at `POST /api/decode`. API keys are read from environment variables and are never exposed to frontend code.

If any Azure OpenAI environment variable is missing, the route returns realistic mock output so the demo still works offline or without credentials.

Endpoint format:

```text
{AZURE_OPENAI_ENDPOINT}/openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_OPENAI_API_VERSION}
```

## How to run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run checks:

```bash
npm run typecheck
npm run build
```

## Environment variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Set:

```text
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_DEPLOYMENT=
AZURE_OPENAI_API_VERSION=
```

Do not commit `.env.local` or API keys.

## Demo flow

1. Open the app.
2. Click **Use demo example**.
3. Click **Decode Opportunity**.
4. Show the opportunity summary and overall readiness score.
5. Walk through the 8-pillar dashboard.
6. Open the evidence map and highlight hidden evidence.
7. Tick roadmap items to show the interactive readiness plan.
8. Copy a CV bullet or motivation answer from the application booster.
9. End on the "Should I apply?" recommendation.

## Future improvements

- PDF CV parsing
- LinkedIn import
- University careers service dashboard
- Mentor review mode
- Employer-facing inclusive recruitment insights
- Application tracker
- Personalised learning resources
- Progress saving across multiple opportunities
