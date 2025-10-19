import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DepartmentList from './components/DepartmentList';
import DoctorList from './components/DoctorLlist';
import BookAppointment from './components/BookAppointment';
import AppointmentList from './components/AppointmentList';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorLogin from './components/DoctorLogin';
import { Button, Container } from '@mui/material';

function App() {
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [patientId, setPatientId] = useState(1);

    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/departments" element={<DepartmentList onSelectDepartment={setSelectedDept} />} />
                    <Route path="/doctors" element={<DoctorList departmentId={selectedDept} onSelectDoctor={setSelectedDoctor} />} />
                    <Route path="/book" element={<BookAppointment doctorId={selectedDoctor} patientId={patientId} />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/doctors/login" element={<DoctorLogin />} />
                    <Route path="/doctors/dashboard/:id" element={<DoctorDashboard />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
