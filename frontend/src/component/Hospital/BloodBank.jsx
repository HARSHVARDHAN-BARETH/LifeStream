import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import homebutton from './images/home-button.png'; 


const BloodBankAvailability = () => {
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBloodBanks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/blood-banks');
                setBloodBanks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch blood banks');
                setLoading(false);
            }
        };

        fetchBloodBanks();
    }, []);

    if (loading) return <div className='text-center text-xl'>Loading...</div>;
    if (error) return <div className='text-center text-xl text-red-600'>{error}</div>;
    const background = { 
        background: "#b3dcfc", 
    };
    const borderRadius = {
        borderRadius: 6 + "vw"
    };
    const buttonBackground = {
        background: "#2b68a6",
    };
    
    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <div className='flex justify-between mb-4'>
                <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl font-bold text-white mb-6">Hospital</h1>
                <h1 className='text-2xl p-2'>
                    <Link to="/Hospital"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
                </h1>
            </div>
            <h2 className='text-2xl font-semibold mb-4'>Blood Bank Availability</h2>

            {/* Table with hover effect */}
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200 border-collapse'>
                    <thead style={buttonBackground} className=''>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Address</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Contact</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Blood Availability</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Blood Transaction</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {bloodBanks.map((bank) => (
                            <tr key={bank.id} className="hover:bg-blue-400 transition-colors duration-200 ease-in-out">
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{bank.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{bank.address}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{bank.contact}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{bank.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{bank.blood_availability}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{bank.blood_transaction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BloodBankAvailability;
