import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import hospitala from './images/hospitala.jpg'
import homeButton from './images/home-button.png'; 

const HospitalRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        contact_number: '',
        email: '',
        password: '',
        type: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register-hospital', formData);
            alert(response.data.message);
            if(response.status === 200) {
                navigate("/HospitalLogin");
            }
        } catch (error) {
            console.error('Error registering hospital:', error);
            alert('Failed to register hospital');
        }
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
        <div className="flex    bg-white ">
                   
           <div className='w-6/12 justify-center flex flex-col items-center' style={background}>

           <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl w-full mb-2 mt-2 ml-2 text-white font-bold text-left">Hospital Registration</h2>
            <form style={borderRadius} onSubmit={handleSubmit} className="flex flex-col mb-1 bg-white items-center p-4 shadow-lg rounded-lg w-7/12">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-xl font-medium text-blue-500">Hospital Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Hospital Name"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-xl font-medium text-blue-500">Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Location"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contact_number" className="block text-xl font-medium text-blue-500">Contact Number</label>
                    <input
                        type="text"
                        name="contact_number"
                        id="contact_number"
                        placeholder="Contact Number"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-xl font-medium text-blue-500">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-xl font-medium text-blue-500">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
   style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "
                        />
                </div>
                <div className="mb-6">
                    <label htmlFor="type" className="block text-xl font-medium text-blue-500">Hospital Type</label>
                    <select
                        name="type"
                        id="type"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "              >
                        <option value="">Select Type</option>
                        <option value="Private">Private</option>
                        <option value="Government">Government</option>
                    </select>
                </div>
                <div className='flex justify-evenly w-96 mt-0'>
                <button
                    type="submit"
                    style={buttonBackground}  className="text-white text-2xl py-2 px-2 rounded-full w-40 "

                >
                    Continue
                </button>
                <button style={buttonBackground} className='text-white text-2xl py-2 px-2 rounded-full w-28 '> <Link to="/HospitalLogin"> Login</Link></button>
               
                </div>
                
            </form>
           </div>

           <div className='w-6/12 '>
           <div className="flex justify-end w-full">
                <h1 className="text-2xl rounded-full px-4 py-2">
                <Link to="/"><img src={homeButton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
                </h1>
            </div>
            <div className="flex justify-center p-8  ">
                <img src={hospitala} className='  w-7/12 object-cover h-auto' alt="" />
            </div>
           </div>
        </div>
    );
};

export default HospitalRegister;
