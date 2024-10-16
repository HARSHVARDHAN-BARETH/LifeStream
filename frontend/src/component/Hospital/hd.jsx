import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import homebutton from './images/home-button.png'; 


const HospitalDonorViews = ({ setId }) => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const hospitalId = localStorage.getItem('hospitalId'); // Assume hospitalId is stored in localStorage after login

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/donors/${hospitalId}`);
                setDonors(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch donors');
                setLoading(false);
            }
        };

        fetchDonors();
    }, [hospitalId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className='text-red-500'>{error}</p>;

    const background = { 
        background: "#b3dcfc", 
    };
    const borderRadius = {
        borderRadius: 3 + "vw"
    };
    const buttonBackground = {
        background: "#2b68a6",
    };
    

    return (
        <div style={background} className=''>
             <div className='flex justify-end px-6 ml-12 mb-4'>
        <h1 className='text-2xl  p-2'>
        <Link to="/Hospital"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
        </h1>
      </div>
            {donors.length > 0 && <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className='text-3xl ml-5 text-white font-bold mb-6'>Hospital : Name of Hospital {donors[0].hospital_name}</h1>}
            <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className='text-2xl ml-5 text-white font-bold mb-4'>Donors Registered by Your Hospital</h2>
           <div className='bg-white p-6 w-full'>

            {donors.length > 0 ? (
                <ul className='mt-4'>
                    {donors.map(donor => (
                        <li key={donor.id} style={borderRadius} className='border-2 px-12 w-96  border-black rounded p-4 mb-4'>
                            <p><strong>Full Name:</strong> {donor.full_name}</p>
                       
                            <p><strong>Gender:</strong> {donor.gender}</p>
                            <p><strong>Address:</strong> {donor.address}</p>
                            <p><strong>Blood Type:</strong> {donor.blood_type}</p>
                                               <button 
                                onClick={() => {
                                    setId(donor.id);  // Set the donor ID when clicking the button
                                    navigate(`/DonorDetails/${donor.id}`);
                                }} 
                                className='bg-blue-500 text-white rounded p-2 mt-2'
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No donors found.</p>
            )}
           </div>

        </div>
    );
};

export default HospitalDonorViews;
