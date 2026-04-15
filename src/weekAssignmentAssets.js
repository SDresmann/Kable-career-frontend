/**
 * Assignment files live under src/WeekN/assignments/ (bundled URLs at build time).
 * Keys: `${sectionId}:${filename}` — must match SECTION_ASSIGNMENT_FILES entries.
 */
export const WEEK_ASSIGNMENT_ASSETS = {
  '1:the_master_ebook.docx': require('./Week1/assignments/the_master_ebook.docx'),
  '1:intake_assignment_week_1.docx': require('./Week1/assignments/intake_assignment_week_1.docx'),
  '2:the_master_ebook.docx': require('./Week2/assignments/the_master_ebook.docx'),
  '2:week_2_intake_assignment.docx': require('./Week2/assignments/week_2_intake_assignment.docx'),
  '3:the_master_ebook.docx': require('./Week3/assignments/the_master_ebook.docx'),
  '3:week_3_assignment.docx': require('./Week3/assignments/week_3_assignment.docx'),
  '3:week_3_intake_assignment.docx': require('./Week3/assignments/week_3_intake_assignment.docx'),
  '3:week_3_linkedin_setup_assignment.docx': require('./Week3/assignments/week_3_linkedin_setup_assignment.docx'),
  '3:week_3_quiz.docx': require('./Week3/assignments/week_3_quiz.docx'),
  '4:the_master_ebook.docx': require('./Week4/assignments/the_master_ebook.docx'),
  '4:chapter_4_quiz.docx': require('./Week4/assignments/chapter_4_quiz.docx'),
  '4:chapter_4_reflection.docx': require('./Week4/assignments/chapter_4_reflection.docx'),
  '4:week_4_intake_assignment.docx': require('./Week4/assignments/week_4_intake_assignment.docx'),
  '4:week_4_job_tracker.docx': require('./Week4/assignments/week_4_job_tracker.docx'),
  '5:the_master_ebook.docx': require('./Week5/assignments/the_master_ebook.docx'),
  '5:chapter_5_quiz.docx': require('./Week5/assignments/chapter_5_quiz.docx'),
  '5:week_5_resume_version_2.docx': require('./Week5/assignments/week_5_resume_version_2.docx'),
  '5:week_5_soft_skills_interview.docx': require('./Week5/assignments/week_5_soft_skills_interview.docx'),
  '6:the_master_ebook.docx': require('./Week6/assignments/the_master_ebook.docx'),
  '6:week_6_assignment.docx': require('./Week6/assignments/week_6_assignment.docx'),
  '6:week_6_quiz.docx': require('./Week6/assignments/week_6_quiz.docx'),
  '6:week_6_reverse_engineering.docx': require('./Week6/assignments/week_6_reverse_engineering.docx'),
  '7:the_master_ebook.docx': require('./Week7/assignments/the_master_ebook.docx'),
  '7:week_7_assignment.docx': require('./Week7/assignments/week_7_assignment.docx'),
  '7:week_7_interview_performance.docx': require('./Week7/assignments/week_7_interview_performance.docx'),
  '8:the_master_ebook.docx': require('./Week8/assignments/the_master_ebook.docx'),
  '8:week_8_assignments.docx': require('./Week8/assignments/week_8_assignments.docx'),
  '8:week_8_professionalism.docx': require('./Week8/assignments/week_8_professionalism.docx'),
  '9:the_master_ebook.docx': require('./Week9/assignments/the_master_ebook.docx'),
  '9:week_9_consistency.docx': require('./Week9/assignments/week_9_consistency.docx'),
  '10:the_master_ebook.docx': require('./Week10/assignments/the_master_ebook.docx'),
  '10:week_10_assignment.docx': require('./Week10/assignments/week_10_assignment.docx'),
  '10:week_10_opportunities.docx': require('./Week10/assignments/week_10_opportunities.docx'),
  '11:the_master_ebook.docx': require('./Week11/assignments/the_master_ebook.docx'),
  '11:week_11_assignment.docx': require('./Week11/assignments/week_11_assignment.docx'),
  '11:week_11_operating_like_you_have_the_job.docx': require('./Week11/assignments/week_11_operating_like_you_have_the_job.docx'),
  '12:the_master_ebook.docx': require('./Week12/assignments/the_master_ebook.docx'),
  '12:week_12_staying_in_the_game.docx': require('./Week12/assignments/week_12_staying_in_the_game.docx'),
};

export function getWeekAssignmentAssetUrl(sectionId, filename) {
  if (sectionId == null || !filename) return null;
  const key = `${sectionId}:${filename}`;
  return WEEK_ASSIGNMENT_ASSETS[key] ?? null;
}
