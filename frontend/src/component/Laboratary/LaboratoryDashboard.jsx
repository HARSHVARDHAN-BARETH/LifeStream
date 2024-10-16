import React from 'react'
import { Link } from 'react-router-dom'
import homebutton from './images/home-button.png'
import adduser from './images/add-user.png'


function LaboratoryDashboard() {

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
      <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} className="text-3xl font-bold text-white mb-6">Laboratory</h1>
        <h1 className='text-2xl  p-2'>
        <Link to="/"><img src={homebutton} style={{ width: '40px', height: '40px' }} alt="Home" /></Link>
        </h1>
      </div>
     
      <Link to="/LaboratoryDonorRegister" className="flex items-center space-x-2 text-lg text-black">       <img src={adduser} alt="Add User" className="w-8 h-8" />
       <span>Add Donor</span></Link>
    </div>
  )
}

export default LaboratoryDashboard
