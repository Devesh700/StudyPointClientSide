import React, { useState } from 'react'
import UserLists from './UserLists'
import ArticleListing from './ArticleListing'
import YourJourney from './YourJourney'

const PersonalDetails = ({user}) => {
    const [activeTab,setActiveTab]=useState("following")
    const [activeJourney,setActiveJourney]=useState([])
    const activeCourse=[
      {courseName:"FrontEnd", completed:20},
      {courseName:"Backened", completed:40},
      {courseName:"FullStack", completed:60},
      {courseName:"PHP", completed:90},

    ]

    const handleYourJourney=(btn,index)=>{
      if(activeJourney?.includes(index)){
      // btn.style.height="0px"
      setActiveJourney(pre=>pre.filter(journey=>journey!==index))
      }
      else{
        setActiveJourney(pre=>[...pre,index]);
      // btn.style.height="300px";
      }
    }
  return (
    <div className='w-full flex gap-y-8 justify-center flex-wrap'>
      <div className='w-4/12 sm:min-w-48 min-w-80'>
        <img src='.././src/assets/dummyProfile.png' className='w-full object-cover mb-4'/>
        <div className='w-full'>
          <h3 className='text-3xl font-semibold my-4'>Your Courses</h3>
          {activeCourse?.map((course,index)=>
          <div >
            <button className={`py-2 w-full flex justify-around text-center bg-slate-100 outline-none hover:bg-slate-700 hover:text-white transition-colors ${activeJourney.includes(index)?"bg-slate-700 text-white":""}`}
            onClick={()=>handleYourJourney(document.getElementById(`profileYourJourney${index}`),index)}
            >
              <span>{course?.courseName}</span>
              <span>{course?.completed} %</span>
            </button>
            <div className={`w-full overflow-hidden transition-all ${activeJourney.includes(index)?"sm:h-72 h-80 py-4 ":"h-0"}`} id={`profileYourJourney${index}`}>
            <YourJourney completed={course?.completed}/>
            </div>
          </div>
          )}
        </div>
        {/* <YourJourney/> */}
      </div>
      <div className='h-fit sm:w-8/12 w-full bg-primary-gradient'>
        <div className=' text-white'>
        <p className='text-3xl font-semibold capitalize py-4 px-6 text-gray-200'>{user?.fullName}</p>
        <p className='text-base italic py-2 px-6'>{user?.email}</p>
        <p className='text-base italic py-2 px-6'>{user?.mobileNo}</p>
        </div>
        <ul className=' flex sm:px-6 w-full justify-center sm:mx-0 mx-auto bg-primary-lighter mt-6'>
            <li tabIndex={0} className={`w-max sm:px-6 px-4 cursor-pointer py-2 grid justify-center items-center  hover:bg-white 
            ${activeTab==="following"?"border-t-2 border-blue-950 bg-slate-100":""}`}
            onClick={()=>setActiveTab("following")}>Followings</li>
            <li tabIndex={1} className={`w-max sm:px-6 px-4 cursor-pointer py-2 grid justify-center items-center  hover:bg-white 
            ${activeTab==="follower"?"border-t-2 border-blue-950 bg-slate-100":""}`}
            onClick={()=>setActiveTab("follower")}>Followers</li>
            <li tabIndex={2} className={`w-max sm:px-6 px-4 cursor-pointer py-2 grid justify-center items-center  hover:bg-white 
            ${activeTab==="articles"?"border-t-2 border-blue-950 bg-slate-100":""}`}
            onClick={()=>setActiveTab("articles")}>Articles</li>
        </ul>
        {activeTab==="following"?<UserLists list={user.following}/>:<></>}
        {activeTab==="follower"?<UserLists list={user.follower}/>:<></>}
        {activeTab==="articles"?<ArticleListing Articles={user.articles}/>:<></>}
      </div>
    </div>
  )
}

export default PersonalDetails
