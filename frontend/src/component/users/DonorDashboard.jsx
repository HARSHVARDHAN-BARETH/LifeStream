import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import homebutton from './images/home-button.png';

const DonorDetails = () => {
    const [donorDetails, setDonorDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const donorid = localStorage.getItem('donorid'); // Assume donorid is stored in localStorage after login
        const fetchDonorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/donor-history/${donorid}`);
                setDonorDetails(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to fetch donor details');
            }
        };

        fetchDonorDetails();
    }, []);

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!donorDetails) {
        return <p>Loading donor details...</p>;
    }

    const background = {
        background: "#b3dcfc",
    };
    
    const tableStyles = {
        background: "#ffffff",
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        marginBottom: "20px"
    };

    const thTdStyles = {
        padding: "12px 15px",
        border: "1px solid #dddddd",
    };

    const hoverStyles = {
        '&:hover': {
            backgroundColor: '#f1f1f1',
        }
    };

    return (
        <div className='flex flex-col p-4'>
            <div style={background} className='flex justify-between py-4 px-3 mb-4'>
                <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl font-bold text-white mb-6">Donor</h1>
                <h1 className='text-2xl p-2'>
                    <Link to="/DonorLogin"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
                </h1>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Donor Details</h2>

            <table style={tableStyles}>
                <tbody>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Full Name:</strong></td>
                        <td style={thTdStyles}>{donorDetails.full_name}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Aadhar Number:</strong></td>
                        <td style={thTdStyles}>{donorDetails.aadhar_no}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Date of Birth:</strong></td>
                        <td style={thTdStyles}>{new Date(donorDetails.dob).toLocaleDateString()}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Gender:</strong></td>
                        <td style={thTdStyles}>{donorDetails.gender}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Address:</strong></td>
                        <td style={thTdStyles}>{donorDetails.address}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Blood Type:</strong></td>
                        <td style={thTdStyles}>{donorDetails.blood_type}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Last Donation Date:</strong></td>
                        <td style={thTdStyles}>{new Date(donorDetails.last_donation).toLocaleDateString()}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Donation Type History:</strong></td>
                        <td style={thTdStyles}>{donorDetails.donation_type_history}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Available for Stem Cell Donation:</strong></td>
                        <td style={thTdStyles}>{donorDetails.available_for_stem_cell ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>CMV Status:</strong></td>
                        <td style={thTdStyles}>{donorDetails.CMV_status}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>HLA Typing:</strong></td>
                        <td style={thTdStyles}>{donorDetails.HLA_typing}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Contact Number:</strong></td>
                        <td style={thTdStyles}>{donorDetails.contact_number}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Email:</strong></td>
                        <td style={thTdStyles}>{donorDetails.email}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Registered By Hospital ID:</strong></td>
                        <td style={thTdStyles}>{donorDetails.registered_by}</td>
                    </tr>
                    <tr style={hoverStyles}>
                        <td style={thTdStyles}><strong>Registered By Laboratory ID:</strong></td>
                        <td style={thTdStyles}>{donorDetails.registered_by_lab}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DonorDetails;
