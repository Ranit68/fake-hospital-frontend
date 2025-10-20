import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add this import
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const BookAppointment = ({ doctorId, patientId }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Add this hook

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://fake-hospital-backend-1.onrender.com/api/appointment', {
              doctorId: doctorId,
              patientId: patientId,
              date: date,
              time: time
            })

        .then(() => {
            alert('Appointment booked successfully!');
            window.open(`https://fake-hospital-backend-1.onrender.com/api/appointment/pdf/${res.data.id}`, '_blank');
            handleCloseModal();
            navigate('/appointments');  // Navigate to appointments list after booking
        })
        .catch(error => {
            console.error('Booking Error:', error);
            setError('Failed to book appointment. Try again.');
        });
    };

    return (
        <div>
            <h2>Book Appointment</h2>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
                <TextField label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} InputLabelProps={{ shrink: true }} required />
                <Button type="submit" variant="contained">Book</Button>
            </form>
        </div>
    );
};

export default BookAppointment;
