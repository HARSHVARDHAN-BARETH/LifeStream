import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewHospitalDonor = ({ donorId }) => {
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!donorId) {
            setError('Donor ID is missing');
            setLoading(false);
            return;
        }

        const fetchDonorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/hospital-donor-register/1`);
                setDonor(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch donor details');
                setLoading(false);
            }
        };

        fetchDonorDetails();
    }, [donorId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="donor-details-container">
            
            {donor ? (
                <div>
                    <h2>Donor Details</h2>
                    <p><strong>Full Name:</strong> {donor.full_name}</p>
                    <p><strong>Aadhar Number:</strong> {donor.aadhar_no}</p>
                    <p><strong>Date of Birth:</strong> {donor.dob}</p>
                    <p><strong>Gender:</strong> {donor.gender}</p>
                    <p><strong>Address:</strong> {donor.address}</p>
                    <p><strong>Blood Type:</strong> {donor.blood_type}</p>
                    <p><strong>Last Donation:</strong> {donor.last_donation}</p>
                    <p><strong>Donation Type History:</strong> {donor.donation_type_history}</p>
                    <p><strong>Available for Stem Cell Donation:</strong> {donor.available_for_stem_cell ? 'Yes' : 'No'}</p>
                    <p><strong>CMV Status:</strong> {donor.CMV_status}</p>
                    <p><strong>HLA Typing:</strong> {donor.HLA_typing}</p>
                    <p><strong>Contact Number:</strong> {donor.contact_number}</p>
                    <p><strong>Email:</strong> {donor.email}</p>
                    <p><strong>Registered by Hospital:</strong> {donor.hospital_name}</p>
                </div>
            ) : (
                <p>Donor not found</p>
            )}
        </div>
    );
};

export default ViewHospitalDonor;
