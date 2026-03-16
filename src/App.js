import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LifeSkillsPage from './pages/LifeSkills';
import SectionPage from './pages/SectionPage';
import AssignmentPage from './pages/AssignmentPage';
import QuizPage from './pages/QuizPage';

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
    </Routes>
  );
}

export default App;
