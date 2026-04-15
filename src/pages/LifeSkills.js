import { useState, useEffect, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getReleasedSections } from '../api';
import { WORKSHOP_TITLES } from './sectionData';
import './LifeSkills.css';

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

const ALL_SECTION_TILES = WORKSHOP_TITLES.map((title, i) => ({
  title,
  tone: i % 2 === 0 ? 'tile-tone-blue' : 'tile-tone-green',
  to: `/section/${i + 1}`,
}));

const LifeSkillsTile = memo(function LifeSkillsTile({ title, tone, to }) {
  const className = `life-skill-tile ${tone}`;
  const content = <span className="tile-title">{title}</span>;
  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <div className={className}>
      {content}
    </div>
  );
});

export default function LifeSkillsPage() {
  const { user, logout } = useAuth();
  const [releasedSectionIds, setReleasedSectionIds] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setReleasedSectionIds([]);
      return;
    }
    let cancelled = false;
    getReleasedSections(user.email).then((result) => {
      if (cancelled) return;
      const ids = result?.data?.sectionIds;
      const arr = Array.isArray(ids) ? ids.map((id) => Number(id)) : [];
      setReleasedSectionIds(arr);
    }).catch(() => {
      if (!cancelled) setReleasedSectionIds([]);
    });
    return () => { cancelled = true; };
  }, [user?.email]);

  const hasReleasedSections = Array.isArray(releasedSectionIds) && releasedSectionIds.length > 0;
  const tiles = useMemo(() => {
    if (!Array.isArray(releasedSectionIds) || releasedSectionIds.length === 0) return [];
    return ALL_SECTION_TILES.filter((_, i) => releasedSectionIds.includes(i + 1));
  }, [releasedSectionIds]);
  const isLoading = releasedSectionIds === null && user?.email;
  const noAccess = Array.isArray(releasedSectionIds) && releasedSectionIds.length === 0;

  return (
    <div className="life-skills-page">
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
      <main className="life-skills-main">
        <h1 className="life-skills-heading">LIFE SKILLS</h1>
        <p className="life-skills-subheading">
          Depending on where you are in your career life cycle, choose the topic you would like to learn more about:
        </p>
        {isLoading && (
          <p className="life-skills-empty">Loading…</p>
        )}
        {noAccess && !isLoading && (
          <div className="life-skills-empty life-skills-no-access">
            <p>You&apos;re not assigned to a cohort yet, or no weeks have been released for your cohort.</p>
            <p>Contact your administrator to get access to course materials.</p>
          </div>
        )}
        {hasReleasedSections && (
          <div className="life-skills-grid">
            {tiles.map((tile, i) => (
              <LifeSkillsTile key={tile.to || i} {...tile} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
