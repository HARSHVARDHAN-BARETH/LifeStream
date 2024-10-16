import React, { useState } from 'react';
import axios from 'axios';

const SearchDonors = () => {
    const [blood_type, setBloodType] = useState('');
    const [address, setAddress] = useState(''); // Location as input field
    const [available_for_stem_cell, setAvailableForStemCell] = useState('');
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('http://localhost:3000/search-donors', {
                params: {
                    blood_type,
                    address: address || undefined, // If user hasn't entered address, skip it
                    available_for_stem_cell: available_for_stem_cell.toLowerCase() === 'yes' ? 'yes' : '',
                }
            });
            setDonors(response.data);
        } catch (err) {
            setError('Failed to fetch donors');
        } finally {
            setLoading(false);
        }
    };

    // Function to toggle the filters on button click
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="flex">
            {/* Main Search Section */}
            <div className="flex-1 p-4">
                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={blood_type}
                            onChange={(e) => setBloodType(e.target.value)}
                            placeholder="Enter Blood Group"
                            className="border-2 border-black rounded p-2 w-full pr-10"
                        />
                        {/* Search button inside input field */}
                        <button type="submit" className="absolute right-0 top-0 h-full bg-blue-500 text-white rounded-r p-2">
                            <i className="fas fa-search"></i> {/* You can replace this with any search icon */}
                        </button>
                    </div>
                </form>

                {/* Donor List */}
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {donors.length > 0 ? (
                    <ul className="mt-4">
                        {donors.map(donor => (
                            <li key={donor.id} className="border-2 border-black rounded p-4 mb-4">
                                <p><strong>Full Name:</strong> {donor.full_name}</p>
                                <p><strong>Blood Group:</strong> {donor.blood_type}</p>
                                <p><strong>Address:</strong> {donor.address}</p>
                                <p><strong>Available for Stem Cell Donation:</strong> {donor.available_for_stem_cell ? 'Yes' : 'No'}</p>
                                <p><strong>Contact Number:</strong> {donor.contact_number}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No donors found</p>
                )}
            </div>

            {/* Click-based Filter Section */}
            <div className="relative p-4">
                {/* Filter Button */}
                <button 
                    onClick={toggleFilters} // Toggle on button click
                    className="bg-gray-500 text-white p-2 rounded"
                >
                    Filters
                </button>
                
                {/* Dropdown will show based on click */}
                {showFilters && (
                    <div className="absolute bg-white shadow-lg rounded mt-2 p-4">
                        {/* Location as Input */}
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

                        {/* Stem Cell Donation Dropdown */}
                        <div>
                            <label className="block font-bold mb-2">Available for Stem Cell Donation</label>
                            <select
                                value={available_for_stem_cell}
                                onChange={(e) => setAvailableForStemCell(e.target.value)}
                                className="border-2 border-black rounded p-2"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonors;
