import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';

const API = axios.create({
  baseURL: 'https://team-task-manager-production-3d5e.up.railway.app/api'
});

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  // GET PROJECTS
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await API.get('/projects', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProjects(res.data || []);
    } catch (err) {
      console.log("Fetch error:", err.response?.data || err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // CREATE PROJECT
  const createProject = async () => {
    if (!form.name) {
      return alert('Enter project name');
    }

    try {
      const token = localStorage.getItem('token');

      await API.post('/projects', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setForm({
        name: '',
        description: ''
      });

      fetchProjects();

    } catch (err) {
      console.log("Create error:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #ff9966, #ff5e62)',
      color: 'white'
    }}>
      <Navbar />

      <div style={{ padding: '30px' }}>

        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>
          Projects 🚀
        </h1>

        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '30px' }}>
          Create and manage your team projects
        </p>

        {/* CREATE FORM */}
        <div style={{
          background: 'white',
          color: 'black',
          padding: '25px',
          borderRadius: '20px',
          marginBottom: '40px'
        }}>
          <h2>Create New Project</h2>

          <input
            type="text"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              borderRadius: '10px',
              border: '1px solid #ccc'
            }}
          />

          <br /><br />

          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              resize: 'none'
            }}
          />

          <br /><br />

          <button
            onClick={createProject}
            style={{
              padding: '12px 25px',
              background: '#ff5e62',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Create Project
          </button>
        </div>

        {/* PROJECT LIST */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {loading ? (
            <h3>Loading projects...</h3>
          ) : projects.length === 0 ? (
            <h3>No Projects Available</h3>
          ) : (
            projects.map(project => (
              <div
                key={project._id}
                style={{
                  background: 'white',
                  color: 'black',
                  padding: '25px',
                  borderRadius: '20px'
                }}
              >
                <h2 style={{ color: '#ff5e62' }}>
                  {project.name}
                </h2>

                <p style={{ marginTop: '15px' }}>
                  {project.description}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}