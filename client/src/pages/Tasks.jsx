import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';

export default function Tasks() {

  const [tasks, setTasks] = useState([]);

  const user =
    JSON.parse(
      localStorage.getItem('user')
    );

  const [form, setForm] = useState({
    title: '',
    dueDate: ''
  });

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res = await axios.get(
  'https://team-task-manager-production-3d5e.up.railway.app/api/tasks'
);

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  // ADD TASK
  const addTask = async () => {

    if (!form.title) {
      return alert('Enter task title');
    }

    try {

      await axios.post(
  'https://team-task-manager-production-3d5e.up.railway.app/api/tasks',
  {
    title: form.title,
    dueDate: form.dueDate,
    status: 'Pending'
  }
);

      setForm({
        title: '',
        dueDate: ''
      });

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await axios.delete(
  `https://team-task-manager-production-3d5e.up.railway.app/api/tasks/${id}`
);

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
  `https://team-task-manager-production-3d5e.up.railway.app/api/tasks/${id}`,
  { status }
);

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to right, #36d1dc, #5b86e5)',
        color: 'white'
      }}
    >

      <Navbar />

      <div style={{ padding: '30px' }}>

        <h1
          style={{
            fontSize: '42px'
          }}
        >
          Task Manager 🚀
        </h1>

        <p
          style={{
            marginBottom: '20px'
          }}
        >
          Logged in as:
          {' '}
          <strong>
            {user?.role}
          </strong>
        </p>

        {/* ADMIN ONLY ADD TASK */}

        {
          user?.role === 'Admin'
          &&
          (
            <div
              style={{
                background: 'white',
                color: 'black',
                padding: '25px',
                borderRadius: '20px',
                marginTop: '20px',
                boxShadow:
                  '0 5px 15px rgba(0,0,0,0.3)'
              }}
            >

              <h2>Add New Task</h2>

              <input
                type="text"
                placeholder="Task Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
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

              <input
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dueDate: e.target.value
                  })
                }
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #ccc'
                }}
              />

              <br /><br />

              <button
                onClick={addTask}
                style={{
                  padding: '12px 25px',
                  background: '#5b86e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Add Task
              </button>

            </div>
          )
        }

        {/* TASK LIST */}

        <div style={{ marginTop: '30px' }}>

          {
            tasks.length === 0
            ?
            (
              <h2>No Tasks Available</h2>
            )
            :
            (
              tasks.map(task => {

                const overdue =

                  new Date(task.dueDate)
                  <
                  new Date()
                  &&
                  task.status !== 'Completed';

                return (

                  <div
                    key={task._id}
                    style={{
                      background: 'white',
                      color: 'black',
                      padding: '20px',
                      borderRadius: '20px',
                      marginBottom: '20px',
                      boxShadow:
                        '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                  >

                    <h2>{task.title}</h2>

                    <p>
                      <strong>Status:</strong>
                      {' '}
                      {task.status}
                    </p>

                    <p>
                      <strong>Due:</strong>
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

                    {
                      overdue
                      &&
                      (
                        <p
                          style={{
                            color: 'red',
                            fontWeight: 'bold'
                          }}
                        >
                          Overdue ⚠️
                        </p>
                      )
                    }

                    {/* ADMIN ONLY BUTTONS */}

                    {
                      user?.role === 'Admin'
                      &&
                      (
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '15px',
                            flexWrap: 'wrap'
                          }}
                        >

                          <button
                            onClick={() =>
                              updateStatus(
                                task._id,
                                'Pending'
                              )
                            }
                            style={{
                              padding: '10px',
                              background: '#feca57',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            Pending
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                task._id,
                                'In Progress'
                              )
                            }
                            style={{
                              padding: '10px',
                              background: '#54a0ff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            In Progress
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                task._id,
                                'Completed'
                              )
                            }
                            style={{
                              padding: '10px',
                              background: '#1dd1a1',
                              color: 'white',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            Completed
                          </button>

                          <button
                            onClick={() =>
                              deleteTask(task._id)
                            }
                            style={{
                              padding: '10px',
                              background: '#ee5253',
                              color: 'white',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>

                        </div>
                      )
                    }

                  </div>

                );

              })
            )
          }

        </div>

      </div>

    </div>

  );
}