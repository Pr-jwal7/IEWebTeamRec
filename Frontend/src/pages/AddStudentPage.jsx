import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/students';

const AddStudentPage = () => {
  const { user } = useAuth(); // Get user (which contains the token)
  const [formData, setFormData] = useState({ name: '', studentId: '', email: '', major: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, 
        },
      };

      const { data } = await axios.post(API_URL, formData, config);
      setMessage(`Successfully added student: ${data.name}`);
      setFormData({ name: '', studentId: '', email: '', major: '' }); 

    } catch (err) {
      
      setError(err.response && err.response.data.message
        ? err.response.data.message
        : 'Failed to add student. Check server log.');
    }
  };

    return (
    <div className="form-container"> {/* Reuse form-container class */}
        <h2>Add New Student</h2>
        {message && <p className="message-success">{message}</p>}
        {error && <p className="message-error">{error}</p>}

        <form onSubmit={handleSubmit} className="input-group"> {/* Reuse input-group class */}
        <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="studentId" type="text" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="major" type="text" placeholder="Major (Optional)" value={formData.major} onChange={handleChange} />
        
        {/* Use btn-danger class for a clear action button */}
        <button type="submit" className="btn btn-danger">Add Student</button>
        </form>
    </div>
    );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' },
  input: { padding: '10px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' },
};

export default AddStudentPage;