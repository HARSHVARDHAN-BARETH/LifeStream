import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import homeButton from './images/home-button.png'; 
import filter from './images/filter.png'; 
import add from './images/add.png'; 

const BloodBankDetails = () => {
    const [details, setDetails] = useState([]);
    const [bloodAvailability, setBloodAvailability] = useState('');
    const [address, setAddress] = useState('');
    const [availableForStemCell, setAvailableForStemCell] = useState('');
    const [message, setMessage] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters((prev) => !prev);
    };

    const fetchDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3000/blood-bank-details', {
                params: {
                    blood_availability: bloodAvailability,
                    address: address,
                    available_for_stem_cell: availableForStemCell,
                }
            });
            setDetails(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Failed to fetch details.');
        }
    };

    const background = { 
        background: "#b3dcfc", 
    };

    return (
        <div style={background} className="form-section flex py-3 px-5 flex-col mt-3">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl text-white font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    Blood Bank Details
                </h2>
                <Link to="/"><img src={homeButton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
            </div>

            <form onSubmit={fetchDetails} className="flex items-center space-x-4 mb-4">
                {/* Smaller search input */}
                <div className="flex items-center rounded-md">
                    <input
                        type="text"
                        value={bloodAvailability}
                        onChange={(e) => setBloodAvailability(e.target.value)}
                        placeholder="Search..."
                        className="p-2 rounded-l-md border border-gray-400"
                        style={{ width: '150px' }}  // Set the input width smaller
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded-r-md p-2">
                        🔍
                    </button>
                </div>

                {/* Add and Filter buttons in the same line */}
                <div className="flex items-center space-x-4">
                    {/* Filter Icon */}
                    <button 
                        type="button"
                        onClick={toggleFilters}
                        className="text-white p-2 rounded"
                    >
                        <img src={filter} alt="Filter" style={{ width: '40px', height: '40px' }} />
                    </button>

                    {/* Add Blood Icon */}
                    <Link to="/AddBlood">
                        <img src={add} style={{ width: '40px', height: '40px' }} alt="Add Blood" />
                    </Link>
                </div>
            </form>

            {showFilters && (
                <div className="bg-white shadow-lg rounded p-4 mb-4">
                    {/* Location Filter */}
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Location</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Location"
                            className="border-2 border-black rounded p-2"
                        />
                    </div>
                </div>
            )}

            {message && <p className="text-red-500">{message}</p>}

            {details.length > 0 && (
                <div className="overflow-x-auto bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Matching Blood Banks:</h3>
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Address</th>
                                <th className="border border-gray-300 p-2">Contact</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Blood Availability</th>
                                <th className="border border-gray-300 p-2">Blood Transaction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((bank, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{bank.address}</td>
                                    <td className="border border-gray-300 p-2">{bank.contact}</td>
                                    <td className="border border-gray-300 p-2">{bank.email}</td>
                                    <td className="border border-gray-300 p-2">{bank.blood_availability}</td>
                                    <td className="border border-gray-300 p-2">{bank.blood_transaction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BloodBankDetails;
