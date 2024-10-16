import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Select from "react-select"
import UserLists from './UserLists'
import ArticleListing from './ArticleListing'
import YourJourney from './YourJourney'
import { learningStacks } from './DummyData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSkillTitle } from '../../store/slices/tutorialSlice'
import { getUserById, updateUser } from '../../store/slices/userSlice'
import dummyProfile from "../../assets/dummyProfile.webp"
import { verifyLogin } from "../../components/utils/index"
import { FaEdit, FaUpload } from 'react-icons/fa'
import { TbMessageCircleCancel } from 'react-icons/tb'
// import { mergeAlias } from 'vite'

const PersonalDetails = ({ user }) => {
  ////debugger
  const dispatch = useDispatch();
  const allTitle = useSelector(state => state.tutorials.allTitle)
  const [myDetails,setMyDetails]=useState({
    fullName:"",
    email:"",
    mobileNo:"",
    avtar:""
  });
  const [displayOptions,setDisplayOptions]=useState({
    fullName:false,
    email:false,
    mobileNo:false
  })
  const me = useSelector(state => state?.user?.user?._id
    ? state?.user?.user
    : JSON.parse(sessionStorage.getItem("user"))?.user) || {}
  const loggedInUser = useMemo(() => me?._id === user?._id ||
    JSON.parse(sessionStorage.getItem("user"))?.user?._id === user?._id
    , [user, me]);
  const User = useSelector(state => {
    if (loggedInUser) {
      return state.user.user;  // Logged-in user
    } else {
      return state?.user?.searchedUser;  // Searched user if logged-in user is undefined
    }
  });

  // const [User,setUser]=useState([]);
  const [activeTab, setActiveTab] = useState("following")
  const [activeJourney, setActiveJourney] = useState([])
  const [createJourney, setCreateJourney] = useState();
  const [selectedjourney, setSelectedJourney] = useState();
  const [following, setFollowing] = useState(me?.following?.find(elem => elem === User?._id));

  let Stacks = Object.keys(learningStacks)?.map(elem => ({ label: elem, value: elem }))

  useEffect(() => {
   //debugger
    if (allTitle?.length === 0)
      dispatch(getAllSkillTitle())
    if (user?._id)
      dispatch(getUserById(user._id));
  }, [dispatch, user?._id])


  useEffect(() => {
    if (User?._id) {
      if (me?.following?.find(val => val?._id == User?._id)) {
        { !following && setFollowing(true) };
      }
      else {
        { following && setFollowing(false) }
      }
    }
    setMyDetails(me);
  }, [User, me])

  useEffect(() => {
    console.log(User);
    // setUser(userData);
  }, [User])

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
    JourneyOptions = JourneyOptions?.map(elem => ({ name: elem.title, _id: elem._id }))
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

  const updateMe = () => {
    if (!verifyLogin()) {
      return alert("please log in to continue")
    }
    console.log(User?._id);
    let follow = true;
    if (following)
      follow = false;
    // alert("ready to send");
    dispatch(updateUser({ following: { _id: User?._id, follow: follow } })).then((data) => console.log(data)).catch(err => console.log(err));
  }

  const updateDetails = (name, value) => {
    let userData = { [name]: value };
    if (!verifyLogin()) {
      return alert("this id doesn't belong to you");
    }
    console.log(userData)
    dispatch(updateUser(userData));
  }
  return (
    <div className='w-full flex gap-y-8 justify-center flex-wrap'>
      <div className='w-4/12 sm:min-w-48 min-w-80'>
        <img src={User?.avtar ? User?.avtar : dummyProfile} className='w-full object-cover mb-4' />
        {!loggedInUser
          ? <div className='w-full'>
            <button className='w-full bg-blue-900 text-white hover:bg-blue-500 py-4 transition text-xl'
              onClick={() => updateMe()}>
              {!following ? "Follow" : "following"}
            </button>
          </div>
          : <div className='w-full'>
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
                  <YourJourney completed={course?.completed} skills={course.skills} name={course.name} />
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
              onClick={() => dispatch(updateUser({ journey: { name: selectedjourney, skills: createJourney } }))}>Create your Journey</button>
          </div>}
        {/* <YourJourney/> */}
      </div>
      <div className='h-fit sm:w-8/12 w-full bg-primary-gradient'>
        <div className=' text-white'>
          <div className='flex justify-between relative'>
          <p className='text-3xl font-semibold capitalize py-4 px-6 text-gray-200'>{User?.fullName}</p>
          {loggedInUser &&
          <div className='absolute right-8 top-4 flex gap-4'> {!displayOptions.fullName?
           <FaEdit className='text-2xl' onClick={()=>setDisplayOptions((pre)=>({...pre,fullName:true}))}/>
           :<TbMessageCircleCancel className='text-3xl' onClick={()=>setDisplayOptions((pre)=>({...pre,fullName:false}))}/>}
          {loggedInUser && displayOptions.fullName && <FaUpload className='bg-green-600 text-white py-1 rounded-md px-2 text-3xl' onClick={(e)=>updateDetails("fullName",myDetails?.fullName)}/>}
          </div>}
          {loggedInUser && displayOptions.fullName && <input className='w-72 rounded-md text-black border-blue-500 absolute left-4 top-4 text-xl p-4'
          value={myDetails?.fullName}
          name='fullName'
          onChange={(e)=>setMyDetails((pre)=>({...pre,[e.target.name]:e.target.value}))}/>}
          
          </div>
          <div className='flex justify-between relative'>
          <p className='text-base italic py-2 px-6'>{User?.mobileNo}</p>
          {loggedInUser &&
          <div className='absolute right-8 top-4 flex gap-4'> {!displayOptions.mobileNo?
           <FaEdit className='text-2xl' onClick={()=>setDisplayOptions((pre)=>({...pre,mobileNo:true}))}/>
           :<TbMessageCircleCancel className='text-3xl' onClick={()=>setDisplayOptions((pre)=>({...pre,mobileNo:false}))}/>}
          {loggedInUser && displayOptions.mobileNo && <FaUpload className='bg-green-600 text-white py-1 rounded-md px-2 text-3xl' onClick={(e)=>updateDetails("mobileNo",myDetails?.mobileNo)}/>}
          </div>}
          {loggedInUser && displayOptions.mobileNo && <input className='w-72 rounded-md text-black border-blue-500 absolute left-4 top-2 text-base italic p-2'
          value={myDetails?.mobileNo}
          name='mobileNo'
          onChange={(e)=>setMyDetails((pre)=>({...pre,[e.target.name]:e.target.value}))}/>}
          
          </div>
          <div className='flex justify-between relative'>
          <p className='text-base italic py-2 px-6'>{User?.email}</p>
          {loggedInUser &&
          <div className='absolute right-8 top-4 flex gap-4'> {!displayOptions.email?
           <FaEdit className='text-2xl' onClick={()=>setDisplayOptions((pre)=>({...pre,email:true}))}/>
           :<TbMessageCircleCancel className='text-3xl' onClick={()=>setDisplayOptions((pre)=>({...pre,email:false}))}/>}
          {loggedInUser&& displayOptions.email && <FaUpload className='bg-green-600 text-white py-1 rounded-md px-2 text-3xl' onClick={(e)=>updateDemyDetails("email",myDetails?.email)}/>}
          </div>}
          {loggedInUser && displayOptions.email && <input className='w-72 rounded-md text-black border-blue-500 absolute left-4 top-2 text-base italic p-2'
          value={myDetails?.email}
          name='email'
          onChange={(e)=>setMyDetails((pre)=>({...pre,[e.target.name]:e.target.value}))}/>}
          
          </div>
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
        {activeTab === "following" ? <UserLists list={User?.following} /> : <></>}
        {activeTab === "follower" ? <UserLists list={User?.followers} /> : <></>}
        {activeTab === "articles" ? <ArticleListing Articles={User?.articles} /> : <></>}
      </div>
    </div>
  )
}

export default PersonalDetails
