import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';

const API = axios.create({
  baseURL: 'https://team-task-manager-production-3d5e.up.railway.app/api'
});

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await API.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data || []);
    } catch (err) {
      console.log("Error fetching tasks:", err.response?.data || err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = tasks.filter(
    task => task.status === 'Completed'
  );

  const pendingTasks = tasks.filter(
    task => task.status === 'Pending'
  );

  const overdueTasks = tasks.filter(task =>
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'Completed'
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      color: 'white'
    }}>
      <Navbar />

      <div style={{ padding: '30px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>
          Dashboard 🚀
        </h1>

        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Manage your projects and tasks easily
        </p>

        {/* STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{ background: '#ff6b6b', padding: '25px', borderRadius: '20px' }}>
            <h2>Total Tasks</h2>
            <h1>{tasks.length}</h1>
          </div>

          <div style={{ background: '#1dd1a1', padding: '25px', borderRadius: '20px' }}>
            <h2>Completed</h2>
            <h1>{completedTasks.length}</h1>
          </div>

          <div style={{ background: '#feca57', padding: '25px', borderRadius: '20px' }}>
            <h2>Pending</h2>
            <h1>{pendingTasks.length}</h1>
          </div>

          <div style={{ background: '#ee5253', padding: '25px', borderRadius: '20px' }}>
            <h2>Overdue</h2>
            <h1>{overdueTasks.length}</h1>
          </div>
        </div>

        {/* TASK LIST */}
        <div style={{
          marginTop: '40px',
          background: 'white',
          color: 'black',
          padding: '25px',
          borderRadius: '20px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>
            Recent Tasks 📋
          </h2>

          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map(task => (
              <div
                key={task._id}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  background: '#f4f4f4'
                }}
              >
                <h3>{task.title}</h3>

                <p>Status: {task.status}</p>

                <p>
                  Due:{' '}
                  {task.dueDate
                    ? new Date(task.dueDate).toDateString()
                    : 'No Date'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}