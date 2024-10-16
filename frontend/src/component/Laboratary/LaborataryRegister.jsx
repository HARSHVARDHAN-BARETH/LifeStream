import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import homebutton from './images/home-button.png'
import laboratory from './images/laboratory.jpg'

const RegisterLaboratory = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [donorRegistrationHistory, setDonorRegistrationHistory] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3000/register-laboratory', {
                name,
                address,
                contact,
                donor_registration_history: donorRegistrationHistory,
                password
            });

            setSuccessMessage(response.data.message);
            setName('');
            setAddress('');
            setContact('');
            setDonorRegistrationHistory('');
            setPassword('');

            // Redirect to the LoginLaboratory page after successful registration
            navigate('/LoginLaboratory');
        } catch (err) {
            console.error('Failed to register laboratory:', err);
            setErrorMessage(err.response?.data?.message || 'Failed to register laboratory');
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
        <div className="flex   justify-center min-h-screen bg-white">
          
            <div style={background} className='w-6/12 min-h-screen flex-col items-center flex justify-center'>
                <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl text-white font-bold text-left w-full ml-6 mb-6"> Laboratory Registration</h2>

            <div  className='py-12 px-12 w-8/12 justify-center flex flex-col items-center' style={background}>
                <form style={borderRadius} onSubmit={handleRegister} className="flex flex-col mb-1 bg-white justify-between items-center p-4 shadow-lg rounded-lg w-full py-14 px-14">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Laboratory Name"
                            required
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "    
                        />
                    </div>
                    <div>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            required
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Contact Number"
                            required
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                        />
                    </div>
                    <div>
                        <textarea
                            value={donorRegistrationHistory}
                            onChange={(e) => setDonorRegistrationHistory(e.target.value)}
                            placeholder="Donor Registration History (optional)"
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                        />
                    </div>
                   <div className='flex justify-evenly w-96 mt-6'>
                   <button
                        type="submit"
                        style={buttonBackground}  className="text-white text-2xl py-2 px-2 rounded-full w-40 "                    >
                        Continue
                    </button>
                    <button style={buttonBackground} className='text-white text-2xl py-2 px-2 rounded-full w-28 '>
                    <Link to="/LoginLaboratory"> Login</Link>
                    </button>
                   </div>
                </form>

                {successMessage && (
                    <p className="mt-4 text-center text-green-600 font-semibold">
                        {successMessage}
                    </p>
                )}
                {errorMessage && (
                    <p className="mt-4 text-center text-red-600 font-semibold">
                        {errorMessage}
                    </p>
                )}
            </div>
            </div>

            <div className='w-6/12 '>
            <div className="flex justify-end w-full">
            <h1 className="text-2xl rounded-full px-4 py-2">
                <Link to="/"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
                </h1>
            </div>
            <div className="flex justify-center p-8  ">
                <img src={laboratory} className='  w-7/12 object-cover h-auto' alt="" />
            </div>
            </div>

        </div>
    );
};

export default RegisterLaboratory;
