import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imageFile from './images/loupe.png'; 
import blooddonation from './images/blood-donation.png'; 
import filter from './images/filter.png'; 
import close from './images/close.png'; 
import search from './images/search.png'; 
import homebutton from './images/home-button.png'; 
import adduser from './images/add-user.png'; 

function Hospital() {
  const [blood_type, setBloodType] = useState('');
  const [address, setAddress] = useState(''); 
  const [available_for_stem_cell, setAvailableForStemCell] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false); 

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:3000/search-donors', {
        params: {
          blood_type,
          address: address || undefined,
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearResults = () => {
    setDonors([]);
    setBloodType('');
    setAddress('');
    setAvailableForStemCell('');
  };
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
    <div style={background} className='flex p-4 flex-col'>
      <div className='flex justify-between mb-4'>
      <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl font-bold text-white mb-6">Hospital</h1>
        <h1 className='text-2xl  p-2'>
        <Link to="/"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
        </h1>
      </div>
    <div className='flex   items-center '>

      <div className="flex flex-col items-center  ">
    <div className='flex'>
          {/* Search Input with Icon */}
          <form onSubmit={handleSearch} className="relative flex items-center w-96">
          <input
            type="text"
            value={blood_type}
            onChange={(e) => setBloodType(e.target.value)}
            placeholder="Search For Donor"
            className="border-2 border-black rounded-3xl p-2 w-full pr-10"
          />
          <button type="submit" className="absolute right-2 top-0 bottom-0 flex items-center">
            <img src={imageFile} alt="Search Icon" style={{ width: "20px", height: "20px" }} />
          </button>
        </form>

        {/* Filter Icon */}
        <button onClick={toggleFilters} className="ml-4">
          <img src={filter} alt="Filter" style={{ width: "35px", height: "35px" }} />
        </button>
  {/* Filter Dropdown */}
  {showFilters && (
        <div className="bg-white p-4 shadow-lg rounded mb-4">
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Location"
              className="border-2 border-black rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Available for Stem Cell Donation</label>
            <select
              value={available_for_stem_cell}
              onChange={(e) => setAvailableForStemCell(e.target.value)}
              className="border-2 border-black rounded p-2 w-full"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      )}
    </div>

      {/* Donor List Section */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {donors.length > 0 && (
        <div className="mt-4 bg-white max-h-64 overflow-y-auto border-none rounded p-4">
          <button onClick={clearResults} className="ml-auto text-white p-1 mb-2">
            <img src={close} alt="Close" style={{ width: "20px", height: "20px" }} />
          </button>
          <ul>
            {donors.map((donor) => (
              <li key={donor.id} className="border-2 border-black rounded p-4 mb-4">
                <p><strong>Full Name:</strong> {donor.full_name}</p>
                <p><strong>Blood Group:</strong> {donor.blood_type}</p>
                <p><strong>Address:</strong> {donor.address}</p>
                <p><strong>Available for Stem Cell Donation:</strong> {donor.available_for_stem_cell ? 'Yes' : 'No'}</p>
                <p><strong>Contact Number:</strong> {donor.contact_number}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
        
      </div>

      {/* Additional Links */}
      <div className="flex ml-14 space-x-4">
          <Link to="/BloodBankAvailability" className="flex items-center space-x-2 text-lg text-black">
            <img src={blooddonation} alt="Blood Donation" className="w-8 h-8" />
            <span>Blood Bank Availability</span>
          </Link>
          <Link to="/HospitalAddDonor" className="flex items-center space-x-2 text-lg text-black">
            <img src={adduser} alt="Add User" className="w-8 h-8" />
            <span>Add Donor</span>
          </Link>
          <Link to="/HospitalDonorViews" className="flex items-center space-x-2 text-lg text-black">
            <img src={search} alt="View Donors" className="w-8 h-8" />
            <span>View Donors</span>
          </Link>
        </div>

        </div>

    </div>
  );
}

export default Hospital;
