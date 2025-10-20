import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';

const DoctorList = ({ departmentId: propDeptId }) => {
  const location = useLocation();
  const departmentId = propDeptId || location.state?.departmentId;
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const navigate = useNavigate();

  // Fetch doctors
  useEffect(() => {
    if (!departmentId) return; 
    axios.get(`https://fake-hospital-backend-1.onrender.com/api/doctors/department/${departmentId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDoctors(res.data);
          setFilteredDoctors(res.data);
        } else {
          setError('Invalid data from server');
        }
      })
      .catch(() => setError('Failed to fetch doctors'))
      .finally(() => setLoading(false));
  }, [departmentId]);

  // Filter by specialty
  useEffect(() => {
    const filtered = doctors.filter(doc =>
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const handleOpenModal = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setAppointmentDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientRes = await axios.post('https://fake-hospital-backend-1.onrender.com/api/patients', {
        name: patientName,
        phone: patientPhone,
        email: patientEmail || null
      });
      const newPatient = patientRes.data;

      const appointmentRes = await axios.post('https://fake-hospital-backend-1.onrender.com/api/appointment', {
        date: appointmentDate,
        time: '10:00',
        patient: { id: newPatient.id },
        doctor: { id: selectedDoctorId }
      });
      alert('Appointment booked successfully!');
      window.open(`https://fake-hospital-backend-1.onrender.com/api/appointment/pdf/${appointmentRes.data.id}`, '_blank');
      handleCloseModal();
      navigate('/appointments');
    } catch (err) {
      console.error(err);
      alert('Failed to book appointment');
    }
  };

  if (loading) return <Typography>Loading doctors...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2' }}>
        Doctors in Department
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={() => navigate('/')}>Back to Home</Button>
        <Button variant="outlined" onClick={() => navigate('/appointments')}>View Appointments</Button>
      </Box>

      <TextField
        label="Search by Specialty"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {filteredDoctors.length > 0 ? filteredDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card sx={{
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
            }}>
              {doctor.imgeUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={doctor.imgeUrl}
                  alt={doctor.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{doctor.name}</Typography>
                <Typography variant="body2" color="text.secondary">Specialty: {doctor.specialty}</Typography>
                <Typography variant="body2" color="text.secondary">Experience: {doctor.experience}</Typography>
                <Typography variant="body2" color="text.secondary">Fee: ₹{doctor.consultationFee}</Typography>
                <Typography variant="body2" color="text.secondary">Education: {doctor.education}</Typography>
                <Typography variant="body2" color="text.secondary">Languages: {doctor.languages}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, fontWeight: 'bold' }}
                  onClick={() => handleOpenModal(doctor.id)}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )) : (
          <Typography>No doctors available for this specialty.</Typography>
        )}
      </Grid>

      {/* Appointment Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Enter Patient Details</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            <TextField
              label="Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required fullWidth margin="normal"
            />
            <TextField
              label="Phone"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              required fullWidth margin="normal"
            />
            <TextField
              label="Email (Optional)"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              fullWidth margin="normal"
            />
            <TextField
              label="Preferred Appointment Date"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required fullWidth margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Confirm Booking</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default DoctorList;
