import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="main-header">
            <div className="logo-section">
                <Link to="/" className="app-logo">Admin Dashboard</Link>
            </div>
            <nav className="nav-links">
                <Link to="/" className="nav-item">Dashboard</Link>
                <Link to="/add-student" className="nav-item">Add Student</Link>
            </nav>
            <div className="user-control">
                {/* Use an <h1> or <h2> for the main greeting */}
                <h3 style={{ color: 'var(--color-college-green)' }}>
                    Welcome to NITK's Admin Portal
                </h3>
                <span>Logged in as: {user.name}</span> {/* Displaying the user's name */}
                <button onClick={handleLogout} className="btn btn-danger btn-small">Logout</button>
            </div>
            // ...
        </header>
    );
};
export default Header;