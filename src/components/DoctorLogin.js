import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const DoctorLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.get("https://fake-hospital-backend-1.onrender.com/api/doctors/login", {
                params: { email: email.trim(), password: password.trim() }
            });
            const doctor = res.data;
            if (doctor?.id) {
                alert("Login successful");
                navigate(`/doctors/dashboard/${doctor.id}`);
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "linear-gradient(to right, #1976d2, #42a5f5)",
                p: 2
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    p: 5,
                    maxWidth: 400,
                    width: "100%",
                    borderRadius: 3,
                    textAlign: "center",
                    background: "#fff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                    Doctor Login
                </Typography>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiInputLabel-root': { color: '#1976d2' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#1976d2' },
                            '&:hover fieldset': { borderColor: '#42a5f5' },
                            '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                        }
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiInputLabel-root': { color: '#1976d2' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#1976d2' },
                            '&:hover fieldset': { borderColor: '#42a5f5' },
                            '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontWeight: "bold",
                        width: "100%",
                        '&:hover': {
                            backgroundColor: '#42a5f5',
                            transform: 'scale(1.03)',
                            transition: '0.3s'
                        }
                    }}
                >
                    Login
                </Button>
                <Typography variant="body2" sx={{ mt: 2, color: "#888" }}>
                    Enter your credentials to access your dashboard.
                </Typography>
            </Paper>
        </Box>
    );
};

export default DoctorLogin;
