const API_BASE =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://kable-career-backend.onrender.com' : 'http://localhost:5000');
const AUTH_KEY = 'kable_user';

function getStoredUser() {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (_) {
    return null;
  }
}

function getAuthHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const auth = getStoredUser();
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  return headers;
}

/** Logged-in user's email (from localStorage) so submissions are tied to the right person */
function getLoggedInEmail(override) {
  if (override && typeof override === 'string' && override.trim()) return override.trim();
  const auth = getStoredUser();
  return auth?.email || '';
}

async function fetchWithRetry(url, options, retries = 4) {
  let lastRes = null;
  let lastData = null;
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;
    lastRes = res;
    lastData = data;
    if (res.status === 503 && i < retries) {
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      continue;
    }
    break;
  }
  const msg = lastRes?.status === 503
    ? 'Service is starting up. Please wait a moment and try again.'
    : lastRes?.status === 404
      ? 'Login service not found. Please check back later or contact support.'
      : lastData?.message || 'Login failed';
  throw new Error(msg);
}

export async function login(email, password) {
  const data = await fetchWithRetry(`${API_BASE}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return data;
}

export async function register(email, password) {
  const data = await fetchWithRetry(`${API_BASE}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return data;
}

/** Fetch current user's file submissions (to check if assignment already submitted) */
export async function getMySubmissions(userEmail) {
  const adminBase = process.env.REACT_APP_KABLE_ADMIN_API_URL || 'http://localhost:5001';
  const email = getLoggedInEmail(userEmail);
  if (!email) return { success: true, data: [] };
  const res = await fetch(`${adminBase}/api/submissions?userEmail=${encodeURIComponent(email)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { success: false, data: [] };
  return { success: true, data: data.data || [] };
}

/** Submit checklist with file (e.g. Resume v1) – sends to backend, which can email recipient */
export async function submitChecklistWithFile(file, assignmentName = 'Resume v1 Checklist', userEmail = '') {
  const form = new FormData();
  form.append('file', file);
  form.append('assignmentName', assignmentName);
  const email = getLoggedInEmail(userEmail);
  if (email) form.append('userEmail', email);
  const headers = getAuthHeaders();
  delete headers['Content-Type']; // let browser set multipart boundary
  const res = await fetch(`${API_BASE}/api/checklist-submit`, {
    method: 'POST',
    headers,
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Submission failed');
  return data;
}

/** Submit an assignment comment (and optional checklist state) – saved to database */
export async function submitAssignmentComment({ assignmentName, comment, userEmail = '', sectionId, assignmentIndex, checklistChecked }) {
  const payload = {
    assignmentName: assignmentName || 'Assignment',
    comment: comment.trim(),
    userEmail: getLoggedInEmail(userEmail),
    sectionId: sectionId != null ? parseInt(sectionId, 10) : 0,
    assignmentIndex: assignmentIndex != null ? parseInt(assignmentIndex, 10) : 0,
  };
  if (Array.isArray(checklistChecked)) {
    payload.checklistChecked = checklistChecked;
  }
  const res = await fetch(`${API_BASE}/api/assignment-comment`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Submission failed');
  return data;
}

/** Fetch current user's quiz results from admin (to check if section quiz already completed) */
export async function getMyQuizResults(userEmail) {
  const adminBase = process.env.REACT_APP_KABLE_ADMIN_API_URL || 'http://localhost:5001';
  const email = getLoggedInEmail(userEmail);
  if (!email) return { success: true, data: [] };
  const res = await fetch(`${adminBase}/api/quiz-results?userEmail=${encodeURIComponent(email)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { success: false, data: [] };
  return { success: true, data: data.data || [] };
}

/** Submit section quiz result so it appears in Kable Career Admin (optional: set REACT_APP_KABLE_ADMIN_API_URL) */
export async function submitSectionQuizResult({ userEmail, sectionId, sectionTitle, score, total }) {
  const adminBase = process.env.REACT_APP_KABLE_ADMIN_API_URL || 'http://localhost:5001';
  const email = getLoggedInEmail(userEmail);
  if (!email) {
    console.warn('Quiz result not sent: no logged-in email. Log in so your result is saved.');
    return { success: false };
  }
  const res = await fetch(`${adminBase}/api/quiz-results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail: email, sectionId, sectionTitle, score, total }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to save quiz result');
  return data;
}

/** Fetch section IDs released for this student's cohort (admin API). Returns [] if no cohort or not assigned yet – then student sees all sections. */
export async function getReleasedSections(userEmail) {
  const adminBase = process.env.REACT_APP_KABLE_ADMIN_API_URL || 'http://localhost:5001';
  const email = getLoggedInEmail(userEmail);
  if (!email) return { success: true, data: { sectionIds: [] } };
  const res = await fetch(`${adminBase}/api/released-sections?userEmail=${encodeURIComponent(email)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { success: true, data: { sectionIds: [] } };
  return { success: true, data: data.data || { sectionIds: [] } };
}

/** Use for future authenticated API calls: fetch(url, { headers: getAuthHeaders() }) */
export { getAuthHeaders };
