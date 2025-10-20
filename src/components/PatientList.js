import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('https://fake-hospital-backend-1.onrender.com/api/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Patients</h2>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>{patient.name} - {patient.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
