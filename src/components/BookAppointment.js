import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const BookAppointment = ({ doctorId, patientId, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://fake-hospital-backend-1.onrender.com/api/appointment', {
        doctorId: doctorId,
        patientId: patientId,
        date: date,
        time: time
      });

      alert('Appointment booked successfully!');
      // open PDF in new tab
      window.open(`https://fake-hospital-backend-1.onrender.com/api/appointment/pdf/${response.data.id}`, '_blank');

      if (onClose) onClose();
      navigate('/appointments');
    } catch (err) {
      console.error('Booking Error:', err);
      setError('Failed to book appointment. Try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
        Book Appointment
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirm Booking
        </Button>
      </form>
    </Box>
  );
};

export default BookAppointment;
