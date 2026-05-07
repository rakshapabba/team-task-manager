import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      padding: '20px',
      background: '#ddd'
    }}>

      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/team">Team</Link>

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

    </div>
  );
}