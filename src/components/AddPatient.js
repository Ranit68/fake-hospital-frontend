import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://fake-hospital-backend.onrender-1.com/api/patients', { name, email, phone })
            .then(() => alert('Patient added'))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button type="submit">Add Patient</button>
        </form>
    );
};

export default AddPatient;
