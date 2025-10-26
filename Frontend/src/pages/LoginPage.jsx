import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            // Navigate to the protected page after successful login
            navigate('/'); // Navigate to the root protected route (Dashboard)
        } catch (err) {
            
            setError(err); 
        }
    };

    return (
        <div className="form-container">
            {/* College Branding and Title */}
            <h1 style={{ color: 'var(--color-college-green)', textAlign: 'center', marginBottom: '10px' }}>
                NITK Surathkal
            </h1>
            <h2>Admin Portal Login</h2>
            
            <form onSubmit={handleSubmit} className="input-group">
                {/* ---------------------------------------------------- */}
                {/* Corrected Input Fields */}
                {/* ---------------------------------------------------- */}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                {/* ---------------------------------------------------- */}
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            
            {/* Error Message Display */}
            {error && <p className="message-error">{error}</p>}
        </div>
    );
};


export default LoginPage;