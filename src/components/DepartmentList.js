import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add this import
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const DepartmentList = ({ onSelectDepartment }) => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Add this hook

    useEffect(() => {
        axios.get('https://fake-hospital-backend.onrender.com/api/departments')
            .then(response => {
                console.log('API Response:', response.data);
                if (Array.isArray(response.data)) {
                    setDepartments(response.data);
                } else {
                    console.error('API did not return an array:', response.data);
                    setError('Invalid data from server');
                }
            })
            .catch(error => {
                console.error('API Error:', error);
                setError('Failed to load departments. Check backend.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSelect = (deptId) => {
        onSelectDepartment(deptId);  // Set the state
        navigate('/doctors');        // Navigate to doctors page
    };

    if (loading) return <Typography>Loading departments...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <h2>Select Department</h2>
            <Button variant="outlined" onClick={() => navigate('/appointments')} style={{ marginBottom: 10 }}>View Appointments</Button>
            {departments && Array.isArray(departments) && departments.length > 0 ? (
                <List>
                    {departments.map(dept => (
                        <ListItem key={dept.id}>
                            <ListItemText primary={dept.name} />
                            <Button variant="contained" onClick={() => handleSelect(dept.id)}>Select</Button>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No departments available.</Typography>
            )}
        </div>
    );
};

export default DepartmentList;
