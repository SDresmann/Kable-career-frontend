import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WORKSHOP_TITLES, SECTION_ASSIGNMENT_FILES } from './sectionData';
import { MaterialBlock } from '../components/MaterialViewers';
import '../components/MaterialViewers.css';
import './MaterialViewPage.css';

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

export default function MaterialViewPage() {
  const { sectionId, materialIndex } = useParams();
  const { user, logout } = useAuth();
  const id = sectionId ? parseInt(sectionId, 10) : 1;
  const index = materialIndex ? parseInt(materialIndex, 10) : 0;
  const sectionTitle = WORKSHOP_TITLES[id - 1] || WORKSHOP_TITLES[0];
  const files = SECTION_ASSIGNMENT_FILES[id] || [];
  const item = files[index];

  return (
    <div className="material-view-page">
      <header className="material-view-header">
        <KableLogo />
        {user ? (
          <button type="button" onClick={logout} className="header-auth-link">Sign out</button>
        ) : (
          <Link to="/login" className="header-auth-link">Log in</Link>
        )}
      </header>

      <main className="material-view-main">
        <p className="material-view-breadcrumb">
          <Link to="/">Home</Link>
          {' → '}
          <Link to={`/section/${sectionId}`}>Section {sectionId} – {sectionTitle}</Link>
          {' → '}
          <span className="current">{item?.label ?? 'Material'}</span>
        </p>

        {item ? (
          <MaterialBlock item={item} sectionId={id} />
        ) : (
          <p className="material-view-error">Material not found.</p>
        )}

        <div className="material-view-actions">
          <Link to={`/section/${sectionId}`} className="btn-outline">Back to Section {sectionId}</Link>
        </div>
      </main>
    </div>
  );
}
