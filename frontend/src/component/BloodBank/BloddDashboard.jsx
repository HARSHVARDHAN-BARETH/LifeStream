import React from 'react'
import { Link } from 'react-router-dom'

function BloddDashboard() {
  return (
    <div className='flex p-4  flex-col  border-black border-2'>
      <div className='flex justify-between mr-4'>
            <h1 className='border-2 rounded-2xl border-black pt-1 pb-1 w-1/6 pl-2 pr-2 mt-4 text-center text-black bg-green-400  text-2xl'><Link to="/">Home</Link></h1>
            </div>
            <h1 className='border-2 rounded-2xl border-black pt-1 pb-1 w-1/6 pl-2 pr-2 mt-4 text-center text-black bg-pink-400  text-2xl'>     <Link to="/BloodBankDetails">BloodBankDetails</Link>

            </h1>
            <h1 className='border-2 rounded-2xl border-black pt-1 pb-1 w-1/6 pl-2 pr-2 mt-4 text-center text-black bg-pink-400  text-2xl'>                 <Link to="/Login">Login BloodBank</Link>         </h1> 

          

    </div>
  )
}

export default BloddDashboard
