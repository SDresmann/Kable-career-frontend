import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WORKSHOP_TITLES, SECTION_ASSIGNMENT_FILES } from './sectionData';
import { MaterialBlock } from '../components/MaterialViewers';
import '../components/MaterialViewers.css';
import './MaterialsPage.css';

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

export default function MaterialsPage() {
  const { sectionId } = useParams();
  const { user, logout } = useAuth();
  const id = sectionId ? parseInt(sectionId, 10) : 1;
  const title = WORKSHOP_TITLES[id - 1] || WORKSHOP_TITLES[0];
  const files = SECTION_ASSIGNMENT_FILES[id] || [];

  return (
    <div className="materials-page">
      <header className="materials-header">
        <KableLogo />
        {user ? (
          <button type="button" onClick={logout} className="header-auth-link">Sign out</button>
        ) : (
          <Link to="/login" className="header-auth-link">Log in</Link>
        )}
      </header>

      <main className="materials-main">
        <Link to={`/section/${id}`} className="materials-back">
          ← Back to Week {id}
        </Link>
        <h1 className="materials-title">Course materials</h1>
        <p className="materials-subtitle">{title}</p>

        {files.length === 0 ? (
          <p className="materials-empty">No course materials for this week.</p>
        ) : (
          <div className="materials-content">
            {files.map((item, i) => (
              <MaterialBlock key={i} item={item} sectionId={id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
