import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const API_URL = 'http://localhost:5000/api/students';

const StudentDashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setStudents(data);
        setLoading(false);
      } catch (err) {
        // If the GET route was protected and failed (which it isn't currently, but good practice)
        setError('Failed to load student data. Check server connection.');
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    logout();

    navigate('/login'); 
  };


  if (loading) return <div className="loading-message">Loading Student Data...</div>;
  if (error) return <div className="message-error">{error}</div>;

  return (
    // Use App class structure (no container needed as App.css handles global padding)
    <>
      <div className="dashboard-header"> 
        <h1 style={{ color: 'var(--color-college-green)' }}>NITK Student Profile Management</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          {/* Apply btn-danger class for the Logout button */}
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Total Students: {students.length}</h2>
        
        {/* Apply btn-primary class for primary action link */}
        <a href="/add-student" className="btn btn-primary add-button">
          + Add New Student
        </a>

        <div className="student-list">
          {students.length === 0 ? (
            <p className="no-data">No student profiles found.</p>
          ) : (
            students.map((student) => (
              // Use the defined student-card class
              <div key={student._id} className="student-card">
                <h3>{student.name}</h3>
                <p>ID: {student.studentId}</p>
                <p>Email: {student.email}</p>
                <p>Major: {student.major || 'N/A'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDashboardPage;