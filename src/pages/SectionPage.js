import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import week1Video from '../video/The Modern Hiring Process.mp4';
import {
  WORKSHOP_TITLES,
  WORKSHOP_FOCUS,
  getAssignmentOptions,
  SECTION_VIDEO,
  SECTION_VIDEO_LABEL,
  SECTION_AUDIO,
  SECTION_ASSIGNMENT_FILES,
} from './sectionData';
import { getMediaUrl, getStaticMediaUrl } from '../api';
import './SectionPage.css';

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
  const isSection1 = id === 1;

  const focusPoints = WORKSHOP_FOCUS[id - 1] || [];
  const videoFilename = SECTION_VIDEO[id];
  const videoLabel = SECTION_VIDEO_LABEL[id];
  const audioFilename = SECTION_AUDIO[id];
  const assignmentFiles = SECTION_ASSIGNMENT_FILES[id] || [];
  const assignmentOptions = getAssignmentOptions(id);
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [videoUseStaticFallback, setVideoUseStaticFallback] = useState(false);
  const [week1VideoUseRemote, setWeek1VideoUseRemote] = useState(false);
  const [audioUseStaticFallback, setAudioUseStaticFallback] = useState(false);

  useEffect(() => {
    setVideoError(false);
    setVideoUseStaticFallback(false);
    setWeek1VideoUseRemote(false);
    setAudioError(false);
    setAudioUseStaticFallback(false);
  }, [id]);

  const videoSrc = videoFilename
    ? id === 1 && !week1VideoUseRemote
      ? week1Video
      : videoUseStaticFallback
        ? getStaticMediaUrl(id, 'video', videoFilename)
        : getMediaUrl(id, 'video', videoFilename)
    : null;
  const audioSrc = audioFilename
    ? (audioUseStaticFallback ? getStaticMediaUrl(id, 'audio', audioFilename) : getMediaUrl(id, 'audio', audioFilename))
    : null;

  const { user, logout } = useAuth();

  return (
    <div className="section-page">
      <header className="page-header">
        <KableLogo />
        {user ? (
          <button type="button" onClick={logout} className="header-auth-link">Sign out</button>
        ) : (
          <Link to="/login" className="header-auth-link">Log in</Link>
        )}
      </header>

      <main className="section-main">
        <h1 className="section-title">{title}</h1>
        <hr className="section-title-rule" />

        {/* Block 1: Objectives + Video */}
        <section className="section-block block-objectives-video">
          <div className="block-objectives">
            <h2 className="block-heading">Focus</h2>
            <ol className="objectives-list">
              {focusPoints.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="block-video">
            {videoFilename ? (
              <div className="video-player">
                {!videoError ? (
                  <video
                    src={videoSrc}
                    controls
                    preload="metadata"
                    className="section-main-video"
                    aria-label={videoLabel || 'Week video'}
                    onError={() => {
                      if (id === 1 && !week1VideoUseRemote) {
                        setWeek1VideoUseRemote(true);
                      } else if (!videoUseStaticFallback) {
                        setVideoUseStaticFallback(true);
                      } else {
                        setVideoError(true);
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                {videoError ? (
                  <div className="video-placeholder">
                    <p className="video-placeholder-text">Video couldn&apos;t load in the player.</p>
                    <a href={videoSrc} target="_blank" rel="noopener noreferrer" className="btn-video">Open video in new tab</a>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="video-player video-placeholder">
                <p className="video-placeholder-text">No video for this week.</p>
              </div>
            )}
          </div>
        </section>

        {/* Block 2: Quiz + Audio */}
        <section className="section-block block-quiz-audio">
          <div className="block-quiz-panel">
            <div className="block-icon quiz-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4"/></svg>
            </div>
            <h2 className="block-heading white">Quiz</h2>
            {(isSection1 || id === 2 || id === 3 || id === 8 || id === 9 || id === 10 || id === 11 || id === 12) ? (
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
                  <div className="audio-player">
                    <audio
                      src={audioSrc}
                      controls
                      preload="metadata"
                      className="section-audio-element"
                      aria-label="Audio lesson"
                      onError={() => {
                        if (!audioUseStaticFallback) {
                          setAudioUseStaticFallback(true);
                        } else {
                          setAudioError(true);
                        }
                      }}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <div className="audio-fallback">
                    <p className="audio-placeholder-text">Audio couldn&apos;t load in the player.</p>
                    <a href={audioSrc} target="_blank" rel="noopener noreferrer" className="audio-links">Open audio in new tab</a>
                    <a href={audioSrc} download className="audio-links">Download audio</a>
                  </div>
                )}
                {!audioError && (
                  <div className="audio-links">
                    <a href={audioSrc} download>Download audio</a>
                  </div>
                )}
              </>
            ) : (
              <p className="audio-placeholder-text">No audio for this week.</p>
            )}
          </div>
        </section>

        {/* Block 3: Videos list */}
        {videoFilename && (
          <section className="section-block block-videos">
            <div className="block-videos-sidebar">
              <div className="block-icon videos-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>
              </div>
              <h2 className="block-heading white">Videos</h2>
            </div>
            <div className="block-videos-content">
              <p className="block-prompt">Watch this week&apos;s video:</p>
              <div className="video-buttons">
                <a
                  href={videoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-video"
                >
                  {videoLabel || videoFilename}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Block 4: Assignments (one section: online assignments + course materials) */}
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
