import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Member'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/signup', form);

      alert('Signup Successful');

      // 🔥 go to login page
      navigate('/');

    } catch (err) {
      console.log(err);
      alert('Signup Failed');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2, #ff6a00)',
      fontFamily: 'Arial'
    }}>

      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '15px',
        width: '350px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>

        <h2 style={{ textAlign: 'center' }}>✨ Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Name"
            style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Member</option>
            <option>Admin</option>
          </select>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Sign Up 🚀
          </button>

        </form>

        {/* 🔥 Go to Login */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#fff',
            cursor: 'pointer'
          }}
        >
          Already have an account? Login
        </button>

      </div>
    </div>
  );
}