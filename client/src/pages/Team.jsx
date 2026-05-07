import { useEffect, useState } from 'react';

import axios from 'axios';

import Navbar from '../components/Navbar';

export default function Team() {

  const [members, setMembers] = useState([]);

  useEffect(() => {

    fetchMembers();

  }, []);

  const fetchMembers = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/auth/users'
      );

      setMembers(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to right, #fc5c7d, #6a82fb)',
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
          Team Members 👥
        </h1>

        <p
          style={{
            fontSize: '18px',
            opacity: 0.9,
            marginBottom: '30px'
          }}
        >
          Manage and view your project team
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >

          {
            members.map(member => (

              <div
                key={member._id}
                style={{
                  background: 'white',
                  color: 'black',
                  padding: '25px',
                  borderRadius: '20px',
                  boxShadow:
                    '0 5px 15px rgba(0,0,0,0.3)',
                  transition: '0.3s'
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '15px'
                  }}
                >

                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#6a82fb',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    {
                      member.name
                      ?.charAt(0)
                      ?.toUpperCase()
                    }
                  </div>

                  <div>

                    <h2
                      style={{
                        margin: 0
                      }}
                    >
                      {member.name}
                    </h2>

                    <p
                      style={{
                        color: 'gray',
                        margin: '5px 0'
                      }}
                    >
                      {member.email}
                    </p>

                  </div>

                </div>

                <div
                  style={{
                    marginTop: '10px'
                  }}
                >

                  <span
                    style={{
                      padding: '8px 15px',
                      borderRadius: '20px',
                      background:
                        member.role === 'Admin'
                        ?
                        '#ff6b6b'
                        :
                        '#1dd1a1',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {member.role}
                  </span>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}