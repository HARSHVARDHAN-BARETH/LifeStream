import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import hospitala from './images/hospitala.jpg'
import homeButton from './images/home-button.png'; 

const HospitalLogin = ({ setHospitalId }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Use the useNavigate hook

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login-hospital', formData);
            alert(response.data.message);
            const hospitalId = response.data.hospitalId;
            setHospitalId(hospitalId);  // Save hospital ID in state
            localStorage.setItem('hospitalId', hospitalId);  // Save hospital ID in localStorage
            if (response.status === 200) { // Check for successful status
                navigate('/Hospital'); // Redirect to /Hospital upon successful login
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid email or password');
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
        <div className="flex  w-full  h-screen bg-white ">
           
            <div className='w-6/12  justify-center flex-col flex h-screen items-center ' style={background}>
            <h2 className="text-3xl ml-12 text-white w-full text-left font-bold mb-24">Hospital Login</h2>

            <form style={borderRadius} onSubmit={handleSubmit} className="bg-white px-8 h-96 flex flex-col items-center p-8 shadow-lg rounded-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-xl font-medium text-blue-500">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                                />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-xl font-medium text-blue-500">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                                />
                </div>

                <div className='flex justify-evenly w-96 mt-0'>
                <button
                    type="submit"
                    style={buttonBackground}  className="text-white text-2xl py-2 px-2 rounded-full w-40 "                >
                    Continue
                </button>
                <button style={buttonBackground} className='text-white text-2xl py-2 px-2 rounded-full w-28 '> <Link to="/HospitalRegister"> Sign In</Link></button>

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

export default HospitalLogin;
