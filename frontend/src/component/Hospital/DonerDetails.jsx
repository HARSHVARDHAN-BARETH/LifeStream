import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import homebutton from './images/home-button.png';

const DonorDetails = () => {
    const { id } = useParams(); // Extract id from the route parameters
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/DonorDetails/${id}`);
                setDonor(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch donor details');
                setLoading(false);
            }
        };

        fetchDonorDetails();
    }, [id]);

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!donor) return <p className="text-center">No details available</p>;

    const background = {
        background: "#b3dcfc",
    };

    const buttonBackground = {
        background: "#2b68a6",
    };

    return (
        <div style={background} className="p-8 bg-gray-100 min-h-screen">
            <div className='flex justify-end px-6 ml-12 mb-4'>
                <h1 className='text-2xl p-2'>
                    <Link to="/HospitalDonorViews"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
                </h1>
            </div>

            <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-5xl mb-6 font-semibold text-center text-white">Donor Details</h2>

            <div className="overflow-x-auto shadow-md rounded-lg bg-white p-6">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr className="text-white" style={buttonBackground}>
                            <th className="px-4 py-2 border">Field</th>
                            <th className="px-4 py-2 border">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(donor).map(([key, value], index) => (
                            <tr key={key} className={`hover:bg-blue-200 transition-all duration-200 ease-in-out ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                <td className="px-4 py-2 border font-semibold capitalize">{key.replace(/_/g, ' ')}</td>
                                <td className="px-4 py-2 border">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonorDetails;
