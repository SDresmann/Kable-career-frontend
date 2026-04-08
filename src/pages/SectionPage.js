import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  WORKSHOP_TITLES,
  WORKSHOP_FOCUS,
  getAssignmentOptions,
  SECTION_AUDIO,
  SECTION_ASSIGNMENT_FILES,
} from './sectionData';
import { getMediaUrl, getStaticMediaUrl } from '../api';
import './SectionPage.css';

/** Audio files live under src/WeekN/audio/ (one folder per week). */
const SECTION_BUNDLED_AUDIO_IMPORTS = {
  1: () => import('../Week1/audio/Audio Lecture.m4a'),
  2: () => import('../Week2/audio/Engineer_Your_Resume_for_Robots_and_Recruiters.m4a'),
  3: () => import('../Week3/audio/Stop_Job_Hunting_and_Get_Hunted.m4a'),
  4: () => import('../Week4/audio/The_Post-Bootcamp_Job_Search_Operating_System.m4a'),
  5: () => import('../Week5/audio/Beat_the_ATS_and_land_tech_interviews.m4a'),
  6: () => import('../Week6/audio/Why_Brilliant_Tech_Workers_Get_Fired.m4a'),
  7: () => import('../Week7/audio/Behavioral_interview_tactics_for_cybersecurity_career_changers.m4a'),
  10: () => import('../Week10/audio/What_managers_actually_want_from_you.m4a'),
  11: () => import('../Week11/audio/Beating_the_2026_AI_hiring_trap.m4a'),
  12: () => import('../Week12/audio/Don_t_go_broke_with_your_first_paycheck.m4a'),
};

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

export default function SectionPage() {
  const { sectionId } = useParams();
  const id = sectionId ? parseInt(sectionId, 10) : 1;
  const title = WORKSHOP_TITLES[id - 1] || WORKSHOP_TITLES[0];

  const focusPoints = WORKSHOP_FOCUS[id - 1] || [];
  const audioFilename = SECTION_AUDIO[id];
  const assignmentFiles = SECTION_ASSIGNMENT_FILES[id] || [];
  const assignmentOptions = getAssignmentOptions(id);
  const [audioError, setAudioError] = useState(false);
  const [audioUseStaticFallback, setAudioUseStaticFallback] = useState(false);
  const [audioSkipBundled, setAudioSkipBundled] = useState(false);
  const [bundledAudioUrl, setBundledAudioUrl] = useState(null);
  const [audioBundleFailed, setAudioBundleFailed] = useState(false);

  const tryAudioBundle = !!(audioFilename && SECTION_BUNDLED_AUDIO_IMPORTS[id]);
  const audioBundleLoading =
    tryAudioBundle && bundledAudioUrl === null && !audioBundleFailed && !audioSkipBundled;

  useEffect(() => {
    setAudioError(false);
    setAudioUseStaticFallback(false);
    setAudioSkipBundled(false);
    setBundledAudioUrl(null);
    setAudioBundleFailed(false);
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    if (!audioFilename || !SECTION_BUNDLED_AUDIO_IMPORTS[id]) return undefined;
    SECTION_BUNDLED_AUDIO_IMPORTS[id]()
      .then((m) => {
        if (!cancelled) setBundledAudioUrl(m.default);
      })
      .catch(() => {
        if (!cancelled) setAudioBundleFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [id, audioFilename]);

  const audioSrc = audioFilename
    ? audioBundleLoading
      ? null
      : bundledAudioUrl && !audioSkipBundled
        ? bundledAudioUrl
        : audioUseStaticFallback
          ? getStaticMediaUrl(id, 'audio', audioFilename)
          : getMediaUrl(id, 'audio', audioFilename)
    : null;

  const { user, logout } = useAuth();

  const audioLinkHref =
    audioFilename && (audioSrc || getMediaUrl(id, 'audio', audioFilename));

  return (
    <div className="section-page">
      <header className="page-header">
        <KableLogo />
        {user ? (
          <div className="header-auth-actions">
            <Link to="/account/password" className="header-auth-link">Change password</Link>
            <button type="button" onClick={logout} className="header-auth-link">Sign out</button>
          </div>
        ) : (
          <Link to="/login" className="header-auth-link">Log in</Link>
        )}
      </header>

      <main className="section-main">
        <h1 className="section-title">{title}</h1>
        <hr className="section-title-rule" />

        <section className="section-block block-objectives-only">
          <div className="block-objectives">
            <h2 className="block-heading">Focus</h2>
            <ol className="objectives-list">
              {focusPoints.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-block block-quiz-audio">
          <div className="block-quiz-panel">
            <div className="block-icon quiz-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4"/></svg>
            </div>
            <h2 className="block-heading white">Quiz</h2>
            {(id === 1 || id === 2 || id === 3 || id === 8 || id === 9 || id === 10 || id === 11 || id === 12) ? (
              <Link to={`/section/${id}/quiz`} className="btn-quiz-inline">Take Section {id} Quiz</Link>
            ) : (
              <p className="block-quiz-coming">Quiz coming soon</p>
            )}
          </div>
          <div className="block-audio">
            <div className="block-icon audio-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            </div>
            <h2 className="block-heading white">Audio Lesson</h2>
            {audioFilename ? (
              <>
                {!audioError ? (
                  audioBundleLoading ? (
                    <div className="media-loading-placeholder section-audio-element" role="status">
                      Loading audio…
                    </div>
                  ) : audioSrc ? (
                  <div className="audio-player">
                    <audio
                      src={audioSrc}
                      controls
                      preload="none"
                      className="section-audio-element"
                      aria-label="Audio lesson"
                      onError={() => {
                        if (bundledAudioUrl && !audioSkipBundled) {
                          setAudioSkipBundled(true);
                        } else if (!audioUseStaticFallback) {
                          setAudioUseStaticFallback(true);
                        } else {
                          setAudioError(true);
                        }
                      }}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  ) : null
                ) : (
                  <div className="audio-fallback">
                    <p className="audio-placeholder-text">Audio couldn&apos;t load in the player.</p>
                    <a href={audioLinkHref || '#'} target="_blank" rel="noopener noreferrer" className="audio-links">Open audio in new tab</a>
                    <a href={audioLinkHref || '#'} download className="audio-links">Download audio</a>
                  </div>
                )}
                {!audioError && audioLinkHref && !audioBundleLoading && (
                  <div className="audio-links">
                    <a href={audioLinkHref} download>Download audio</a>
                  </div>
                )}
              </>
            ) : (
              <p className="audio-placeholder-text">No audio for this week.</p>
            )}
          </div>
        </section>

        <section className="section-block block-assignments">
          <div className="block-assignments-sidebar">
            <div className="block-icon assignments-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            </div>
            <h2 className="block-heading white">Assignments</h2>
          </div>
          <div className="block-assignments-content">
            <p className="block-prompt">Assignments and course materials:</p>
            <div className="assignment-buttons">
              {assignmentOptions.map((assignmentTitle, i) => (
                <Link key={`opt-${i}`} to={`/section/${id}/assignment/${i}`} className="btn-assignment">{assignmentTitle}</Link>
              ))}
              {assignmentFiles.map((item, i) => (
                <Link key={`mat-${i}`} to={`/section/${id}/material/${i}`} className="btn-assignment">{item.label}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
