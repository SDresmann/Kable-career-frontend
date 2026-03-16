import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  WORKSHOP_TITLES,
  getAssignmentOptions,
  ASSIGNMENT_CONTENT,
} from './sectionData';
import { submitChecklistWithFile, submitAssignmentComment, getMySubmissions } from '../api';
import './AssignmentPage.css';

function KableLogo() {
  return (
    <Link to="/" className="kable-logo" aria-label="Kable Academy">
      <span className="logo-k-wrap">
        <span className="logo-k-letter">K</span>
      </span>
      <span className="logo-rest">able Academy</span>
    </Link>
  );
}

function getAssignmentTitle(sectionId, assignmentIndex) {
  const options = getAssignmentOptions(sectionId);
  const index = parseInt(assignmentIndex, 10);
  return options[index] || 'Assignment';
}

export default function AssignmentPage() {
  const { sectionId, assignmentIndex } = useParams();
  const { user, logout } = useAuth();
  const sectionNum = sectionId ? parseInt(sectionId, 10) : 1;
  const index = assignmentIndex ? parseInt(assignmentIndex, 10) : 0;
  const sectionTitle = WORKSHOP_TITLES[sectionNum - 1] || WORKSHOP_TITLES[0];
  const assignmentTitle = getAssignmentTitle(sectionId, assignmentIndex);
  const content = ASSIGNMENT_CONTENT[sectionNum]?.[index];

  const questions = content?.questions || [];
  const checklistItems = content?.checklist || [];
  const [responses, setResponses] = useState(() => questions.map(() => ''));
  const [submitted, setSubmitted] = useState(false);
  const [checklistChecked, setChecklistChecked] = useState(() => checklistItems.map(() => false));
  const [allDoneChecked, setAllDoneChecked] = useState(false);
  const [checklistFile, setChecklistFile] = useState(null);
  const [checklistSubmitStatus, setChecklistSubmitStatus] = useState('idle'); // idle | sending | success | error
  const [checklistSubmitError, setChecklistSubmitError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitStatus, setCommentSubmitStatus] = useState('idle'); // idle | sending | success | error
  const [commentSubmitError, setCommentSubmitError] = useState('');
  const [alreadySubmittedFile, setAlreadySubmittedFile] = useState(false);
  const [submissionsCheckLoading, setSubmissionsCheckLoading] = useState(!!user?.email);

  // Stable name for this assignment's file submission (so we can block duplicate uploads)
  const assignmentNameForFile = `Section ${sectionNum} - ${content?.checklistTitle || assignmentTitle || 'Checklist'}`;

  useEffect(() => {
    setResponses(questions.map(() => ''));
    setSubmitted(false);
    setChecklistChecked((content?.checklist || []).map(() => false));
    setAllDoneChecked(false);
    setChecklistFile(null);
    setChecklistSubmitStatus('idle');
    setChecklistSubmitError('');
    setCommentText('');
    setCommentSubmitStatus('idle');
    setCommentSubmitError('');
    setAlreadySubmittedFile(false);
  }, [sectionNum, index]);

  useEffect(() => {
    if (!user?.email || content?.checklistWithoutFile) {
      setSubmissionsCheckLoading(false);
      return;
    }
    let cancelled = false;
    getMySubmissions(user.email).then(({ data }) => {
      if (cancelled) return;
      const list = data || [];
      const hasThisAssignment = list.some((s) => {
        const name = (s.assignmentName || '').trim();
        if (name === assignmentNameForFile.trim()) return true;
        // Backward compatibility: old submissions used "Resume v1 Checklist" only
        if (name === 'Resume v1 Checklist' && (content?.checklistTitle === 'Resume v1 Checklist' || assignmentTitle?.includes('Resume'))) return true;
        return false;
      });
      if (hasThisAssignment) setAlreadySubmittedFile(true);
      setSubmissionsCheckLoading(false);
    });
    return () => { cancelled = true; };
  }, [user?.email, assignmentNameForFile, content?.checklistWithoutFile]);

  const handleResponseChange = (i, value) => {
    const next = [...responses];
    next[i] = value;
    setResponses(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChecklistChange = (i) => {
    setChecklistChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const handleChecklistFileSubmit = async (e) => {
    e.preventDefault();
    if (!checklistFile) {
      setChecklistSubmitError('Please select a file (e.g. your resume or completed checklist) to submit.');
      return;
    }
    setChecklistSubmitStatus('sending');
    setChecklistSubmitError('');
    try {
      await submitChecklistWithFile(checklistFile, assignmentNameForFile, user?.email || '');
      setChecklistSubmitStatus('success');
      setAlreadySubmittedFile(true);
    } catch (err) {
      setChecklistSubmitStatus('error');
      setChecklistSubmitError(err.message || 'Submission failed. Please try again.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    const isButtonOnly = content?.submitButtonOnly;
    if (!isButtonOnly && !trimmed) {
      setCommentSubmitError('Please enter your profile link or a comment.');
      return;
    }
    setCommentSubmitStatus('sending');
    setCommentSubmitError('');
    try {
      const payload = {
        assignmentName: content?.title || assignmentTitle,
        comment: isButtonOnly ? (content.submitButtonOnlyComment || 'Completed') : trimmed,
        userEmail: user?.email || '',
        sectionId: sectionNum,
        assignmentIndex: index,
      };
      if (content?.checklistWithoutFile && checklistItems.length > 0) {
        payload.checklistChecked = checklistChecked;
      }
      await submitAssignmentComment(payload);
      setCommentSubmitStatus('success');
      setCommentText('');
      if (content?.checklistWithoutFile && checklistItems.length > 0) {
        setChecklistChecked(checklistItems.map(() => false));
      }
    } catch (err) {
      setCommentSubmitStatus('error');
      setCommentSubmitError(err.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="assignment-page">
      <header className="page-header">
        <KableLogo />
        <Link to={`/section/${sectionId}`} className="header-back">← Back to Section</Link>
        {user ? (
          <button type="button" onClick={logout} className="header-auth-link">Sign out</button>
        ) : (
          <Link to="/login" className="header-auth-link">Log in</Link>
        )}
      </header>

      <main className="assignment-main">
        <p className="assignment-breadcrumb">
          <Link to="/">Home</Link>
          {' → '}
          <Link to={`/section/${sectionId}`}>Section {sectionId} – {sectionTitle}</Link>
          {' → '}
          <span className="current">{assignmentTitle}</span>
        </p>

        <h1 className="assignment-title">{content?.title ?? assignmentTitle}</h1>
        {content?.summary && <p className="assignment-summary">{content.summary}</p>}

        {content?.image && (
          <figure className="assignment-figure">
            <img src={content.image} alt={content.imageAlt || content.title || assignmentTitle} className="assignment-image" />
          </figure>
        )}

        <div className="assignment-body">
          {content?.body ? (
            <div className="assignment-body-text">{content.body}</div>
          ) : null}
          {(content?.linkUrl || content?.linkUrl2) && (
            <p className="assignment-body-link">
              {content.linkUrl && (
                <a href={content.linkUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  {content.linkLabel || 'Open link'}
                </a>
              )}
              {content.linkUrl2 && (
                <>
                  {content.linkUrl && ' '}
                  <a href={content.linkUrl2} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    {content.linkLabel2 || 'Open link'}
                  </a>
                </>
              )}
            </p>
          )}
          {questions.length > 0 && (
            <form className="assignment-questions-form" onSubmit={handleSubmit}>
              {submitted ? (
                <p className="assignment-form-thanks">Thank you for your responses. Your reflections have been recorded.</p>
              ) : (
                <>
                  {questions.map((q, i) => (
                    <div key={i} className="assignment-question-field">
                      <label htmlFor={`q-${i}`} className="assignment-question-label">{q}</label>
                      <textarea
                        id={`q-${i}`}
                        className="assignment-question-input"
                        value={responses[i]}
                        onChange={(e) => handleResponseChange(i, e.target.value)}
                        rows={4}
                        placeholder="Type your response here..."
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn-submit">Submit responses</button>
                </>
              )}
            </form>
          )}
          {checklistItems.length > 0 && (
            <div className="assignment-checklist">
              <h3 className="assignment-checklist-title">{content?.checklistTitle || 'Resume v1 Checklist'}</h3>
              <ul className="assignment-checklist-list">
                {checklistItems.map((item, i) => (
                  <li key={i} className="assignment-checklist-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={checklistChecked[i] || false}
                        onChange={() => handleChecklistChange(i)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {content?.checklistTagline && (
                <p className="assignment-checklist-tagline">{content.checklistTagline}</p>
              )}
              {!content?.checklistWithoutFile && (
                <>
                  <div className="assignment-checklist-done">
                    <label>
                      <input
                        type="checkbox"
                        checked={allDoneChecked}
                        onChange={() => setAllDoneChecked((v) => !v)}
                      />
                      <span>{content?.checklistDoneLabel || 'Everything is done'}</span>
                    </label>
                  </div>
                  {submissionsCheckLoading ? (
                    <p className="assignment-checklist-hint">Checking submission status…</p>
                  ) : alreadySubmittedFile ? (
                    <div className="assignment-already-submitted">
                      <p className="assignment-already-message">You have already submitted this assignment. You cannot upload again.</p>
                    </div>
                  ) : (
                  <form className="assignment-checklist-submit" onSubmit={handleChecklistFileSubmit}>
                <div className="assignment-checklist-upload">
                  <label htmlFor="checklist-file">Attach a file (resume or checklist):</label>
                  <input
                    id="checklist-file"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,image/*"
                    onChange={(e) => setChecklistFile(e.target.files?.[0] || null)}
                  />
                  {checklistFile && <span className="assignment-checklist-filename">{checklistFile.name}</span>}
                </div>
                {checklistSubmitStatus === 'success' && (
                  <p className="assignment-checklist-success">Submission received. Your file has been sent.</p>
                )}
                {checklistSubmitStatus === 'error' && checklistSubmitError && (
                  <p className="assignment-checklist-error">{checklistSubmitError}</p>
                )}
                {(!(checklistChecked.every(Boolean) && allDoneChecked) || !checklistFile) && (
                  <p className="assignment-checklist-hint">
                    Complete all checkboxes above (including “Everything is done”) and attach a file to enable submission.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={
                    checklistSubmitStatus === 'sending' ||
                    !checklistChecked.every(Boolean) ||
                    !allDoneChecked ||
                    !checklistFile
                  }
                >
                  {checklistSubmitStatus === 'sending' ? 'Sending…' : 'Submit file'}
                </button>
                  </form>
                  )}
                </>
              )}
            </div>
          )}
          {(content?.submitComment || content?.submitButtonOnly) && (
            <form className="assignment-comment-form" onSubmit={handleCommentSubmit}>
              {!content?.submitButtonOnly && (
                <>
                  {content?.reflectionQuestions?.length > 0 ? (
                    <div className="assignment-reflection">
                      <h3 className="assignment-reflection-title">Reflection</h3>
                      <p className="assignment-reflection-intro">Answer in the box below:</p>
                      <ul className="assignment-reflection-questions">
                        {content.reflectionQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <label htmlFor="assignment-comment" className="assignment-comment-label">
                      Add your LinkedIn profile link or comment for your instructor:
                    </label>
                  )}
                  <textarea
                    id="assignment-comment"
                    className="assignment-question-input"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={content.commentPlaceholder || 'Paste your profile link or add a comment…'}
                    rows={4}
                    disabled={commentSubmitStatus === 'sending'}
                  />
                </>
              )}
              {commentSubmitStatus === 'success' && (
                <p className="assignment-form-thanks">
                  {content?.submitButtonOnly ? 'Marked complete. We will review in our one-on-one.' : 'Your comment has been saved. We will review it in our one-on-one.'}
                </p>
              )}
              {commentSubmitStatus === 'error' && commentSubmitError && (
                <p className="assignment-checklist-error">{commentSubmitError}</p>
              )}
              <button
                type="submit"
                className="btn-submit"
                disabled={commentSubmitStatus === 'sending' || (!content?.submitButtonOnly && !commentText.trim())}
              >
                {commentSubmitStatus === 'sending' ? 'Sending…' : (content.commentSubmitLabel || 'Submit comment')}
              </button>
            </form>
          )}
          {!content?.body && questions.length === 0 && checklistItems.length === 0 && (
            <p className="assignment-placeholder">Assignment content will appear here. Check back later or use the workbook for this section.</p>
          )}
        </div>

        <div className="assignment-actions">
          <Link to={`/section/${sectionId}`} className="btn-outline">Back to Section {sectionId}</Link>
        </div>
      </main>
    </div>
  );
}
