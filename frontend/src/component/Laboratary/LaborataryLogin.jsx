import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import homebutton from './images/home-button.png'
import laboratory from './images/laboratory.jpg'

const LoginLaboratory = ({ setLaboratory }) => {
    const navigate = useNavigate(); // For navigation after successful login
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3000/login-laboratory', {
                name,
                password
            });
            const laboratoryId = response.data.laboratoryId;
            setLaboratory(laboratoryId);  // Save hospital ID in state
            localStorage.setItem('laboratoryId', laboratoryId);  // Save hospital ID in localStorage
         
            setSuccessMessage(response.data.message); // Display success message
            setName(''); // Reset the name field
            setPassword(''); // Reset the password field
            navigate("/LaboratoryDashboard"); // Redirect to the dashboard after successful login
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Login failed'); // Display error message
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
        <div className="flex    min-h-screen bg-white">
           
            <div className='w-6/12 justify-center min-h-screen flex flex-col items-center' style={background}>
          <div className='h-40 w-full flex '>
            <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl text-white font-bold text-left w-full ml-6 mb-6"> Laboratory</h2>
          </div>
            <form style={borderRadius} onSubmit={handleLogin} className="flex flex-col mb-1 bg-white justify-between items-center p-4 shadow-lg rounded-lg w-7/12 h-96 py-14 px-14">
            <h2 className="text-3xl text-black-500 font-bold text-center w-full ml-6 mb-6"> Welcome Back!</h2>

                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                              />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            style={background} className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl "                              />
                    </div>

                    <div className='flex justify-evenly w-96 mt-6'>

                    <button
                        type="submit"
                        style={buttonBackground}  className="text-white text-2xl py-2 px-2 rounded-full w-40 " 
                    >
                        Continue
                    </button>
                    <button style={buttonBackground} className='text-white text-2xl py-2 px-2 rounded-full w-28 '>                    <Link to="/RegisterLaboratory">Register</Link>
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

export default LoginLaboratory;
