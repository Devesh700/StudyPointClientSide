import React, { useEffect, useState } from 'react'
import Select from "react-select"
import UserLists from './UserLists'
import ArticleListing from './ArticleListing'
import YourJourney from './YourJourney'
import { learningStacks } from './DummyData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSkillTitle } from '../../store/slices/tutorialSlice'
import { getUserById, updateUser } from '../../store/slices/userSlice'
import dummyProfile from "../../assets/dummyProfile.webp"

const PersonalDetails = ({ user }) => {
  const dispatch = useDispatch();
  const allTitle = useSelector(state => state.tutorials.allTitle)
  const User=useSelector(state=>state.user.user);
  const [activeTab, setActiveTab] = useState("following")
  const [activeJourney, setActiveJourney] = useState([])
  const [createJourney, setCreateJourney] = useState();
  const [selectedjourney, setSelectedJourney] = useState();

  let Stacks = Object.keys(learningStacks)?.map(elem => ({ label: elem, value: elem }))

  useEffect(() => {
    debugger
    if (allTitle?.length === 0)
      dispatch(getAllSkillTitle())
    if(!User?._id)
      dispatch(getUserById(user._id));
  }, [dispatch])

  useEffect(()=>{
    console.log(User);
  },[User])

  useEffect(() => {
    const isSimilar = (skill, names) => {
      return names?.some(name => {
        const regex = new RegExp(`^${name.trim().toLowerCase()}$`, 'i'); // Case-insensitive match
        return regex.test(skill.trim().toLowerCase());
      });
    };
    console.log(selectedjourney);
    console.log(learningStacks[selectedjourney]);
    let JourneyOptions = allTitle?.filter(skillTitle => isSimilar(skillTitle.title, learningStacks[selectedjourney]))?.
      map(elem => ({ title: elem.title, _id: elem._id }));
    console.log(JourneyOptions);
    // if(user?.journey)
    JourneyOptions=JourneyOptions?.map(elem=>({name:elem.title,_id:elem._id}))
  console.log(JourneyOptions);
    setCreateJourney(JourneyOptions);
  }, [selectedjourney])

  const activeCourse = [
    { courseName: "FrontEnd", completed: 20 },
    { courseName: "Backened", completed: 40 },
    { courseName: "FullStack", completed: 60 },
    { courseName: "PHP", completed: 90 },

  ]

  const handleYourJourney = (btn, index) => {
    if (activeJourney?.includes(index)) {
      // btn.style.height="0px"
      setActiveJourney(pre => pre.filter(journey => journey !== index))
    }
    else {
      setActiveJourney(pre => [...pre, index]);
      // btn.style.height="300px";
    }
  }
  return (
    <div className='w-full flex gap-y-8 justify-center flex-wrap'>
      <div className='w-4/12 sm:min-w-48 min-w-80'>
        <img src={User?.avtar?User?.avtar:dummyProfile} className='w-full object-cover mb-4' />
        <div className='w-full'>
          <h3 className='text-3xl font-semibold my-4'>Your Courses</h3>
          {User?.journey?.map((course, index) =>
            <div >
              <button className={`py-2 w-full flex justify-around text-center bg-slate-100 outline-none hover:bg-slate-700 hover:text-white transition-colors ${activeJourney.includes(index) ? "bg-slate-700 text-white" : ""}`}
                onClick={() => handleYourJourney(document.getElementById(`profileYourJourney${index}`), index)}
              >
                <span>{course?.name}</span>
                <span>{course?.completed} %</span>
                
              </button>
              <div className={`w-full overflow-hidden transition-all ${activeJourney.includes(index) ? "sm:h-72 h-80 py-4 " : "h-0"}`} id={`profileYourJourney${index}`}>
                <YourJourney completed={course?.completed} skills={course.skills} name={course.name}/>
              </div>
            </div>
          )}
          <Select
            className='mt-4'
            placeholder="Select the Stack"
            options={Stacks}
            closeMenuOnSelect={true}
            onChange={(selectedOption) => setSelectedJourney(selectedOption.value)} />
          <button className='w-full py-2 bg-green-950 text-white my-2'
          onClick={()=>dispatch(updateUser({journey:{name:selectedjourney,skills:createJourney}}))}>Create your Journey</button>
        </div>
        {/* <YourJourney/> */}
      </div>
      <div className='h-fit sm:w-8/12 w-full bg-primary-gradient'>
        <div className=' text-white'>
          <p className='text-3xl font-semibold capitalize py-4 px-6 text-gray-200'>{User?.fullName}</p>
          <p className='text-base italic py-2 px-6'>{User?.email}</p>
          <p className='text-base italic py-2 px-6'>{User?.mobileNo}</p>
        </div>
        <ul className=' flex sm:px-6 w-full justify-center sm:mx-0 mx-auto bg-primary-lighter mt-6'>
          <li tabIndex={0} className={`w-max sm:px-6 px-4 cursor-pointer py-2 grid justify-center items-center  hover:bg-white 
            ${activeTab === "following" ? "border-t-2 border-blue-950 bg-slate-100" : ""}`}
            onClick={() => setActiveTab("following")}>Followings</li>
          <li tabIndex={1} className={`w-max sm:px-6 px-4 cursor-pointer py-2 grid justify-center items-center  hover:bg-white 
            ${activeTab === "follower" ? "border-t-2 border-blue-950 bg-slate-100" : ""}`}
            onClick={() => setActiveTab("follower")}>Followers</li>
          <li tabIndex={2} className={`w-max sm:px-6 px-4 cursor-pointer py-2 grid justify-center items-center  hover:bg-white 
            ${activeTab === "articles" ? "border-t-2 border-blue-950 bg-slate-100" : ""}`}
            onClick={() => setActiveTab("articles")}>Articles</li>
        </ul>
        {activeTab === "following" ? <UserLists list={User.following} /> : <></>}
        {activeTab === "follower" ? <UserLists list={User.follower} /> : <></>}
        {activeTab === "articles" ? <ArticleListing Articles={User.articles} /> : <></>}
      </div>
    </div>
  )
}

export default PersonalDetails
