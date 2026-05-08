import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://team-task-manager-production-3d5e.up.railway.app/api'
});

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post('/auth/login', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login Successful');

      navigate('/dashboard');

    } catch (err) {

      console.log(err);
      alert('Invalid Credentials');

    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #4facfe, #00f2fe)',
      fontFamily: 'Arial'
    }}>

      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        width: '350px',
        textAlign: 'center',
        boxShadow: '0px 10px 30px rgba(0,0,0,0.2)'
      }}>

        <h2>Team Task Manager</h2>
        <p>Manage Projects & Tasks Easily</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '10px'
            }}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '10px'
            }}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#4facfe',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>

        </form>

        <button
          onClick={() => navigate('/signup')}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '12px',
            background: '#00c853',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          Create New Account
        </button>

      </div>

    </div>
  );
}