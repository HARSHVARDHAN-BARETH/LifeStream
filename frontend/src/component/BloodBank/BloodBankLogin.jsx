import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image2 from './images/image2.png'; 

const Login = () => {
    const background = { 
        background: "#b3dcfc", 
    };
    const borderRadius = {
        borderRadius: 6 + "vw"
    };
    const buttonBackground = {
        background: "#2b68a6",
    };
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const response = await fetch('http://localhost:3000/login-blood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                setEmail('');
                setPassword('');
                alert('Login successful! Redirecting to Blood Dashboard');
                navigate('/BloodBankDetails');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to login');
        }
    };

    return (
        <div className="flex bg-white ">
                <form onSubmit={handleLogin} style={background} className="flex flex-col items-center p-8 shadow-lg rounded-lg w-6/12">
                    <div className='flex justify-start w-full mb-4'>
                        <h1 className='text-4xl text-white font-bold rounded-2xl p-2'>
                            <Link to="/">Blood Bank</Link>
                        </h1>
                    </div>
                  
                  <div className='bg-white w-9/12 flex flex-col justify-evenly items-center px-12 py-10 h-96' style={borderRadius}>
                    <h2 className="text-3xl text-center text-black font-bold mb-6">Welcome Back!</h2>
                  <div className="mb-4">
                        <label htmlFor="email" className="block text-xl font-medium text-blue-500">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={background} 
                            className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-xl font-medium text-blue-500">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={background} 
                            className="mt-1 block w-96 px-3 py-2 outline-none rounded-3xl"
                        />
                    </div>
                  </div>

              <div className='flex justify-evenly w-96 mt-5'>
              <button
                        type="submit"
                        style={buttonBackground}  
                        className="text-white text-2xl py-3 px-3 rounded-full w-40"
                    >
                        Continue
                    </button>
                    <button style={buttonBackground}   className='text-white text-2xl py-3 px-3 rounded-full w-28 '>
                    <Link to="/RegisterBloodBank" className="mt-4 ">Sign In</Link>

                    </button>
              </div>

                </form>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}

            <div className="flex flex-col items-center p-8  w-6/12">
                 <img src={image2} alt="" className='w-9/12 object-cover h-auto'/>
            </div>
        </div>
    );
};

export default Login;
