/**
 * Assignment files live under src/WeekN/assignments/ (bundled URLs at build time).
 * Keys: `${sectionId}:${filename}` — must match SECTION_ASSIGNMENT_FILES entries.
 */
export const WEEK_ASSIGNMENT_ASSETS = {
  '6:professionalism_playbook.docx': require('./Week6/assignments/professionalism_playbook.docx'),
  '8:hiring_system_guide.docx': require('./Week8/assignments/hiring_system_guide.docx'),
};

export function getWeekAssignmentAssetUrl(sectionId, filename) {
  if (sectionId == null || !filename) return null;
  const key = `${sectionId}:${filename}`;
  return WEEK_ASSIGNMENT_ASSETS[key] ?? null;
}
