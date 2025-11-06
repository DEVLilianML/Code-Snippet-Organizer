import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'http://localhost:5000/api/users/login'
      : 'http://localhost:5000/api/users/register';

    try {
      const { data } = await axios.post(endpoint, form);

      if (isLogin) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        alert('Registration successful, please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className='snippet-overall'>
      <h1>Code Snippet Organiser</h1>
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have one?"}
        <Link
          className="toggle-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? ' Register' : ' Login'}
        </Link>
      </p>
    </div>
    </div>
  );
}

export default Auth;
