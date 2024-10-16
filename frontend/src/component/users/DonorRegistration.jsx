import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorRegistration = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        aadhar_no: '',
        dob: '',
        gender: 'Male',
        address: '',
        blood_type: 'A+', // Default to a common blood type
        last_donation: '',
        donation_type_history: '',
        available_for_stem_cell: false,
        CMV_status: '',
        HLA_typing: '',
        contact_number: '',
        email: '',
        password: '',
        registered_by: 1 // Example hospital ID
    });

    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        // Fetch the list of hospitals
        axios.get('http://localhost:3000/hospitals')
            .then(response => {
                setHospitals(response.data.hospitals);
            })
            .catch(error => {
                console.error('Error fetching hospitals:', error);
            });
    }, []);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register-donor', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('Error registering donor:', error);
            alert('Failed to register donor');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required />
            <input type="text" name="aadhar_no" value={formData.aadhar_no} onChange={handleChange} placeholder="Aadhar Number" required />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />

            <select name="blood_type" value={formData.blood_type} onChange={handleChange}>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>
            <select name="registered_by" value={formData.registered_by} onChange={handleChange} required>
                <option value="">Select Hospital</option>
                {hospitals.map(hospital => (
                    <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                    </option>
                ))}
            </select>

            <input type="date" name="last_donation" value={formData.last_donation} onChange={handleChange} />
            <textarea name="donation_type_history" value={formData.donation_type_history} onChange={handleChange} placeholder="Donation Type History" />
            
            <label>
                Available for Stem Cell Donation:
                <input type="checkbox" name="available_for_stem_cell" checked={formData.available_for_stem_cell} onChange={handleChange} />
            </label>

            <input type="text" name="CMV_status" value={formData.CMV_status} onChange={handleChange} placeholder="CMV Status" />
            <textarea name="HLA_typing" value={formData.HLA_typing} onChange={handleChange} placeholder="HLA Typing" />
            <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="Contact Number" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            
            <button type="submit">Register Donor</button>
        </form>
    );
};

export default DonorRegistration;
