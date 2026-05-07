import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/tasks'
      );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const completedTasks = tasks.filter(
    task => task.status === 'Completed'
  );

  const pendingTasks = tasks.filter(
    task => task.status === 'Pending'
  );

  const overdueTasks = tasks.filter(task => {

    return (
      new Date(task.dueDate) < new Date()
      &&
      task.status !== 'Completed'
    );

  });

  return (

    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to right, #667eea, #764ba2)',
        color: 'white'
      }}
    >

      <Navbar />

      <div style={{ padding: '30px' }}>

        <h1
          style={{
            fontSize: '42px',
            marginBottom: '10px'
          }}
        >
          Dashboard 🚀
        </h1>

        <p
          style={{
            fontSize: '18px',
            opacity: 0.9
          }}
        >
          Manage your projects and tasks easily
        </p>

        {/* CARDS */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}
        >

          {/* TOTAL TASKS */}

          <div
            style={{
              background: '#ff6b6b',
              padding: '25px',
              borderRadius: '20px',
              boxShadow:
                '0 5px 15px rgba(0,0,0,0.3)'
            }}
          >

            <h2>Total Tasks</h2>

            <h1>{tasks.length}</h1>

          </div>

          {/* COMPLETED */}

          <div
            style={{
              background: '#1dd1a1',
              padding: '25px',
              borderRadius: '20px',
              boxShadow:
                '0 5px 15px rgba(0,0,0,0.3)'
            }}
          >

            <h2>Completed</h2>

            <h1>{completedTasks.length}</h1>

          </div>

          {/* PENDING */}

          <div
            style={{
              background: '#feca57',
              padding: '25px',
              borderRadius: '20px',
              boxShadow:
                '0 5px 15px rgba(0,0,0,0.3)'
            }}
          >

            <h2>Pending</h2>

            <h1>{pendingTasks.length}</h1>

          </div>

          {/* OVERDUE */}

          <div
            style={{
              background: '#ee5253',
              padding: '25px',
              borderRadius: '20px',
              boxShadow:
                '0 5px 15px rgba(0,0,0,0.3)'
            }}
          >

            <h2>Overdue</h2>

            <h1>{overdueTasks.length}</h1>

          </div>

        </div>

        {/* RECENT TASKS */}

        <div
          style={{
            marginTop: '40px',
            background: 'white',
            color: 'black',
            padding: '25px',
            borderRadius: '20px',
            boxShadow:
              '0 5px 15px rgba(0,0,0,0.2)'
          }}
        >

          <h2
            style={{
              marginBottom: '20px'
            }}
          >
            Recent Tasks 📋
          </h2>

          {
            tasks.length === 0
            ?
            (
              <p>No tasks available</p>
            )
            :
            (
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

                  <p>
                    Status:
                    {' '}
                    {task.status}
                  </p>

                  <p>
                    Due:
                    {' '}
                    {
                      task.dueDate
                      ?
                      new Date(
                        task.dueDate
                      ).toDateString()
                      :
                      'No Date'
                    }
                  </p>

                </div>

              ))
            )
          }

        </div>

      </div>

    </div>
  );
}