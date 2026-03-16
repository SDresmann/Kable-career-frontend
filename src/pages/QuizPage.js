import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitSectionQuizResult, getMyQuizResults } from '../api';
import { WORKSHOP_TITLES, SECTION_1_QUIZ, SECTION_2_QUIZ, SECTION_3_QUIZ, SECTION_7_QUIZ, SECTION_8_QUIZ, SECTION_9_QUIZ, SECTION_11_QUIZ, SECTION_12_QUIZ } from './sectionData';
import './QuizPage.css';

function percentToLetterGrade(percent) {
  if (percent >= 90) return 'A';
  if (percent >= 80) return 'B';
  if (percent >= 70) return 'C';
  if (percent >= 60) return 'D';
  return 'F';
}

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

export default function QuizPage() {
  const { sectionId } = useParams();
  const { user, logout } = useAuth();
  const sectionNum = sectionId ? parseInt(sectionId, 10) : 1;
  const sectionTitle = WORKSHOP_TITLES[sectionNum - 1] || WORKSHOP_TITLES[0];

  const questions = sectionNum === 1 ? SECTION_1_QUIZ : sectionNum === 2 ? SECTION_2_QUIZ : sectionNum === 3 ? SECTION_3_QUIZ : sectionNum === 10 ? SECTION_7_QUIZ : sectionNum === 11 ? SECTION_8_QUIZ : sectionNum === 12 ? SECTION_9_QUIZ : sectionNum === 8 ? SECTION_11_QUIZ : sectionNum === 9 ? SECTION_12_QUIZ : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [previousResult, setPreviousResult] = useState(null);
  const [checkLoading, setCheckLoading] = useState(!!user?.email);

  useEffect(() => {
    if (!user?.email || questions.length === 0) {
      setCheckLoading(false);
      return;
    }
    let cancelled = false;
    getMyQuizResults(user.email).then(({ data }) => {
      if (cancelled) return;
      const forThisSection = (data || []).find((r) => String(r.sectionId) === String(sectionNum));
      if (forThisSection) {
        setAlreadyCompleted(true);
        setPreviousResult(forThisSection);
      }
      setCheckLoading(false);
    });
    return () => { cancelled = true; };
  }, [user?.email, sectionNum, questions.length]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleOptionChange = (optionIndex) => {
    const next = [...answers];
    next[currentIndex] = optionIndex;
    setAnswers(next);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      setSubmitted(true);
      const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
      const total = questions.length;
      if (total > 0) {
        try {
          await submitSectionQuizResult({
            userEmail: user?.email || '',
            sectionId: String(sectionNum),
            sectionTitle,
            score,
            total,
          });
        } catch (err) {
          console.warn('Could not save quiz result to admin:', err);
        }
      }
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].correctIndex).length
    : 0;
  const total = questions.length;

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <header className="page-header">
          <KableLogo />
          <Link to={`/section/${sectionId}`} className="header-back">← Back to Section</Link>
          {user ? <button type="button" onClick={logout} className="header-auth-link">Sign out</button> : <Link to="/login" className="header-auth-link">Log in</Link>}
        </header>
        <main className="quiz-main">
          <p>No quiz available for this section.</p>
          <Link to={`/section/${sectionId}`} className="btn-outline">Back to Section</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <header className="page-header">
        <KableLogo />
        <Link to={`/section/${sectionId}`} className="header-back">← Back to Section</Link>
        {user ? <button type="button" onClick={logout} className="header-auth-link">Sign out</button> : <Link to="/login" className="header-auth-link">Log in</Link>}
      </header>

      <main className="quiz-main">
        <p className="quiz-breadcrumb">
          <Link to="/">Home</Link>
          {' → '}
          <Link to={`/section/${sectionId}`}>Section {sectionId} – {sectionTitle}</Link>
          {' → '}
          <span className="current">Quiz</span>
        </p>

        <h1 className="quiz-title">Section {sectionId} Quiz</h1>
        <p className="quiz-subtitle">{sectionTitle}</p>

        {checkLoading ? (
          <p className="quiz-loading">Checking quiz status...</p>
        ) : alreadyCompleted && previousResult ? (
          <div className="quiz-results quiz-already-completed">
            <h2>Already completed</h2>
            <p className="quiz-already-message">You have already taken this quiz. You cannot take it again.</p>
            {previousResult.total > 0 && (
              <>
                <p className="quiz-score">Your score: {previousResult.score} out of {previousResult.total} correct</p>
                <p className="quiz-grade">
                  Grade: {Math.round((previousResult.score / previousResult.total) * 100)}% ({percentToLetterGrade((previousResult.score / previousResult.total) * 100)})
                </p>
              </>
            )}
            <Link to={`/section/${sectionId}`} className="btn-outline">Back to Section {sectionId}</Link>
          </div>
        ) : submitted ? (
          <div
            className="quiz-results quiz-no-copy"
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          >
            <h2>Your score</h2>
            <p className="quiz-score">{score} out of {total} correct</p>
            <p className="quiz-score-pct">{total > 0 ? Math.round((score / total) * 100) : 0}%</p>
            {total > 0 && (
              <p className="quiz-grade">
                Grade: {Math.round((score / total) * 100)}% ({percentToLetterGrade((score / total) * 100)})
              </p>
            )}
            <Link to={`/section/${sectionId}`} className="btn-outline">Back to Section {sectionId}</Link>
          </div>
        ) : (
          <>
            <p className="quiz-progress">Question {currentIndex + 1} of {questions.length}</p>
            <div
              className="quiz-card quiz-no-copy"
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
            >
              <h2 className="quiz-question">{currentQuestion.question}</h2>
              <div className="quiz-options" role="radiogroup" aria-label="Choose an answer">
                {currentQuestion.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="quiz-option">
                    <input
                      type="radio"
                      name="quiz-answer"
                      checked={answers[currentIndex] === optionIndex}
                      onChange={() => handleOptionChange(optionIndex)}
                    />
                    <span className="quiz-option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="quiz-actions">
              {currentIndex > 0 && (
                <button type="button" onClick={handleBack} className="btn-secondary">Back</button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
                disabled={answers[currentIndex] === null}
              >
                {isLastQuestion ? 'Submit' : 'Next'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
