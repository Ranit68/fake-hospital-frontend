import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get('https://fake-hospital-backend-1.onrender.com/api/appointment')
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Appointments</h2>

      {appointments.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No appointments found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Doctor</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Patient</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr
                key={app.id}
                style={{
                  borderBottom: '1px solid #ddd',
                }}
              >
                <td style={{ padding: '10px' }}>
                  {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '10px' }}>
                  {app.time || 'N/A'}
                </td>
                <td style={{ padding: '10px' }}>
                  {app.doctor?.name || 'Not Assigned'}
                </td>
                <td style={{ padding: '10px' }}>
                  {app.patient?.name || 'Not Available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
