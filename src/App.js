import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const LifeSkillsPage = lazy(() => import('./pages/LifeSkills'));
const SectionPage = lazy(() => import('./pages/SectionPage'));
const AssignmentPage = lazy(() => import('./pages/AssignmentPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const MaterialsPage = lazy(() => import('./pages/MaterialsPage'));
const MaterialViewPage = lazy(() => import('./pages/MaterialViewPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));

function RouteLoading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading-inner">Loading…</span>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/account/password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LifeSkillsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section/:sectionId"
        element={
          <ProtectedRoute>
            <SectionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section/:sectionId/assignment/:assignmentIndex"
        element={
          <ProtectedRoute>
            <AssignmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section/:sectionId/quiz"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section/:sectionId/materials"
        element={
          <ProtectedRoute>
            <MaterialsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section/:sectionId/material/:materialIndex"
        element={
          <ProtectedRoute>
            <MaterialViewPage />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Suspense>
  );
}

export default App;
