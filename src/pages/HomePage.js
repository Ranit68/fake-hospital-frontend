import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const scrollToDepartments = () => {
    const deptSection = document.getElementById('departments');
    if (deptSection) {
      deptSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const departments = [
    { name: 'ENT', image: 'https://images.unsplash.com/photo-1588776814546-5b237d5b1a5b', id: 1 },
    { name: 'Cardiology', image: 'https://images.unsplash.com/photo-1588776814546-5b237d5b1a5b', id: 2 },
    { name: 'Neurology', image: 'https://images.unsplash.com/photo-1588776814546-5b237d5b1a5b', id: 3 },
    { name: 'Orthopedics', image: 'https://images.unsplash.com/photo-1588776814546-5b237d5b1a5b', id: 4 },
    { name: 'Pediatrics', image: 'https://images.unsplash.com/photo-1588776814546-5b237d5b1a5b', id: 5 },
    { name: 'Dermatology', image: 'https://images.unsplash.com/photo-1588776814546-5b237d5b1a5b', id: 6 },
  ];

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, bgcolor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1000 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Fake Hospital</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 2, color: '#fff', borderColor: '#fff' }} onClick={() => navigate('/doctors/login')}>
            Doctor Login
          </Button>
          <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }} onClick={scrollToDepartments}>
            Departments
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Grid container sx={{ p: 5, bgcolor: '#e3f2fd', alignItems: 'center' }} spacing={4}>
        <Grid item xs={12} md={6} data-aos="fade-right">

        </Grid>
        <Grid item xs={12} md={6} sx={{ pl: { md: 5 } }} data-aos="fade-left">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>Welcome to Fake Hospital</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We provide world-class medical services with experienced doctors and modern technology. Your health is our top priority.
          </Typography>
          <Button variant="contained" color="primary" onClick={scrollToDepartments}>Explore Departments</Button>
        </Grid>
      </Grid>

      {/* Video Consultation Section */}
      <Grid container sx={{ p: 5, alignItems: 'center', bgcolor: '#f5f5f5' }} spacing={4}>
        <Grid item xs={12} md={6} data-aos="fade-right">
          <img
            src="https://media.istockphoto.com/id/1490665488/photo/portrait-of-a-female-doctor-talking-to-the-camera-in-online-care.jpg?s=612x612&w=0&k=20&c=E_sWQp_r73IiWM3EGl0WJnqZARQpI-_18MvIfOzpGrA="
            alt="video call"
            style={{ width: '100%', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} data-aos="fade-left">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Video Consultation</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Connect with our doctors from the comfort of your home. Schedule appointments and attend video consultations easily.
          </Typography>
        </Grid>
      </Grid>

      {/* Why Choose Us */}
      <Box sx={{ p: 5, bgcolor: '#e3f2fd', textAlign: 'center' }} data-aos="fade-up">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Why Choose Us</Typography>
        <Grid container spacing={3} justifyContent="center">
          {['Expert Doctors', '24/7 Service', 'Advanced Equipment'].map((text, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} data-aos="zoom-in" data-aos-delay={index * 200}>
              <Card sx={{ p: 3, '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{text}</Typography>
                  <Typography variant="body2">High-quality services to ensure your health and comfort.</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Departments */}
      <Box sx={{ p: 5, textAlign: 'center' }} id="departments">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }} data-aos="fade-up">Departments</Typography>
        <Grid container spacing={3} justifyContent="center">
          {departments.map((dept, index) => (
            <Grid item xs={12} sm={6} md={4} key={dept.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <Card sx={{ p: 2, '&:hover': { transform: 'scale(1.05)', transition: '0.3s', cursor: 'pointer' } }}>
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} 
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{dept.name}</Typography>
                  <Button 
                    variant="contained" 
                    sx={{ mt: 1 }} 
                    onClick={() => navigate('/doctors', { state: { departmentId: dept.id } })}
                  >
                    See Doctors
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, bgcolor: '#1976d2', color: '#fff', textAlign: 'center' }}>
        <Typography>© 2025 Fake Hospital. All rights reserved.</Typography>
        <Typography>Contact: info@fakehospital.com | Phone: +91 1234567890</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
