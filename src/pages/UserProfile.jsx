import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PersonalDetails from './Components/PersonalDetails';

const UserProfile = () => {
  const navigate=useNavigate();
    const user=useLocation().state.user;
    console.log(user);
  return (
    <div className=' container mx-auto sm:p-4 pt-10 lg:w-10/12 md:w-11/12 sm:w-full  my-4'>
      <PersonalDetails user={user}/>
      {user?.admin && 
      <div>
        <button className='w-full py-3 text-center bg-blue-700 text-white rounded-none my-2' onClick={()=>navigate("/admin")}>Create Tutorial Content</button>
        <button className='w-full py-3 text-center bg-gray-600 text-white rounded-none my-2' onClick={()=>navigate("/logs")}>Get logs</button>
      </div>
      }
    </div>
  )
}

export default UserProfile
