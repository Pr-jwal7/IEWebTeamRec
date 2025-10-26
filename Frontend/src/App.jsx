import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AddStudentPage from './pages/AddStudentPage';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboardPage from './pages/StudentDashboardPage';
import Header from './components/Header'; 


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* ------------------------------------------------------------------- */}
            {/* MODIFICATION HERE: Use the ProtectedRoute structure */}
            {/* ------------------------------------------------------------------- */}
            <Route element={<ProtectedRoute />}>
              {/* The element here is rendered IF the user is authenticated */}
              <Route path="/" element={
                <>
                  <Header /> 
                  <StudentDashboardPage />
                </>
              } /> 
              
              <Route path="/add-student" element={
                <>
                  <Header /> 
                  <AddStudentPage />
                </>
              } />

            </Route>

            {/* If user is not logged in and tries to go to /, ProtectedRoute redirects to /login */}
            <Route path="*" element={<LoginPage />} /> 

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;