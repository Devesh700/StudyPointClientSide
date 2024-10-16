import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PersonalDetails from './Components/PersonalDetails';

const UserProfile = () => {
  const navigate=useNavigate();
  const params=useParams();
  const location=useLocation();
  //debugger
    const user=useMemo(()=>location.state?.user || {_id:params?.id},[params]);

    console.log(user);

    useEffect(()=>{
      document.title=`${params?.fullName} | WebAlay`
    },[])
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
