import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Box, 
    Avatar, 
    Card, 
    CardContent, 
    Grid 
} from "@mui/material";

const DoctorDashboard = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get(`https://fake-hospital-backend-1.onrender.com/api/doctors/${id}`)
            .then(res => setDoctor(res.data))
            .catch(err => console.error("Fetch doctor error:", err));

        axios.get(`https://fake-hospital-backend-1.onrender.com/api/doctors/${id}/appointments`)
            .then(res => setAppointments(res.data))
            .catch(err => console.error("Fetch appointments error:", err));
    }, [id]);

    const handleChange = (e) => setDoctor({ ...doctor, [e.target.name]: e.target.value });

    const handleSave = () => {
        axios.post(`https://fake-hospital-backend-1.onrender.com/api/doctors/profile`, doctor)
            .then(res => {
                setDoctor(res.data);
                setEditMode(false);
                alert("Profile updated successfully!");
            })
            .catch(err => {
                console.error("Update failed:", err);
                alert("Failed to update profile");
            });
    };

    if (!doctor) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#1976d2" }}>
                Doctor Dashboard
            </Typography>

            {/* Doctor Profile */}
            <Card sx={{ mb: 5, p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                            <Avatar 
                                src={doctor.imgeUrl} 
                                alt={doctor.name} 
                                sx={{ width: 150, height: 150, mx: "auto", mb: 2 }} 
                            />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={2}>
                                {[
                                    { label: "Name", name: "name", value: doctor.name },
                                    { label: "Email", name: "email", value: doctor.email },
                                    { label: "Specialty", name: "specialty", value: doctor.specialty },
                                    { label: "Experience", name: "experience", value: doctor.experience },
                                    { label: "Consultation Fee", name: "consultationFee", value: doctor.consultationFee },
                                    { label: "Education", name: "education", value: doctor.education },
                                    { label: "Languages", name: "languages", value: doctor.languages },
                                    { label: "Image URL", name: "imgeUrl", value: doctor.imgeUrl },
                                ].map((field, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <TextField
                                            label={field.label}
                                            name={field.name}
                                            value={field.value}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                variant="contained"
                                color={editMode ? "secondary" : "primary"}
                                onClick={editMode ? handleSave : () => setEditMode(true)}
                                sx={{ mt: 2, px: 4, py: 1.5, fontWeight: "bold", '&:hover': { transform: 'scale(1.03)', transition: '0.3s' } }}
                            >
                                {editMode ? "Save Profile" : "Edit Profile"}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Appointments */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                My Appointments
            </Typography>

            {appointments.length === 0 ? (
                <Typography>No appointments yet.</Typography>
            ) : (
                <Paper sx={{ overflowX: "auto", p: 2, boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#1976d2" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#fff" }}>Patient Name</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Time</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Queue Number</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((a) => (
                                <TableRow key={a.id} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                    <TableCell>{a.patient?.name}</TableCell>
                                    <TableCell>{a.patient?.phone}</TableCell>
                                    <TableCell>{a.patient?.email}</TableCell>
                                    <TableCell>{a.date}</TableCell>
                                    <TableCell>{a.time}</TableCell>
                                    <TableCell>{a.queueNumber}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => window.open(`https://fake-hospital-backend-1.onrender.com/api/appointment/pdf/${a.id}`, "_blank")}
                                        >
                                            Download PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
};

export default DoctorDashboard;
