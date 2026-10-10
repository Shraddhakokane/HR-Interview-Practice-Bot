// HR Interview Practice Bot - Question Bank & Rubric Library
// Categorized by Role, Category, and Experience Level

const QUESTION_BANK = {
  general_hr: [
    {
      id: "gen_1",
      question: "Tell me about yourself and walk me through your background.",
      category: "Warm-up & Introduction",
      difficulty: "All Levels",
      duration: 120,
      starHint: "Focus on Present -> Past -> Future. Highlight your current role, key accomplishments, relevant skills, and why this role is the natural next step.",
      keyElements: ["career overview", "key achievements", "relevance to role", "future aspirations"],
      modelAnswer: "I am a proactive professional with a background in [Your Field]. Over the last [X] years, I have specialized in [Core Skills], where I recently [Major Achievement with impact/metric]. What excites me about this opportunity is how your team is focusing on [Company Initiative], which directly aligns with my passion for [Relevant Area]."
    },
    {
      id: "gen_2",
      question: "What are your greatest strengths, and how have they helped you in your professional life?",
      category: "Self-Awareness",
      difficulty: "All Levels",
      duration: 90,
      starHint: "Pick 2-3 tangible strengths (e.g., problem-solving, stakeholder communication, cross-functional leadership). Back each up with a mini-example of impact.",
      keyElements: ["concrete strengths", "specific example", "measurable impact", "job relevance"],
      modelAnswer: "One of my greatest strengths is translating complex technical ambiguity into actionable plans. For example, at my previous position, we faced conflicting requirements between design and engineering. I organized a cross-functional workshop, aligned priorities, and cut delivery delay by 25%."
    },
    {
      id: "gen_3",
      question: "What is an area of development or a weakness you are actively working on?",
      category: "Self-Awareness",
      difficulty: "All Levels",
      duration: 90,
      starHint: "Pick a genuine professional weakness (not a cliché like 'I work too hard'). Crucially, emphasize the concrete steps you are taking to overcome it and progress made.",
      keyElements: ["authentic weakness", "self-awareness", "proactive corrective steps", "measurable improvement"],
      modelAnswer: "Earlier in my career, I had a tendency to take on too many tasks independently rather than delegating early. I recognized this was creating bottlenecks. To address it, I started implementing daily priority matrix reviews and using project boards to delegate tasks to team members. This improved our team velocity and reduced project delivery turnaround by 20%."
    },
    {
      id: "gen_4",
      question: "Why do you want to join our company, and what makes you interested in this position?",
      category: "Motivation & Culture Fit",
      difficulty: "All Levels",
      duration: 90,
      starHint: "Connect company mission/products with your personal values and career trajectory. Mention specific company accomplishments or initiatives.",
      keyElements: ["company knowledge", "value alignment", "role interest", "value contribution"],
      modelAnswer: "I've been following your recent expansion in [Product/Market], particularly your focus on [Specific Feature/Value]. My background in [Your Skill] allows me to hit the ground running, and your culture of continuous innovation resonates strongly with how I thrive."
    },
    {
      id: "gen_5",
      question: "Tell me about a time you had to handle a tight deadline with conflicting priorities.",
      category: "Time Management & Pressure",
      difficulty: "Mid / Senior",
      duration: 120,
      starHint: "S: Critical deadline overlap. T: Balancing high stakes. A: Prioritization framework (Eisenhower matrix), renegotiation, team alignment. R: Timely delivery and quality maintained.",
      keyElements: ["prioritization method", "stakeholder communication", "calm under pressure", "successful delivery"],
      modelAnswer: "During a product release cycle, our primary client requested urgent scope changes three days before launch. I quickly conducted an impact assessment, communicated the trade-offs to leadership, reprioritized non-critical deliverables for Phase 2, and led our squad through the critical path. We shipped on schedule with zero defect regressions."
    },
    {
      id: "gen_6",
      question: "Describe a situation where you had a disagreement with a manager or colleague. How did you resolve it?",
      category: "Conflict Resolution",
      difficulty: "All Levels",
      duration: 120,
      starHint: "S: Professional difference of opinion. T: Finding the optimal business outcome without personal friction. A: Active listening, objective data, finding common ground. R: Collaborative solution and strengthened relationship.",
      keyElements: ["active listening", "data-driven arguments", "empathy and respect", "positive outcome"],
      modelAnswer: "A colleague and I had differing opinions on whether to rebuild a legacy module or patch it. Instead of arguing viewpoints, I proposed we set up a 3-day proof-of-concept test and benchmark both options against latency and development cost. The data clearly demonstrated that refactoring 20% of the core yielded 80% of performance gains. We both agreed on this path, saving three weeks of engineering time."
    },
    {
      id: "gen_7",
      question: "Can you share an example of a mistake you made at work and how you handled the aftermath?",
      category: "Accountability & Growth",
      difficulty: "All Levels",
      duration: 120,
      starHint: "S: Honest mistake made. T: Ownership without blaming others. A: Immediate mitigation, transparent communication, root cause analysis. R: Permanent process safeguard put in place.",
      keyElements: ["ownership", "transparent communication", "rapid mitigation", "preventative measures"],
      modelAnswer: "Early on, I missed updating a critical configuration parameter that caused intermittent user notifications. As soon as telemetry caught it, I immediately took ownership, notified the team, and deployed the rollback within 20 minutes. Afterward, I authored a post-mortem and introduced automated schema validation in our CI/CD pipeline so this error could never happen again."
    },
    {
      id: "gen_8",
      question: "Where do you see yourself professionally in the next three to five years?",
      category: "Career Vision",
      difficulty: "All Levels",
      duration: 90,
      starHint: "Show ambition coupled with realistic mastery. Emphasize growing domain expertise, mentoring others, and driving larger organizational impact.",
      keyElements: ["ambition", "skill mastery", "leadership/mentorship", "commitment to growth"],
      modelAnswer: "Over the next three to five years, I want to deepen my expertise in [Core Domain] and step up into taking broader architectural and mentorship responsibilities. I want to be recognized as a trusted go-to leader who helps newer team members grow while driving high-impact initiatives."
    },
    {
      id: "gen_9",
      question: "Do you have any questions for me as the interviewer?",
      category: "Candidate Inquisitiveness",
      difficulty: "All Levels",
      duration: 60,
      starHint: "Never say 'no'! Ask 2-3 thoughtful questions about team culture, upcoming challenges, success metrics, or what the interviewer enjoys most about working here.",
      keyElements: ["curiosity", "team insight", "success metrics", "strategic thinking"],
      modelAnswer: "Yes, thank you! I would love to know: what are the key goals or milestones that would define success for this role in the first 90 days? Also, how does the team typically foster cross-functional collaboration and knowledge sharing?"
    }
  ],

  software_engineer: [
    {
      id: "swe_1",
      question: "Describe a technically challenging project you led or contributed to. What was your specific architectural contribution?",
      category: "Technical Leadership & System Design",
      difficulty: "Mid / Senior",
      duration: 150,
      starHint: "S: Complex system requirements or performance bottleneck. T: Your technical role. A: Architecture choices, trade-offs evaluated, design patterns applied. R: Latency reduction, scalability metric, user impact.",
      keyElements: ["architectural trade-offs", "system scalability", "personal code/design contribution", "quantified performance gains"],
      modelAnswer: "Our data ingestion pipeline was bottlenecking under 5x traffic spikes. As the primary engineer, I redesigned the processing layer from synchronous HTTP calls to an event-driven pub/sub architecture using Kafka and asynchronous worker pools. I benchmarked memory consumption and implemented backpressure handling. This reduced end-to-end processing latency by 64% and supported 10x throughput with zero dropped events."
    },
    {
      id: "swe_2",
      question: "How do you approach code reviews, and how do you give feedback when someone submits substandard code?",
      category: "Collaboration & Code Quality",
      difficulty: "All Levels",
      duration: 100,
      starHint: "S: Pull request requiring major rework. T: Delivering constructive, respectful feedback. A: Separating code from person, explaining the 'why', pairing up if necessary. R: Code improved, peer learned.",
      keyElements: ["empathy and tone", "actionable feedback", "explaining reasons/best practices", "mentorship mindset"],
      modelAnswer: "I treat code reviews as an opportunity for mutual learning rather than gatekeeping. When I see areas for improvement, I frame comments objectively—focusing on edge cases, maintainability, and architectural standards rather than personal criticism. I explain the 'why', provide documentation links or code snippets, and offer to hop on a quick screen-share if the refactor is non-trivial."
    },
    {
      id: "swe_3",
      question: "Tell me about a production incident or bug you encountered. How did you diagnose, mitigate, and resolve it?",
      category: "Crisis Management & Debugging",
      difficulty: "Mid / Senior",
      duration: 120,
      starHint: "S: High-severity production alert. T: Rapid diagnosis and stabilization. A: Observability logs, metrics analysis, containment hotfix. R: SLA restored, post-mortem created, automated regression tests added.",
      keyElements: ["systematic debugging", "calm triaging", "customer impact mitigation", "permanent root-cause prevention"],
      modelAnswer: "We received a P1 alert when checkout API response times spiked to 8 seconds. I pulled server metrics and APM traces, isolating the issue to a connection pool exhaustion caused by a deadlock in an unindexed query. I quickly scaled the pool and implemented query timeouts to unblock transactions. Within two hours, I pushed an indexed query patch and added automated slow-query alerts to our monitoring dashboard."
    },
    {
      id: "swe_4",
      question: "How do you stay up to date with rapidly evolving software technologies and balance adopting new tech versus proven solutions?",
      category: "Continuous Learning & Pragmatism",
      difficulty: "All Levels",
      duration: 90,
      starHint: "Mention tech blogs, open-source repos, or side experiments. Emphasize that business needs and team maintainability always trump chasing trendy frameworks.",
      keyElements: ["learning habits", "pragmatism over hype", "evaluation criteria", "team maintainability"],
      modelAnswer: "I follow engineering blogs like Uber and Netflix Tech Blogs, read RFCs, and build prototype micro-apps on weekends. However, in production, I am pragmatic: I evaluate technologies based on community maturity, operational overhead, team familiarity, and business value. I only advocate for adopting new tools when the clear benefits far outweigh the migration cost."
    }
  ],

  product_manager: [
    {
      id: "pm_1",
      question: "Walk me through how you prioritize features when engineering, sales, and executive stakeholders all have conflicting demands.",
      category: "Product Prioritization & Strategy",
      difficulty: "Mid / Senior",
      duration: 150,
      starHint: "Explain prioritization frameworks (RICE, Kano, Value vs Effort). Emphasize customer data, strategic company OKRs, and transparent stakeholder communication.",
      keyElements: ["RICE or prioritization framework", "customer data backing", "strategic alignment", "managing expectations"],
      modelAnswer: "I anchor prioritization to strategic quarterly OKRs and user impact rather than who shouts the loudest. I use the RICE framework (Reach, Impact, Confidence, Effort) to score competing initiatives collaboratively with engineering and design leads. I hold transparent roadmap syncs with sales and leadership to share the data and explain trade-offs clearly, ensuring everyone understands why specific features are sequenced for future quarters."
    },
    {
      id: "pm_2",
      question: "Tell me about a product or feature you launched that failed to achieve its expected metrics. What did you learn?",
      category: "Failure & Iteration",
      difficulty: "Mid / Senior",
      duration: 120,
      starHint: "S: Underperforming product launch. T: Diagnosing low adoption/retention. A: Qualitative customer interviews, funnel drop-off analysis. R: Pivot or sunset decision, valuable customer insights gained.",
      keyElements: ["intellectual honesty", "metric analysis", "customer interviews", "iterative mindset"],
      modelAnswer: "We launched an automated onboarding checklist expected to increase day-7 retention by 15%, but adoption hovered at 3%. Instead of pushing harder, I scheduled 10 user interviews and analyzed session recordings. We discovered users felt overwhelmed by too many upfront tasks. We stripped the checklist down to just one single 'magic moment' action, which ended up boosting retention by 18%."
    },
    {
      id: "pm_3",
      question: "How do you define product requirements and ensure engineers and designers are aligned and motivated?",
      category: "Execution & Cross-functional Leadership",
      difficulty: "All Levels",
      duration: 120,
      starHint: "Focus on problem-first PRDs over prescriptive feature lists. Involve engineering and design early in user discovery.",
      keyElements: ["problem statement clarity", "early team involvement", "acceptance criteria", "user empathy"],
      modelAnswer: "I believe the best PRDs focus obsessively on the 'why' and user problems rather than dictating solutions. I bring lead engineers and designers directly into user research calls so they feel the customer pain firsthand. We co-create user stories and success metrics together, which builds genuine ownership across the squad."
    }
  ],

  fresher_hr: [
    {
      id: "fresher_1",
      question: "As a fresh graduate, why should we hire you over candidates with prior work experience?",
      category: "Value Proposition",
      difficulty: "Fresher / Entry",
      duration: 90,
      starHint: "Highlight your agility, high coachability, fresh perspective, strong foundation, and hunger to deliver results without bad habits.",
      keyElements: ["coachability", "academic/project excellence", "strong foundation", "drive to learn quickly"],
      modelAnswer: "While I may have less traditional corporate tenure, I bring an up-to-date foundational skillset, high adaptability, and immense enthusiasm. In my capstone project, I led a 4-person team to build [Project Name], teaching myself [New Tech] in under two weeks to deliver ahead of schedule. I am eager to learn your team's methodologies and dedicate 100% of my energy to delivering immediate value."
    },
    {
      id: "fresher_2",
      question: "Tell me about your college capstone or academic project. What challenges did you encounter and how did you solve them?",
      category: "Academic & Project Track Record",
      difficulty: "Fresher / Entry",
      duration: 120,
      starHint: "S: Project scope and challenge. T: Your personal contribution. A: Research, technical troubleshooting, teamwork. R: Final outcome, grade, or demo success.",
      keyElements: ["individual ownership", "technical problem solving", "collaboration", "successful outcome"],
      modelAnswer: "For our final year capstone, my team developed a real-time smart inventory tracking app. Midway through, our original database query structure proved too slow for concurrent requests. I took the lead in benchmarking our schema, transitioned our query indexing, and reduced query latency by 70%. We presented the project to faculty judges and received an 'A' grade with highest distinction."
    },
    {
      id: "fresher_3",
      question: "Describe a situation during your studies where a team member was not contributing equally. How did you handle it?",
      category: "Teamwork & Interpersonal Skills",
      difficulty: "Fresher / Entry",
      duration: 100,
      starHint: "Focus on empathy first: checking in on the teammate, understanding obstacles, re-allocating tasks fairly, and delivering the group project.",
      keyElements: ["empathy", "direct and respectful communication", "task realignment", "project delivery"],
      modelAnswer: "During a major group presentation, one teammate stopped attending group syncs. Rather than complaining to our professor immediately, I reached out privately to check if everything was okay. They explained they were overwhelmed with an unexpected family emergency. I helped break down their section into smaller, manageable chunks and redistributed the rest across the team. They completed their revised portion on time, and our team scored top marks."
    }
  ],

  marketing_sales: [
    {
      id: "sales_1",
      question: "Tell me about a time you turned an unhappy customer or cold lead into a loyal advocate or closed deal.",
      category: "Negotiation & Client Relations",
      difficulty: "Mid / Senior",
      duration: 120,
      starHint: "S: Sceptical client or churn risk. T: Saving the relationship. A: Active listening to pain points, tailored solution, building trust. R: Closed contract or retention metric.",
      keyElements: ["relationship building", "consultative approach", "handling objections", "quantifiable win"],
      modelAnswer: "A prospective enterprise client was on the verge of walking away due to perceived pricing differences with a competitor. Instead of discounting immediately, I conducted a deep-dive workflow audit and demonstrated that our automation would save their team 15 hours weekly per rep—yielding a 3x ROI over the competitor. By shifting the conversation to total business value, I closed a 2-year contract worth $85k ARR."
    },
    {
      id: "sales_2",
      question: "How do you handle rejection and maintain resilience when dealing with long sales cycles or missed targets?",
      category: "Resilience & Mindset",
      difficulty: "All Levels",
      duration: 90,
      starHint: "Demonstrate emotional maturity. Rejection is data: analyze lost reasons, refine pitch, stay disciplined with pipeline volume.",
      keyElements: ["growth mindset", "root cause reflection", "pipeline discipline", "consistent motivation"],
      modelAnswer: "I treat rejection as vital data rather than personal failure. When a prospect passes, I conduct a brief lost-deal analysis to understand if our timing, budget, or value proposition was mismatched. I keep a disciplined prospecting pipeline so my momentum never stalls, and I use feedback to sharpen my objection-handling in the next conversation."
    }
  ],

  leadership_management: [
    {
      id: "lead_1",
      question: "Describe your leadership philosophy. How do you motivate underperforming team members while keeping high performers engaged?",
      category: "People Leadership",
      difficulty: "Senior / Lead / Executive",
      duration: 150,
      starHint: "Servant leadership / situational leadership. Clear expectations, psychological safety, personalized coaching for underperformers, autonomy and stretch goals for top talent.",
      keyElements: ["situational leadership", "empathy & accountability", "growth plans (PIP / coaching)", "empowering high performers"],
      modelAnswer: "My philosophy is servant leadership paired with high accountability. With struggling team members, I start by diagnosing whether the root cause is skill, will, or external roadblocks, setting clear 30-day incremental milestones with weekly 1-on-1s. For high performers, I provide strategic autonomy, shield them from bureaucracy, and offer stretch assignments that prepare them for their next career milestone."
    },
    {
      id: "lead_2",
      question: "How do you handle organizational change or delivering unpopular decisions to your team?",
      category: "Change Management & Communication",
      difficulty: "Senior / Lead / Executive",
      duration: 120,
      starHint: "S: Difficult pivot or policy shift. T: Aligning the team. A: Radical transparency, explaining the business rationale, creating space for questions. R: High team morale and zero voluntary turnover.",
      keyElements: ["transparency", "business rationale", "empathy for concerns", "action orientation"],
      modelAnswer: "When leadership decided to sunset a product line my team had invested six months into, morale was vulnerable. I held an open all-hands where I transparently shared the financial and strategic drivers behind the pivot. I acknowledged their valid frustration, celebrated the architectural breakthroughs we had made, and clearly mapped how their skills would accelerate our new flagship project. We maintained 100% team retention."
    }
  ]
};

// Common filler words for speech-to-text / written answers analysis
const FILLER_WORDS = [
  "um", "uh", "like", "basically", "literally", "actually", "sort of",
  "kind of", "you know", "i mean", "honestly", "stuff", "things", "whatever"
];

// Strong Action Verbs indicative of high-ownership STAR responses
const STRONG_ACTION_VERBS = [
  "spearheaded", "orchestrated", "engineered", "implemented", "resolved",
  "negotiated", "architected", "championed", "streamlined", "optimized",
  "executed", "collaborated", "mentored", "diagnosed", "restructured",
  "transformed", "facilitated", "delivered", "standardized", "benchmarked",
  "prioritized", "analyzed", "designed", "achieved", "developed", "led", "built"
];

// STAR indicator keywords
const STAR_KEYWORDS = {
  situation: ["situation", "when i was", "at my previous", "in my last role", "we were facing", "the company", "context", "client", "project", "problem", "challenge"],
  task: ["my task", "my responsibility", "i was assigned", "i needed to", "the goal was", "my objective", "my role was", "responsible for", "expected to"],
  action: ["i decided to", "i created", "i built", "i organized", "i led", "i researched", "i communicated", "i implemented", "i analyzed", "i spearheaded", "i solved", "i worked with", "i scheduled"],
  result: ["as a result", "consequently", "resulting in", "increased", "reduced", "improved", "saved", "boosted", "delivered", "outcome was", "learned that", "achieved", "percent", "%", "metric"]
};
