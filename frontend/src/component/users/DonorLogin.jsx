import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import homebutton from './images/home-button.png';
import search from './images/loupe.png';

const DonorLogin = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3000/donor-login', { email });
            if (response.data.message === 'Login successful') {
                alert('Login successful!');

                const donorid = response.data.donorid;
                onLogin(donorid); // Notify parent component about successful login
                localStorage.setItem('donorid', donorid);
                navigate("/DonorDashboard");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Failed to login');
        }
    };

    const background = {
        background: "#b3dcfc",
    };
    
    const buttonBackground = {
        background: "#2b68a6",
    };

    return (
        <div style={background} className='flex p-4 flex-col border-black border-2'>
            <div className='flex justify-between px-3 mb-4'>
                <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl font-bold text-white mb-6">Donor</h1>
                <h1 className='text-2xl p-2'>
                    <Link to="/"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
                </h1>
            </div>

            <form onSubmit={handleLogin} className="relative w-3/12 flex items-center">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="border-2 border-black rounded-3xl p-2 w-full pl-12 pr-10"
                />
                {/* Search/Submit button with icon */}
                <button
                    type="submit"
                    className="absolute right-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200 flex items-center"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    Login <img src={search} alt="" style={{ width: "20px", height: "20px" }} />
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
};

export default DonorLogin;
