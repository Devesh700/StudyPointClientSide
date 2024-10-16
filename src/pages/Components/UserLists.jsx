import React from 'react'
import dummyProfile from "../../assets/dummyProfile.webp"
import { useNavigate } from 'react-router-dom'
const UserLists = ({list}) => {
  const navigate=useNavigate();
  console.log(list)
  return (
    
    <div className='w-full bg-slate-100 py-4 px-2'>
   {list?.length<1?
      <h3 className='text-3xl font-bold text-center'>Empty list</h3>
      :list?.map(item=>
        <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        {item?.avtar?<img src={item.avtar?item.avtar:{dummyProfile}} className='size-10 rounded-full bg-gray-300'/>:<div className='size-10 rounded-full bg-gray-300 flex justify-center items-center'>{item?.fullName?.slice(0,1)}</div>}
        <p>{item.fullName}</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'
        onClick={()=>navigate(`/user/${item.fullName}/${item._id}`,{state:{user:item}})}>view</button>
      </div>
      )}       </div>
  )
}

export default UserLists
