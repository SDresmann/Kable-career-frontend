import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LifeSkillsPage from './pages/LifeSkills';
import SectionPage from './pages/SectionPage';
import AssignmentPage from './pages/AssignmentPage';
import QuizPage from './pages/QuizPage';
import MaterialsPage from './pages/MaterialsPage';
import MaterialViewPage from './pages/MaterialViewPage';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
  );
}

export default App;
