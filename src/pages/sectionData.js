export const SECTION_TITLES = {
  1: 'GETTING TO KNOW YOURSELF',
  2: 'MANAGING CHANGE & YOUR ATTITUDE',
  3: 'GOAL SETTING',
  4: 'LEARNING TO LEARN & STRESS RELIEF STRATEGIES',
  5: 'TIME MANAGEMENT',
  6: 'STUDY SKILLS',
  7: 'BECOMING AN EFFECTIVE ONLINE STUDENT',
  8: 'RESPONSIBLE BORROWING & BUDGETING',
  9: 'WORKING IN TEAMS',
  10: 'COMMUNICATION SKILLS',
  11: 'PROBLEM SOLVING & CRITICAL THINKING',
  12: 'CAREER PLANNING',
};

/** Workshop titles shown on home page tiles. Weeks 10–12 show chapters 7–9. */
export const WORKSHOP_TITLES = [
  "Introduction to CS",
  'How Hiring Actually Works',
  'Building an Online Presence',
  'First Career Report',
  'Knowing When to Apply',
  'Reverse Engineering the Role',
  "What Employers Are Reacting To",
  "Networking Without Feeling Gross",
  'Career Hygiene',
  "Interviews Aren't Tests",
  'Proof Over Promises',
  'How Recruiting Decisions Actually Get Made',
];

/** Focus points per section (1–12). Weeks 10–12 show chapters 7–9 focus. */
export const WORKSHOP_FOCUS = [
  ['How hiring actually works right now', 'Why rejection and silence are normal', 'What Career Services can and can\'t control', 'Scam awareness (live examples)'],
  ['What ATS systems do (plain English)', 'Resume myths vs reality', 'Live walkthrough of a resume → ATS lens', 'Intro to ethical AI usage (reviewing, not lying)'],
  ['Recruiter search behavior', 'Why LinkedIn still matters (and how to ignore the noise)', 'What not to do on profiles', 'Live profile examples (good + bad)'],
  [
    'Combine your data (resume, LinkedIn, Indeed, intake, 1:1) into your first Career Report',
    'Understand what your data is saying',
    'Identify strengths and gaps',
    'Turn insights into action and strategy',
    'Start structured tracking and intentional applications',
    'Build a sustainable weekly pace',
  ],
  ['Reading job descriptions critically', 'Required vs preferred qualifications', 'Live example: tailoring one resume', 'Using AI to analyze, not fabricate'],
  ['Reviewing tracker data', 'Interpreting early signals', 'When to adjust resume vs strategy', 'Normalizing pivots'],
  ['Communication breakdowns employers complain about', 'Reliability, follow-through, boundaries', 'Team dynamics in modern workplaces', 'Real scenarios and discussion'],
  ['Outreach as probability, not salvation', 'Referrals demystified', 'What realistic responses look like', 'When networking helps — and when it doesn\'t'],
  ['Maintaining systems while working', 'Avoiding burnout long-term', 'What "ready" actually means', 'Closing reflections + encouragement'],
  ['Why interviews feel subjective', 'STAR method explained without jargon', 'Common traps and weak answers', 'Live answer teardown (anonymous examples)'],
  ['What hiring managers actually care about', 'Documentation vs perfection', 'How to talk about projects in interviews', '"Why I built this" framing'],
  ['Why timelines break', 'Why feedback is rare', 'Internal hiring chaos explained', 'What silence usually means', 'Elevator Pitch'],
];

/** Course materials (chapter readings) – first lesson in each section */
export const CHAPTER_READING_DOC_URL = 'https://docs.google.com/document/d/1h5yCLuHFuXbCl_BCiNje6DVHmM9EaTA0ONEI1-GGdhU/edit?tab=t.0';

/** Week 1 intake – set `REACT_APP_WEEK1_INTAKE_FORM_URL` in `.env` to your Google Form or Typeform URL. */
export const WEEK1_INTAKE_FORM_URL = process.env.REACT_APP_WEEK1_INTAKE_FORM_URL || '';

function getReadChapterContent(chapterNum) {
  return {
    title: `Read chapter ${chapterNum}`,
    summary: `Week ${chapterNum} – Required reading`,
    body: `For this week, read Chapter ${chapterNum} in the course materials.`,
    linkUrl: CHAPTER_READING_DOC_URL,
    linkLabel: 'Open course materials (Google Doc)',
  };
}

/** Week 1 – onboarding only (no chapter read / reflections in app). */
const SECTION_1_ASSIGNMENTS = [
  'Intake Form (required)',
  'Resume Submission (required)',
  'LinkedIn URL (optional)',
  'AI Consent',
];
const SECTION_2_REST = [
  'Resume Foundations, ATS & AI',
  'Chat GPT Exercise: The Resume Scan',
  'Resume v1 Checklist',
];
const SECTION_3_REST = [
  'LinkedIn & Indeed Profile Setup',
];
const SECTION_4_REST = ['Schedule Your First One-on-One'];
const SECTION_5_REST = [
  'Resume Alignment Assignment',
  'Mock Interview with Nick (Recruiter Practice)',
];
const SECTION_6_REST = [];
const SECTION_7_REST = [
  'Build Your Story',
];
const SECTION_8_REST = [
  'How Recruiting and Hiring Works: Part II',
  'Assignment 1 – Reverse Engineer a Posting',
  'Assignment 2 – Resume Through a Recruiter Lens',
  '1:1 Progress Review – Come Prepared',
];
const SECTION_9_REST = [
  'Mock Technical Interview – Book with Jon or Daniel',
];
const SECTION_10_REST = [
  'Professional Scenarios – Written Responses',
  'Professional Reliability Checklist & Reflection',
  'Schedule Your Final 1:1',
];
const SECTION_11_REST = [
  'The Plan',
  'Reflection',
];
const SECTION_12_REST = [
  'Financial & Lifestyle Reflection',
  'Creating a 12 Month Stability Plan',
];
export const PLACEHOLDER_ASSIGNMENT_OPTIONS = ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4'];

/** Main week video: disabled (no video for any section). */
export const SECTION_VIDEO = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: null,
  11: null,
  12: null,
};

/** Unused while SECTION_VIDEO is empty; kept for API stability. */
export const SECTION_VIDEO_LABEL = {};

/** Audio filename per section (files under src/WeekN/audio/). Empty for weeks with no audio. */
export const SECTION_AUDIO = {
  1: 'Audio Lecture.m4a',
  2: 'Engineer_Your_Resume_for_Robots_and_Recruiters.m4a',
  3: 'Stop_Job_Hunting_and_Get_Hunted.m4a',
  4: 'The_Post-Bootcamp_Job_Search_Operating_System.m4a',
  5: 'Beat_the_ATS_and_land_tech_interviews.m4a',
  6: 'Why_Brilliant_Tech_Workers_Get_Fired.m4a',
  7: 'Behavioral_interview_tactics_for_cybersecurity_career_changers.m4a',
  8: null,
  9: null,
  10: 'What_managers_actually_want_from_you.m4a',
  11: 'Beating_the_2026_AI_hiring_trap.m4a',
  12: 'Don_t_go_broke_with_your_first_paycheck.m4a',
};

/** Assignment materials (docx). Files live under src/WeekN/assignments/ (bundled via weekAssignmentAssets.js). */
export const SECTION_ASSIGNMENT_FILES = {
  1: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Intake assignment (Week 1)', file: 'intake_assignment_week_1.docx' },
  ],
  2: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 2 intake assignment', file: 'week_2_intake_assignment.docx' },
  ],
  3: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 3 assignment', file: 'week_3_assignment.docx' },
    { label: 'Week 3 intake assignment', file: 'week_3_intake_assignment.docx' },
    { label: 'LinkedIn setup assignment', file: 'week_3_linkedin_setup_assignment.docx' },
    { label: 'Week 3 quiz', file: 'week_3_quiz.docx' },
  ],
  4: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Chapter 4 quiz', file: 'chapter_4_quiz.docx' },
    { label: 'Chapter 4 reflection', file: 'chapter_4_reflection.docx' },
    { label: 'Week 4 intake assignment', file: 'week_4_intake_assignment.docx' },
    { label: 'The job tracker', file: 'week_4_job_tracker.docx' },
  ],
  5: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Chapter 5 quiz', file: 'chapter_5_quiz.docx' },
    { label: 'Resume version 2', file: 'week_5_resume_version_2.docx' },
    { label: 'The soft skills interview', file: 'week_5_soft_skills_interview.docx' },
  ],
  6: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 6 assignment', file: 'week_6_assignment.docx' },
    { label: 'Week 6 quiz', file: 'week_6_quiz.docx' },
    { label: 'Reverse engineering', file: 'week_6_reverse_engineering.docx' },
  ],
  7: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 7 assignment', file: 'week_7_assignment.docx' },
    { label: 'Interview performance', file: 'week_7_interview_performance.docx' },
  ],
  8: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 8 assignments', file: 'week_8_assignments.docx' },
    { label: 'Professionalism', file: 'week_8_professionalism.docx' },
  ],
  9: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Consistency', file: 'week_9_consistency.docx' },
  ],
  10: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 10 assignment', file: 'week_10_assignment.docx' },
    { label: 'Opportunities', file: 'week_10_opportunities.docx' },
  ],
  11: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Week 11 assignment', file: 'week_11_assignment.docx' },
    { label: 'Operating like you already have the job', file: 'week_11_operating_like_you_have_the_job.docx' },
  ],
  12: [
    { label: 'The Master E-Book', file: 'the_master_ebook.docx' },
    { label: 'Staying in the game', file: 'week_12_staying_in_the_game.docx' },
  ],
};

/** Returns full assignment list for a section (Read chapter N first, then section-specific or placeholders) */
export function getAssignmentOptions(sectionId) {
  const id = parseInt(sectionId, 10) || 1;
  const readChapter = `Read chapter ${id}`;
  if (id === 1) return [...SECTION_1_ASSIGNMENTS];
  if (id === 2) return [readChapter, ...SECTION_2_REST];
  if (id === 3) return [readChapter, ...SECTION_3_REST];
  if (id === 4) return [readChapter, ...SECTION_4_REST];
  if (id === 5) return SECTION_5_REST;
  if (id === 6) return SECTION_6_REST;
  if (id === 7) return SECTION_10_REST;
  if (id === 8) return SECTION_11_REST;
  if (id === 9) return SECTION_12_REST;
  if (id === 10) return ['Read chapter 7', ...SECTION_7_REST];
  if (id === 11) return ['Read chapter 8', ...SECTION_8_REST];
  if (id === 12) return ['Read chapter 9', ...SECTION_9_REST];
  return [readChapter, ...PLACEHOLDER_ASSIGNMENT_OPTIONS];
}

/** Quiz for Section 1: How Hiring Actually Works (and Why It's Not Personal) */
export const SECTION_1_QUIZ = [
  {
    question: 'Why can job searching feel emotional, confusing, and unfair?',
    options: [
      'Because hiring is a simple, fair process',
      'Because in many ways it is—many factors beyond qualifications affect outcomes',
      'Because most people are unqualified',
    ],
    correctIndex: 1,
  },
  {
    question: 'What do companies use to sort and filter candidates before a human reviews them?',
    options: [
      'Only human recruiters',
      'Applicant Tracking Systems (ATS)',
      'Social media profiles only',
    ],
    correctIndex: 1,
  },
  {
    question: 'Does rejection usually mean you are unqualified or incapable?',
    options: [
      'Yes, rejection always means you are not good enough',
      'No—rejection is common and does not mean you are unqualified or incapable',
      'Only for entry-level jobs',
    ],
    correctIndex: 1,
  },
  {
    question: 'Which of these can influence hiring decisions besides your qualifications?',
    options: [
      'Only your resume and cover letter',
      'Timing, internal referrals, shifting budgets, role changes, or the company deciding not to hire',
      'Only the number of applications you send',
    ],
    correctIndex: 1,
  },
  {
    question: 'How is your job search best described?',
    options: [
      'A test of your worth',
      'A process of probability, persistence, and adaptation',
      'Something Career Services can fully control',
    ],
    correctIndex: 1,
  },
  {
    question: 'Can any system (including Career Services) remove competition or randomness completely?',
    options: [
      'Yes, if you follow the steps exactly',
      'No—no system can remove competition or randomness completely',
      'Only for people with the best resumes',
    ],
    correctIndex: 1,
  },
];

/** Quiz for Section 2: Understanding Applicant Tracking Systems (Career Services Week 2) */
export const SECTION_2_QUIZ = [
  {
    question: 'Why is keyword alignment important?',
    options: [
      'It makes resumes longer',
      'It improves alignment with job descriptions',
      'It guarantees interviews',
      'It is optional',
    ],
    correctIndex: 1,
  },
  {
    question: 'Which of the following is a formatting mistake?',
    options: [
      'Bullet Points',
      'Standard Font',
      'Two-Column Layout',
      'Clear Section Headers',
    ],
    correctIndex: 2,
  },
  {
    question: 'AI Should be used to:',
    options: [
      'Invent Experience',
      'Replace Thinking',
      'Assist in Identifying Gaps',
      'Do everything for me',
    ],
    correctIndex: 2,
  },
  {
    question: 'Which of the following best describes the purpose of Resume v1?',
    options: [
      'It is your final, perfect resume',
      'It is a baseline version before tailoring to specific jobs',
      'It replaces the need for LinkedIn',
      'It guarantees interviews',
    ],
    correctIndex: 1,
  },
  {
    question: 'Why is a single-column resume recommended?',
    options: [
      'It looks more creative',
      'It helps Applicant Tracking Systems read the content accurately',
      'It allows for more graphics',
      'It makes the resume longer',
    ],
    correctIndex: 1,
  },
];

/** Quiz for Section 3: Becoming Visible to Recruiters */
export const SECTION_3_QUIZ = [
  {
    question: 'Recruiters most commonly find candidates by:',
    options: [
      'Random browsing',
      'Keyword searches',
      'Email requests',
      'Cold calling',
    ],
    correctIndex: 1,
  },
  {
    question: 'Your LinkedIn headline should:',
    options: [
      'Be funny',
      'Include your target role',
      'Be vague',
      'Include emojis only',
    ],
    correctIndex: 1,
  },
  {
    question: 'Skills on LinkedIn help:',
    options: [
      'Make profiles longer',
      'Improve search visibility',
      'Replace experience',
      'Are optional',
    ],
    correctIndex: 1,
  },
  {
    question: '"Open to Work" should:',
    options: [
      'Be desperate',
      'Be clear but professional',
      'Be hidden',
      'Include salary demands',
    ],
    correctIndex: 1,
  },
  {
    question: 'An incomplete profile signals:',
    options: [
      'Authenticity',
      'Lack of preparation',
      'Creativity',
      'Nothing',
    ],
    correctIndex: 1,
  },
];

/** Quiz for Section 7: Interview Prep & The STAR Method */
export const SECTION_7_QUIZ = [
  {
    question: 'What is the primary purpose of the STAR method?',
    options: [
      'To impress the interviewer with length',
      'To structure answers clearly',
      'To memorize responses',
      'To avoid difficult questions',
    ],
    correctIndex: 1,
  },
  {
    question: 'Which section of STAR demonstrates measurable value?',
    options: [
      'Situation',
      'Task',
      'Action',
      'Result',
    ],
    correctIndex: 3,
  },
  {
    question: 'Over-explaining in interviews usually signals:',
    options: [
      'Confidence',
      'Technical depth',
      'Nervousness or lack of structure',
      'Enthusiasm',
    ],
    correctIndex: 2,
  },
  {
    question: 'If you say "I just…" in an answer, you are likely:',
    options: [
      'Clarifying',
      'Minimizing your experience',
      'Being honest',
      'Adding context',
    ],
    correctIndex: 1,
  },
  {
    question: 'Silence after answering a question:',
    options: [
      'Is awkward and must be filled',
      'Demonstrates lack of knowledge',
      'Signals completion and confidence',
      'Is unprofessional',
    ],
    correctIndex: 2,
  },
];

/** Quiz for Section 8: The Recruiter Lens */
export const SECTION_8_QUIZ = [
  {
    question: 'Recruiters typically spend how long scanning an initial resume?',
    options: [
      '30–60 seconds',
      '2–3 minutes',
      '6–10 seconds',
      '5 minutes',
    ],
    correctIndex: 2,
  },
  {
    question: 'The primary hiring mindset is:',
    options: [
      'Talent maximization',
      'Risk reduction',
      'Cultural experimentation',
      'Speed only',
    ],
    correctIndex: 1,
  },
  {
    question: 'Ghosting most commonly occurs because:',
    options: [
      'Recruiters dislike candidates',
      'ATS deletes resumes',
      'Workflow overload and shifting priorities',
      'Interview failure',
    ],
    correctIndex: 2,
  },
  {
    question: 'Internal candidates are often reviewed:',
    options: [
      'After external applicants',
      'At the same time',
      'First',
      'Never',
    ],
    correctIndex: 2,
  },
  {
    question: 'Understanding hiring mechanics helps reduce:',
    options: [
      'Application volume',
      'Resume formatting',
      'Personalization of rejection',
      'Interview prep',
    ],
    correctIndex: 2,
  },
];

/** Quiz for Section 9: Networking and Outreach */
export const SECTION_9_QUIZ = [
  {
    question: 'The primary purpose of networking is:',
    options: [
      'Asking for a job',
      'Building professional relationships and learning',
      'Impressing recruiters',
      'Bypassing interviews',
    ],
    correctIndex: 1,
  },
  {
    question: 'Warm outreach refers to:',
    options: [
      'Messaging strangers randomly',
      'Contacting mutual or known connections',
      'Mass messaging',
      'Sending resumes immediately',
    ],
    correctIndex: 1,
  },
  {
    question: 'A strong networking message should:',
    options: [
      'Be long and detailed',
      'Ask directly for a referral',
      'Be concise and low-pressure',
      'Include salary expectations',
    ],
    correctIndex: 2,
  },
  {
    question: 'AI Tools can help with networking by:',
    options: [
      'Sending automated messages',
      'Replacing relationship building',
      'Surfacing local opportunities and refining communication',
      'Guaranteeing responses',
    ],
    correctIndex: 2,
  },
  {
    question: 'Slight discomfort in networking usually indicates:',
    options: [
      'You are doing it wrong',
      'Professional growth',
      'You should stop',
      'You are being unprofessional',
    ],
    correctIndex: 1,
  },
];

/** Quiz for Section 11: Week 11 Quiz */
export const SECTION_11_QUIZ = [
  {
    question: 'Strategic application includes:',
    options: [
      'Applying impulsively',
      'Tracking and tailoring',
      'Waiting for motivation',
      'Applying emotionally',
    ],
    correctIndex: 1,
  },
  {
    question: 'Rejection most often reflects:',
    options: [
      'Personal inadequacy',
      'Permanent market failure',
      'Timing and competition',
      'Fixed career limits',
    ],
    correctIndex: 2,
  },
  {
    question: 'The first job in a new career should primarily be viewed as:',
    options: [
      'A final goal',
      'A validation moment',
      'A leverage platform',
      'A salary benchmark',
    ],
    correctIndex: 2,
  },
  {
    question: 'Emotional application cycles often result in:',
    options: [
      'Consistency',
      'Calm progress',
      'Burnout',
      'Predictability',
    ],
    correctIndex: 2,
  },
  {
    question: 'Resilience is best defined as:',
    options: [
      'Blind optimism',
      'Ignoring rejection',
      'Strategic persistence',
      'Constant hustle',
    ],
    correctIndex: 2,
  },
];

/** Quiz for Section 12: Week 12 Quiz */
export const SECTION_12_QUIZ = [
  {
    question: 'Financial Independence is primarily built on:',
    options: [
      'High income',
      'Margin and discipline',
      'Promotions',
      'Credit access',
    ],
    correctIndex: 1,
  },
  {
    question: 'An emergency fund primarily provides:',
    options: [
      'Investment leverage',
      'Career flexibility',
      'Social status',
      'Tax advantages',
    ],
    correctIndex: 1,
  },
  {
    question: 'If your first job pays less than expected, the most strategic response is:',
    options: [
      'Reject it automatically',
      'Compare yourself to others',
      'Evaluate growth potential and stability',
      'Increase spending anyway',
    ],
    correctIndex: 2,
  },
  {
    question: 'Financial stress most commonly leads to:',
    options: [
      'Calm negotiation',
      'Strategic patience',
      'Emotional decision-making',
      'Long-term planning',
    ],
    correctIndex: 2,
  },
];

/** Optional content for specific assignments (sectionId -> assignmentIndex -> content) */
export const ASSIGNMENT_CONTENT = {
  1: {
    0: {
      title: 'Intake Form',
      summary: 'Complete the program intake (required).',
      body: `Before you begin, complete the official intake form so we have your details and can support you properly.

If your instructor has shared a link, use the button below. If no link appears, check your email or ask your instructor for the form URL.

After you submit the form, click the button below to confirm you have completed it.`,
      ...(WEEK1_INTAKE_FORM_URL
        ? { linkUrl: WEEK1_INTAKE_FORM_URL, linkLabel: 'Open intake form' }
        : {}),
      submitButtonOnly: true,
      submitButtonOnlyComment: 'I have completed the intake form.',
    },
    1: {
      title: 'Resume Submission',
      summary: 'Upload your resume file or share a resume builder link.',
      body: `Submit your resume in one of two ways:

• Upload a file (PDF, Word, or similar), **or**
• Paste a link to your resume (Google Docs, Canva, LinkedIn resume builder, or another tool).

You only need to do one of these—not both.`,
      resumeLinkOrFile: true,
      checklistTitle: 'Resume Submission',
    },
    2: {
      title: 'LinkedIn URL',
      summary: 'Optional — share your LinkedIn profile with your instructor.',
      body: `If you have a LinkedIn profile and want your instructor to review it, paste your profile URL below. You may leave this blank and submit to skip.`,
      submitComment: true,
      linkedinOptional: true,
      commentPlaceholder: 'https://www.linkedin.com/in/your-profile (optional)',
      commentSubmitLabel: 'Save',
    },
    3: {
      title: 'AI Consent',
      summary: 'Required acknowledgment for use of AI tools in this program.',
      body: `This program may introduce tools that use artificial intelligence (for example, to help you draft or review resumes, practice interview answers, or organize your job search).

By proceeding, you acknowledge that:
• AI outputs are suggestions only—you are responsible for accuracy and honesty in what you submit to employers.
• You will not misrepresent AI-generated content as wholly original work where that would violate an employer’s or school’s rules.
• Instructors may recommend AI tools for learning purposes; use is voluntary where alternatives exist.

If you have questions about this policy, contact your instructor before continuing.`,
      aiConsentRequired: true,
      aiConsentLabel:
        'I have read the above and I consent to participating in activities that may involve AI tools as described.',
    },
  },
  2: {
    0: getReadChapterContent(2),
    1: {
      title: 'Resume Foundations, ATS & AI',
      summary: 'Week 2 – The ATS Resume Framework (2026 Edition)',
      image: '/images/week1-how-hiring-works.png',
      imageAlt: 'Kable Academy - KableAcademy.com',
      body: `Week 2 – The ATS Resume Framework (2026 Edition)

Why This Matters

Most candidates treat resumes like personal biographies. In reality, a resume is a strategic document designed to survive filtering systems and earn a short human review. This week, you are building Resume v1 using the Kable Resume Framework.

1. Structure First, Style Second

Non‑Negotiable Rules:
• 1 page
• Single column layout
• No graphics, icons, or text boxes
• Standard fonts only
• Clear section headings
• Bullet points (no long paragraphs)

Applicant Tracking Systems scan text, not design. Clarity increases compatibility and recruiter trust.

2. Relevance Over Decoration

Recruiters scan resumes in 6–10 seconds. They look for target role clarity, matching skills, logical work history, and clean formatting. Creativity is not the goal—alignment is.

3. Bullet Point Logic

Each experience entry should begin with an action verb, describe what you did, and show measurable impact when possible.

Weak: Helped with IT issues.
Stronger: Resolved 15–20 IT support tickets daily using ServiceNow.

Stronger resumes show contribution, not responsibility.

4. Keyword Alignment

Job descriptions are filters. If a posting lists Active Directory, Ticketing Systems, or Customer Service, your resume must reflect those phrases if truthful. This is strategic alignment—not manipulation.

5. AI as a Strategic Tool

AI can extract keywords, compare resumes to postings, and identify gaps. It should not invent experience or exaggerate qualifications. Use AI to analyze. Revise intentionally (we will go over this in detail in week 3)

What You Will Do This Week

1. Build a draft of your resume
2. Compare it to one real job posting.
3. Identify 3 missing keywords.
4. Make 2 intentional improvements.
5. Submit your reflection to my email.`,
      submitComment: true,
      commentPlaceholder: 'Paste or type your reflection and any notes for your instructor.',
      commentSubmitLabel: 'Submit comment',
    },
    2: {
      title: 'Chat GPT Exercise: The Resume Scan',
      summary: 'Matthew Kohlmorgen • Feb 17 • 10 points',
      image: '/images/week1-how-hiring-works.png',
      imageAlt: 'Kable Academy - KableAcademy.com',
      body: `Chat GPT Exercise: The Resume Scan
Matthew Kohlmorgen • Feb 17
10 points

Go to Chat GPT and create a free account. Once you complete that I want you to upload or paste your resume and use the following prompt:

"Review my resume for clarity and formatting. Identify any vague bullet points and suggest how to strengthen them without inventing experience."

Submit:
• 2 vague bullet points identified
• 2 revised versions you edited manually
• Email me the results and what your thoughts are.`,
      submitComment: true,
      commentPlaceholder: 'Paste your results, revised bullets, and your thoughts.',
      commentSubmitLabel: 'Submit comment',
    },
    3: {
      title: 'Resume v1 Checklist',
      summary: 'Section 2 – Resumes, ATS, and AI',
      image: '/images/week1-how-hiring-works.png',
      imageAlt: 'Kable Academy - KableAcademy.com',
      checklist: [
        '1 page',
        'Single column',
        'No graphics or icons',
        'Clear section headings',
        'Skills aligned to target role',
        'Bullet points under each position',
        'No formatting issues',
        'No spelling or grammar errors',
        'Keywords match a real job description (send me the job description as well)',
      ],
      checklistTagline: 'Clarity beats creativity. Relevance beats decoration. Structure beats style.',
      checklistDoneLabel: 'Everything is done',
      submitComment: true,
      commentPlaceholder: 'Add any notes or the job description link for your instructor.',
      commentSubmitLabel: 'Submit comment',
    },
  },
  3: {
    0: getReadChapterContent(3),
    1: {
      title: 'LinkedIn & Indeed Profile Setup',
      summary: 'Section 3 – Visibility to Recruiters',
      body: `Students must create:

• A Headline
• An "About" section
• Skills section
• 3 keywords they intentionally added
• Updated target role statement

Submit your LinkedIn profile link using the box below. We will go over it in our one-on-one's.

I will have it pulled up during our 1:1 and I will grade in real time.`,
      submitComment: true,
      commentPlaceholder: 'Paste your LinkedIn profile link here',
      commentSubmitLabel: 'Submit my LinkedIn link',
    },
  },
  4: {
    0: getReadChapterContent(4),
    1: {
      title: 'Schedule Your First One-on-One',
      summary: 'Section 4 – Book a meeting with your instructor',
      body: `Schedule a one-on-one meeting with your instructor to discuss your progress, get feedback, and plan next steps.`,
      linkUrl: 'https://ka.kableacademy.com/meetings/matthew-kohlmorgen?uuid=ebea851c-2a63-4c8d-8152-15e73e49b6c2',
      linkLabel: 'Schedule your first one-on-one',
      submitButtonOnly: true,
      submitButtonOnlyComment: 'I scheduled my first one-on-one.',
      commentSubmitLabel: 'Mark complete',
    },
  },
  5: {
    0: {
      title: 'Resume Alignment Assignment',
      summary: 'Section 5 – Resume Tailoring That Makes Sense',
      body: `Resume Alignment Assignment Instructions

Step 1 – Select One Real Job

Choose ONE realistic job that:

• Matches your target role
• Matches your experience level
• You would actually apply to

Copy a link to the job posting via Indeed, LinkedIn, etc.

Step 2 – Run the ATS Diagnostic Prompt

Copy and paste the following prompt into ChatGPT (or equivalent):

Prompt to Use:

I am applying for the following job. Here is the job description:
[PASTE JOB DESCRIPTION]

Below is my resume:
[PASTE RESUME]

Please:

• Score my resume from 0–100 for alignment with this job (ATS-style).
• List the missing keywords and skills.
• Rewrite my resume bullets to match the job while staying truthful.
• Suggest a clean, ATS-friendly formatting structure.
• Give me a revised version of the resume section-by-section.

Step 3 – Create Resume v2

Using the feedback:

• Adjust wording truthfully
• Improve keyword alignment
• Strengthen clarity
• Add measurable details if possible
• Do NOT invent experience

Save this as Resume v2.

Step 4 – Re-Run the Prompt

Paste Resume v2 back into the same prompt.
Record:

• Original score
• Updated score
• Key improvements identified

Step 5 – Submit your work

Use the box below to submit:

• 3–5 bullet reflection insights (what themes were repeated, biggest misalignment, whether your score improved, skill gaps you noticed)
• A short note that you have Resume v1, Resume v2, and the job description ready to share with your instructor (e.g. in your next 1:1, as they direct).`,
      submitComment: true,
      commentPlaceholder: 'Paste your reflection insights and how you will share v1/v2 + job description with your instructor.',
      commentSubmitLabel: 'Submit comment',
    },
    1: {
      title: 'Mock Interview with Nick (Recruiter Practice)',
      summary: 'Section 5 – Practice speaking with recruiters',
      body: `Alright class — this week is a little different.

We don't have a quiz this week. Instead, this week is focused on something just as important: practicing how to speak with recruiters and confidently communicate your experience in a professional setting.

By now, we've discussed potential barriers in your resume, job gaps, and areas that may require explanation. It's not enough to simply have a resume — you must be able to clearly explain your experience, address gaps, and speak confidently about your skills in an interview.

Nick will meet with each of you for a mock interview. He'll ask questions similar to what a recruiter would ask about your resume and background.

• No need to dress up — this is practice.
• You must book a time within the next two weeks.
• These sessions will be recorded.
• We will review your recording together during your next 1:1 to provide feedback and improve your delivery.

This is a safe space to practice, make mistakes, and grow. Take it seriously, but don't overthink it. The goal is confidence and clarity.

I'm excited to see how you show up.

Please use Nick's calendar below.`,
      linkUrl: 'https://meetings.hubspot.com/nobrien1?uuid=bb12b38e-8d7f-4277-85b3-f2c21444c65a',
      linkLabel: "Book your mock interview with Nick",
      submitComment: true,
      commentPlaceholder: 'Confirm you booked a time or add a note for your instructor (optional).',
      commentSubmitLabel: 'Submit comment',
    },
  },
  7: {
    0: {
      title: 'Professional Scenarios – Written Responses',
      summary: 'Section 7 – Professionalism in 2026',
      body: `Students must respond in writing to the following scenarios.

Example scenarios:

1. You missed a deadline because you misunderstood instructions. How do you communicate this?

2. A supervisor gives critical feedback you disagree with. How do you respond?

3. You are overwhelmed with tickets/tasks. What do you say before falling behind?

4. You and your manager have a discussion about your performance issues. How do you handle being criticized without someone validating you in that moment?

Your answers must demonstrate:

• Ownership
• Clarity
• Professional tone
• Forward focus

Submit your written responses using the comment box below.`,
      submitComment: true,
      commentPlaceholder: 'Write your responses to all 4 scenarios. For each scenario, show how you would respond with ownership, clarity, professional tone, and forward focus.',
      commentSubmitLabel: 'Submit my responses',
    },
    1: {
      title: 'Professional Reliability Checklist & Reflection',
      summary: 'Section 7 – Professionalism in 2026',
      body: `Review each statement and check the boxes that apply to you. Use this to reflect on where you are strong and where you can grow.`,
      checklistTitle: 'Professional Reliability Checklist',
      checklistWithoutFile: true,
      reflectionQuestions: [
        'Which section had the most unchecked boxes?',
        'What behavior will you actively improve in the next 30 days?',
        'What does "professional stability" mean to you?',
      ],
      checklist: [
        'I show up on time without reminders.',
        'If I am running late, I communicate before the start time.',
        'I meet deadlines consistently.',
        'If I cannot meet a deadline, I notify early — not after.',
        'I check instructions carefully before submitting work.',
        'I can receive critical feedback without becoming defensive.',
        'I do not over-explain mistakes.',
        'I take ownership when I misunderstand something.',
        'My emails are clear, grammatically correct, and professional.',
        'I avoid slang and casual tone in workplace communication.',
        'I do not blame others first when something goes wrong.',
        'I ask clarifying questions instead of guessing silently.',
        'I can admit when I don\'t know something.',
        'I correct errors quickly without excuses.',
        'I follow through without being chased.',
        'I do not shut down when stressed.',
        'I do not vent about work publicly on social media.',
        'I can separate tough feedback from personal attack.',
        'I understand that discomfort is not always toxicity.',
        'I pause before reacting emotionally.',
        'I understand that entry-level roles are learning phases.',
        'I am willing to perform repetitive tasks early in my career.',
        'I seek clarity instead of assuming unfairness.',
        'I value consistency over instant promotion.',
        'I understand that trust is built over time.',
      ],
      submitComment: true,
      commentPlaceholder: 'Answer the 3 reflection questions: which section had the most unchecked boxes, what behavior you will improve in the next 30 days, and what professional stability means to you.',
      commentSubmitLabel: 'Submit my reflection',
    },
    2: {
      title: 'Schedule Your Final 1:1',
      summary: 'Section 7 – Professionalism in 2026',
      body: `Book your final one-on-one meeting to review your progress, discuss next steps, and close out the program.`,
      linkUrl: 'https://ka.kableacademy.com/meetings/matthew-kohlmorgen?uuid=1cf0e384-7eef-4a75-9799-3f5469aa0018',
      linkLabel: 'Schedule your final 1:1',
      submitButtonOnly: true,
      commentSubmitLabel: 'Mark complete',
    },
  },
  8: {
    0: {
      title: 'The Plan',
      summary: 'Section 8 – Career Hygiene',
      body: `Assignment: The Plan
10 points

I. Create a 4-week structured job search schedule including:

• Applications per week
• Networking attempts per week
• Resume refinements
• Interview preparation time
• NotebookLM review time

II. Assume you accept a $21/hour helpdesk job.

Write a 6-month strategic plan including:

• Skills to master
• Metrics to track
• Relationships to build
• Resume bullets you aim to earn
• Next role you are preparing for

This is very much how you should be looking at the jobs in your career and for your next steps.

This must look like a calendar, not vague intentions. We WILL go over this in our final 1:1 together.`,
      submitComment: true,
      commentPlaceholder: 'Paste or type your 4-week job search schedule and 6-month strategic plan here. Use a calendar format, not vague intentions.',
      commentSubmitLabel: 'Submit my plan',
    },
    1: {
      title: 'Reflection',
      summary: 'Section 8 – Career Hygiene',
      body: `Reflection
10 points

1. Are you applying emotionally or strategically right now? What would it look like to shift?

2. What does a sustainable job search routine look like for you — one you could maintain for 90 days without burning out?

3. What is one thing within your control that you have been avoiding?`,
      submitComment: true,
      commentPlaceholder: 'Answer all 3 reflection questions. Be specific and honest.',
      commentSubmitLabel: 'Submit my reflection',
    },
  },
  9: {
    0: {
      title: 'Financial & Lifestyle Reflection',
      summary: 'Section 9 – Career Hygiene',
      body: `Answer the following questions. Keep responses to 3–5 sentences each.

1. Does your current lifestyle match entry-level salary expectations in your state? If not, what would realistically need to adjust?

2. What is one financial behavior that could quietly undermine your stability in your first year of employment?

3. How would having a 3-month emergency fund change the way you approach job decisions?

4. Are you currently thinking about money reactively (stress-based) or strategically (planned and structured)?`,
      submitComment: true,
      commentPlaceholder: 'Answer all 4 questions. Keep each response to 3–5 sentences.',
      commentSubmitLabel: 'Submit my responses',
    },
    1: {
      title: 'Creating a 12 Month Stability Plan',
      summary: 'Section 9 – Career Hygiene',
      body: `Creating a 12 Month Stability Plan
10 points

Create a structured outline (bullet format is fine) that includes:

• Estimated starting salary (based on research)
• Estimated monthly expenses
• Savings target for year one
• Debt strategy (if applicable)
• One income-growth goal tied to skill development

This is not about perfection. It is about awareness and intentionality.`,
      submitComment: true,
      commentPlaceholder: 'Paste or type your 12-month stability plan outline. Bullet format is fine.',
      commentSubmitLabel: 'Submit my plan',
    },
  },
  10: {
    0: getReadChapterContent(7),
    1: {
      title: 'Build Your Story',
      summary: 'Section 10 – Interviews Aren\'t Tests',
      body: `Build Your Story

I. 5 STAR Stories

Students must prepare 5 STAR stories:

• Problem Solving
• Team Conflict
• Failure or Mistake
• Leadership / Initiative
• Technical Challenge

Each story must be formatted:

• Situation (2 sentences max)
• Task (1 sentence)
• Action (what YOU did)
• Result (measurable or clear outcome)
• What you learned (1 sentence)

No essays. Structured bullets only.

Email me your responses with subject line: Week 7 Homework – [Your Name]

II. 60 Second Technical Explanation

"Explain a technical concept as if speaking to a non-technical hiring manager."

Examples:

• What is subnetting?
• What is a ticketing system?
• What is Active Directory?
• What is a firewall?

This is something that Richard and I will choose this Wednesday in our workshop. It will be from Phase 2. So be ready!

Goal: Clarity. Not jargon.`,
      submitComment: true,
      commentPlaceholder: 'Paste your 5 STAR stories and 60-second explanation notes, or confirm you emailed them.',
      commentSubmitLabel: 'Submit comment',
    },
  },
  11: {
    0: getReadChapterContent(8),
    1: {
      title: 'How Recruiting and Hiring Works: Part II',
      summary: 'Section 11 – Proof Over Promises',
      body: `How Recruiting and Hiring Works: Part II

Most Candidates Don't Understand the System

When students apply for jobs, they assume a simple sequence:

Apply → Resume Reviewed → Interview → Offer

That is rarely how it works.
Hiring is not a straight line.
It is a layered system with competing priorities, time pressure, and risk management.
If you do not understand the system, you will personalize normal outcomes.
This week is about understanding the mechanics.

Step 1: What Happens Before You Apply

Before a job ever gets posted:

• A department identifies a need.
• Leadership approves budget.
• A job description is drafted (often quickly or copied from an old template).

The role may already have:

• An internal candidate in mind.
• A contractor being converted.
• A referral being considered.

Sometimes the posting is procedural. Sometimes a company has no intention of hiring from a posting. It's unfair, but a reality.

This does not mean you shouldn't apply.
It means: The system is not built purely for fairness.

Step 2: The Job Goes Live

Once posted:

• Applications begin flowing in immediately.
• Some roles receive 50–300+ applicants in days.
• Recruiters are assigned dozens of open roles simultaneously.

Recruiters are measured on:

• Time-to-fill
• Interview volume
• Offer acceptance
• Candidate throughput

They are not measured on:

• Reading every resume deeply
• Explaining rejection to every applicant
• Coaching applicants

This is not cruelty.
It is workload structure.

Step 3: The Resume Scan

This is the part students misunderstand most.
Initial resume scans often last: 6–10 seconds.

Recruiters are scanning for:

• Relevant keywords
• Clear role alignment
• Stability signals
• Measurable outcomes
• Clean formatting

They are scanning for risk.
Hiring is not about choosing the most impressive person.
It is about minimizing risk.

The Risk Filter

Every hiring decision answers one silent question: "Is this person a safe bet?"

Risk signals include:

• Vague job descriptions
• No measurable results
• Frequent job changes without explanation
• Poor formatting
• Spelling errors
• Defensive language in interviews
• Overconfidence without proof

Low-risk signals include:

• Clear alignment with role
• Concise, measurable bullet points
• Calm communication
• Structured answers
• Ownership of mistakes
• Professional maturity

When you understand this, you stop trying to "sound impressive."
You try to "sound reliable."
Reliability gets hired.

Step 4: The Internal Bias

Many hiring decisions are influenced by:

• Internal candidates
• Referrals
• Previous contractors
• Known relationships

Sometimes an external candidate never had a realistic chance.
That does not mean your application was weak.
It means timing and politics matter.
Understanding this prevents self-blame.

Step 5: Why Ghosting Happens

Ghosting is rarely personal.
It usually results from:

• Hiring manager delays
• Role re-scoping
• Budget freezes
• Recruiter overload
• Pipeline shifts
• Internal conversion
• Priorities changing mid-search

Recruiters often manage 20–40 roles simultaneously.
Communication gaps are a symptom of scale.
Not a judgment of you.

Step 6: Hiring Managers vs Recruiters

Recruiters:

• Screen for baseline alignment
• Reduce risk
• Move volume

Hiring Managers:

• Evaluate skill depth
• Assess culture fit
• Determine long-term value

Recruiters want clarity and alignment.
Hiring managers want competence and reliability.
Your resume and interview must satisfy both.

Step 7: The Timing Variable

Some roles are filled in 72 hours.
Some stay open for months.
Some are paused indefinitely.
Timing can determine success.
Two identical candidates applying two weeks apart may have completely different outcomes.
You cannot control timing.
You can control consistency and volume.

The Emotional Shift

If you misunderstand the system, you will think: "I am failing."
If you understand the system, you will think: "I am navigating a machine."
That difference matters.
Rejection is often systemic.
Not personal.

What This Knowledge Should Change

After this reading, you should:

• Tailor more intentionally.
• Reduce emotional overreaction.
• Stop mass applying blindly.
• Understand why networking helps.
• Follow up strategically.
• Evaluate roles with more clarity.

You are not powerless.
You are operating within constraints.
Strategic candidates understand constraints.`,
      submitComment: true,
      commentPlaceholder: 'Add a comment or confirmation after completing the reading (optional).',
      commentSubmitLabel: 'Submit comment',
    },
    2: {
      title: 'Assignment 1 – Reverse Engineer a Posting',
      summary: 'Section 11 – Proof Over Promises',
      body: `Assignment 1 – Reverse Engineer a Posting

Find one job posting you would realistically apply to.

Answer:

• What problem is this company trying to solve?
• What signals of urgency do you see?
• What are the 3 most repeated keywords?
• What would make a candidate "low risk" for this role?
• What would make a candidate "high risk"?`,
      submitComment: true,
      commentPlaceholder: 'Paste your reverse-engineering answers for the job posting.',
      commentSubmitLabel: 'Submit my answers',
    },
    3: {
      title: 'Assignment 2 – Resume Through a Recruiter Lens',
      summary: 'Section 11 – Proof Over Promises',
      body: `Assignment 2 – Resume Through a Recruiter Lens

You should already have your resume uploaded into your NotebookLM. Find another job posting you would want to apply to and upload that. Then upload the reading assignment and use this prompt for your notebook:

"Pretend you are a recruiter scanning resumes in 10 seconds. What concerns would you have about mine?"

Email me what your notebook tells you. Pay attention to the details.`,
      submitComment: true,
      commentPlaceholder: 'Paste what your notebook said, or confirm you emailed your instructor.',
      commentSubmitLabel: 'Submit comment',
    },
    4: {
      title: '1:1 Progress Review – Come Prepared',
      summary: 'Section 11 – Proof Over Promises',
      body: `It's that time again!

In our upcoming 1:1 meetings, we will be reviewing all assigned homework and making sure everything is polished and complete.

We will specifically be looking at:

• Your Career Notebook in NotebookLM
• Your LinkedIn profile
• Your Indeed profile
• Your Job Application Tracker
• Your final resume

By this point, you should be feeling confident and prepared for your mock technical interviews. These sessions are designed to ensure you are presenting yourself clearly, professionally, and with confidence.

Come prepared to discuss your progress and any areas where you still need support.

I'm looking forward to connecting with each of you and helping you take this next step.`,
      linkUrl: 'https://ka.kableacademy.com/meetings/matthew-kohlmorgen',
      linkLabel: 'Book your 1:1 progress review',
      submitButtonOnly: true,
      commentSubmitLabel: 'Mark complete',
    },
  },
  12: {
    0: getReadChapterContent(9),
    1: {
      title: 'Mock Technical Interview – Book with Jon or Daniel',
      summary: 'Section 12 – Behind the Curtain',
      body: `The two links below are for scheduling your mock technical interviews with Jon and Daniel — two IT instructors with over 15 years of IT experience between them. They have been in help desk, IT roles and have a lot of wisdom.

Please book a time in the next two weeks to complete this interview and we will go over them in your final 1:1!`,
      linkUrl: 'https://ka.kableacademy.com/meetings/jon-lascelles?uuid=fb175bd0-1ee5-4fcc-b371-7043f9c6c341',
      linkLabel: 'Book with Jon Lascelles',
      linkUrl2: 'https://ka.kableacademy.com/meetings/dhoffman2?uuid=85e1fcda-4b03-4689-bfbe-5c255bfe5cf5',
      linkLabel2: 'Book with Daniel Hoffman',
      submitButtonOnly: true,
      commentSubmitLabel: 'Mark complete',
    },
  },
};
