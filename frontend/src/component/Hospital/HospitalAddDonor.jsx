import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import homebutton from './images/home-button.png'; 


const DonorRegistration = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        aadhar_no: '',
        dob: '',
        gender: '',
        address: '',
        blood_type: '',
        last_donation: '',
        donation_type_history: '',
        available_for_stem_cell: false,
        CMV_status: '',
        HLA_typing: '',
        contact_number: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const hospitalId = localStorage.getItem('hospitalId');  // Assume hospitalId is stored in localStorage after login
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
    
        // Handle checkbox specifically
        const newValue = type === 'checkbox' ? checked : value;
    
        setFormData({ ...formData, [name]: newValue });
    };
        const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/hospital-donor-register', { ...formData, hospitalId })
            .then(response => {
                alert('Donor registered successfully!');
                navigate("/Hospital");
            })
            .catch(error => {
                console.error('There was an error registering the donor!', error);
            });
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
        <div style={background}>
   <div className='flex justify-between mb-4'>
      <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl font-bold text-white mb-6">Hospital</h1>
        <h1 className='text-2xl  p-2'>
        <Link to="/Hospital"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
        </h1>
      </div>
        <div style={borderRadius} className='flex flex-col p-6 max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md'>
            
            <h2 className='text-2xl text-center font-semibold text-blue-500 mb-4'>Add Donor </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="text"
                    name="aadhar_no"
                    value={formData.aadhar_no}
                    onChange={handleChange}
                    placeholder="Aadhar Number"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="text"
                    name="blood_type"
                    value={formData.blood_type}
                    onChange={handleChange}
                    placeholder="Blood Type"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="date"
                    name="last_donation"
                    value={formData.last_donation}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <textarea
                    name="donation_type_history"
                    value={formData.donation_type_history}
                    onChange={handleChange}
                    placeholder="Donation Type History"
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
          <label className='flex items-center space-x-2'>
    <input
        type="checkbox"
        name="available_for_stem_cell"
        checked={formData.available_for_stem_cell}
        onChange={handleChange}
        className='h-4 w-4'
    />
    <span className='text-gray-700'>Available for Stem Cell</span>
</label>


                <input
                    type="text"
                    name="CMV_status"
                    value={formData.CMV_status}
                    onChange={handleChange}
                    placeholder="CMV Status"
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <textarea
                    name="HLA_typing"
                    value={formData.HLA_typing}
                    onChange={handleChange}
                    placeholder="HLA Typing"
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <div className='flex justify-center'>

                <button
                    type="submit"
                     style={buttonBackground}  className="text-white text-2xl py-2 px-2 rounded-full w-56 "
                >
                    Register Donor
                </button>
                </div>
            </form>
        </div>

        </div>

    );
};

export default DonorRegistration;
