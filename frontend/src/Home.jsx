import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imageFile from './assets/images/loupe.png'; 
import image1 from './assets/images/image1.png'; 
import filter from './assets/images/filter.png'; 
import close from './assets/images/close.png'; 
import healthcare from './assets/images/healthcare.png'; 
import logo from './assets/images/logo.jpeg'; 
import "./index.css"

function Home() {
  const background = {
    background: "#2b68a6",
  }
  const overlay = { 
    background: "#b3dcfc", 
    borderTopLeftRadius: 6 + "vw", 
    borderTopRightRadius: 6 + "vw" 
  };
  const BoxColor = { background: "#2c7ac9", borderRadius: 3 + "vw" }

  const font={
    fontFamily: "Poppins"

  }

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

  // Function to toggle the filters on button click
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Function to clear donor results
  const clearResults = () => {
    setDonors([]);
    setBloodType('');
    setAddress('');
    setAvailableForStemCell('');
  };

  return (
    <div className='flex container p-4 flex-col border-none border-2 overflow-hidden'>
    <h1 style={background} className='border-none flex rounded-full w-32 text-center py-2.5 px-3 text-white text-2xl bg-blue-500 hover:bg-red-700'>
  <Link to="/DonorLogin">DLogin 
    <span className='text-sm'>🟢</span> 
  </Link>
</h1>



      <div className='mt-0.5 flex justify-evenly min-h-40 p-3 gap-4'>
        <div className='text-part w-6/12 text-2xl text-center justify-center flex flex-col gap-3 text-black'>
       
        <div className='text-center my-8'>
            <img src={logo} className="mx-auto mb-4 logo-size" alt="Logo" />
            <h1 style={font} className='text-5xl flex justify-center items-center animated-title'>
                Life-Stream
                <img src={healthcare} className="ml-4 healthcare-size" alt="Healthcare Icon" />
            </h1>
            <h1 className='text-3xl italic animated-text mt-2'> "Connecting Donors, Saving Lives." </h1>
        </div>

          <div className="flex">
            {/* Main Search Section */}
            <div className="flex-1 p-4">
              <form onSubmit={handleSearch} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={blood_type}
                    onChange={(e) => setBloodType(e.target.value)}
                    placeholder="Search For Donor"
                    className="border-2 border-black rounded-3xl p-2 w-full pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full text-white rounded-r p-2 bg-transparent">
                    <img src={imageFile} alt="Search Icon" style={{ width: "20px", height: "20px" }} />
                  </button>
                </div>
              </form>

              {/* Donor List Section with scrollable area */}
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-4 max-h-64 overflow-y-auto border-none rounded p-3">
                {donors.length > 0 ? (
                  <div>
                   <div className='w-full text-end'>
                   <button 
                      onClick={clearResults}
                      className="ml-96 text-white rounded p-1 mb-2"
                    >
                      <img src={close} alt="" style={{ width: "20px", height: "20px" }} />
                    </button>
                   </div>
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
                ) : (
                  !loading && <p></p>
                )}
              </div>
            </div>

            {/* Click-based Filter Section */}
            <div className="relative p-4 z-50">
              <button onClick={toggleFilters} className="text-white p-0 rounded">
                <img src={filter} style={{ width: "40px", height: "40px" }} alt="" />
              </button>

              {showFilters && (
                <div className="absolute bg-white shadow-lg rounded mt-2 p-4 z-10">
                  <div className="mb-4">
                    <label className="block mb-2">Location</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Location"
                      className="border-2 border-black rounded p-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Available for Stem Cell Donation</label>
                    <select
                      value={available_for_stem_cell}
                      onChange={(e) => setAvailableForStemCell(e.target.value)}
                      className="border-2 border-black rounded p-2">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="image-part w-1/3 flex justify-start items-start">
          <img src={image1} alt="" className="object-cover w-96 h-auto" />
        </div>
      </div>

      <div style={overlay} className="section1 mt-1 flex justify-evenly border-2 w-full border-black h-60 py-7 gap-4">
        <div style={BoxColor} className="item1 relative border-2 w-72 h-48 flex-col flex justify-end border-none bg-white bg-opacity-30">
          <h1 className="w-32 text-5xl border-none text-white p-3 mb-4">
            <Link to="/RegisterBloodBank">Blood Bank</Link>
          </h1>
          <div className="circle1 absolute top-0 right-[-10%] w-32 h-32 bg-white bg-opacity-50 rounded-full"></div>
          <div className="circle2 absolute bottom-[-4%] right-[1%] w-32 h-32 bg-white bg-opacity-50 rounded-full"></div>
        </div>

        <div style={BoxColor} className="item1 relative border-2 w-72 h-48 flex-col flex justify-center border-none bg-white bg-opacity-30">
          <h1 className="w-32 text-5xl border-none text-white p-3 mb-4"><Link to="/HospitalRegister">Hospital </Link></h1>
          <div className="circle1 absolute top-0 right-[-10%] w-32 h-32 bg-white bg-opacity-50 rounded-full"></div>
          <div className="circle2 absolute bottom-[-4%] right-[1%] w-32 h-32 bg-white bg-opacity-50 rounded-full"></div>
        </div>

        <div style={BoxColor} className="item1 relative border-2 w-72 h-48 flex-col flex justify-center border-none bg-white bg-opacity-30">
          <h1 className="w-32 text-5xl border-none text-white p-3 mb-4"> <Link to="/RegisterLaboratory">Laboratory </Link></h1>
          <div className="circle1 absolute top-0 right-[-10%] w-32 h-32 bg-white bg-opacity-50 rounded-full"></div>
          <div className="circle2 absolute bottom-[-4%] right-[1%] w-32 h-32 bg-white bg-opacity-50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
