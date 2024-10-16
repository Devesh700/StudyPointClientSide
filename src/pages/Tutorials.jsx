import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Components/Sidebar'
import TextEditor from '../components/utils/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkillTitle, getSkillTitleById, getTopicById } from '../store/slices/tutorialSlice';
import { PiPaperPlaneRightBold } from "react-icons/pi";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../store/slices/userSlice';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const Tutorials = ({propsAllTitle}) => {
  //debugger;
  const timeref=useRef();
    const navigate=useNavigate();
  const dispatch=useDispatch();
  const params=useParams();
  const navState=useLocation().state;
  const tutorial=useSelector(state=>state?.tutorials?.SkillTitle);
  const user=useSelector(state=>state?.user?.user) || JSON.parse(sessionStorage.getItem("user"))?.user;
  const allTitle=propsAllTitle || navState?._id?[{...navState}]: useSelector(state=>state?.tutorials?.allTitle);
  let Topics=useSelector(state=>state?.tutorials?.Topics);
  //debugger
  const [content,setContent]=useState(null);
  const [activeTopic,setActiveTopic]=useState(0);
  const [activeTitle,setActiveTitle]=useState(0);
  const [activeSubTitle,setActiveSubTitle]=useState(0);
  const [steps,setSteps]=useState(0);
  const [visibleTitleBar,setvisibleTitleBar]=useState(true);
const updateDetails=()=>{

  let userData={...user.journey?.filter(journey=>journey?.name===allTitle[0]?.journey)[0]};
  console.log(userData)
  console.log(allTitle[0].journey);
  // userData=userData?.filter(journey=>journey.name===allTitle[0]?.journey)
  // userData=userData[0];
  console.log(userData);
  userData.completed+=Math.round((1/userData.skills.length)*100);
  userData.completed=(userData.completed+userData.skills.length)>=100?100:userData.completed
  console.log(userData);
  dispatch(updateUser({journey:{name:userData.name,skills:userData.skills,completed:userData.completed}}))
  navigate(`/user/${user._id}`,{state:{user:user}})
}


useEffect(() => {
 //debugger;
  if (!allTitle?.length>0)
    dispatch(getAllSkillTitle());
  if (params?.id && !allTitle?.length > 0)
    dispatch(getSkillTitleById(params.id));
  if(!user?._id){
    let userId=JSON.parse(sessionStorage.getItem("user"))?.user?._id;
    if(userId)
    dispatch(getUserById(userId));
  }
}, [dispatch, params.id,navState,allTitle]); // Dependency array issue here


  useEffect(()=>{
    //debugger
    console.log(allTitle);
    if(allTitle?.length>0 && steps===0){
      {!content &&setContent(null)};
      // console.log(allTitle)
      let topicId=allTitle[activeTitle]?.subTitle[activeSubTitle]?.Topics[activeTopic]?.id;
      console.log(topicId);
      if(topicId ){
      dispatch(getTopicById(topicId));
      setSteps(1);
      }
      else{
        Topics=[];
      }
    }
  },[allTitle,activeTitle,activeSubTitle,activeTopic])

useEffect(()=>{
  
  if(Topics?._id){
    // //debugger
  let content="";
  Topics?.content?.forEach(item=>{content+=item+"<div style='margin:1rem 0rem;'></div>"})
  content=content.replace(/`/g,"")
  content=content.replace("[","")
  content=content.replace("]","")
  // content=content.replace(/,/g,"<div style='margin:1rem 0rem;'></div>")
  console.log(content);
  setContent(content);
  setSteps(2);
  }
  if(timeref.current){
    clearTimeout(timeref.current)
  }
  timeref.current=setTimeout(()=>steps!==2 &&setSteps(2),2000)

},[Topics])

  return (
    <div className='flex justify-between relative overflow-hidden'>
      <div className={`${!visibleTitleBar?"right-full":"left-0"} w-3/12 max-h-dvh overflow-y-scroll md:static fixed z-10 min-w-72 bg-slate-50 top-16`}>

        {!params?.id && <Sidebar/>}
        
        {allTitle?.length>0 && allTitle?.map((tutorial,tutindex)=>
          <div className='w-full px-4 '>
          <h1 className='text-3xl font-semibold my-4 py-2 px-2 bg-primary text-white'>{tutorial?.title}</h1>
          {tutorial?.subTitle?.map((elem,levelindex)=>(
            <div className='px-1 '>
              <h3 className='text-xl font-semibold flex gap-4 items-center'><PiPaperPlaneRightBold/><span>{elem?.name}</span></h3>
              <ul className='px-2 my-4 list-decimal list-inside'>
              {elem?.Topics?.map((topic,index)=>
              <li className={(activeTitle===tutindex && activeSubTitle===levelindex && activeTopic===index)?"capitalize underline text-primary  my-2 cursor-pointer":"capitalize  my-2 cursor-pointer"} 
              onClick={()=>{
                setActiveTitle(tutindex);
                setActiveSubTitle(levelindex);
                setActiveTopic(index);
                setSteps(0);
               }}>
                <a >{topic?.name}</a>
              </li>)}
              </ul>
              
            </div>
          ))}
          {tutorial?.progress && tutorial.disabled &&
          <button className='bg-primary-lighter text-gray-600 hover:bg-gray-200 shadow-md transition-colors py-2 w-full'
          onClick={()=>updateDetails()}>Click once you complete this section</button>}
        </div>
  
        )
          }
          
      </div>
      {/* <div dangerouslySetInnerHTML={{__html:str}}/> */}
      {/* <div id='innerhtml' onLoad={putinnerHtml} onLoadedData={putinnerHtml}></div> */}
      <div className='md:w-9/12 relative w-full'>
      <div className={`${visibleTitleBar?"translate-x-72":""} fixed size-6 border-2 border-solid grid justify-center items-center text-xl z-10 text-white bg-gray-600 md:hidden`}>{visibleTitleBar?<FaArrowLeftLong onClick={()=>setvisibleTitleBar(false)}/>:<FaArrowRightLong onClick={()=>setvisibleTitleBar(true)}/>}</div>
      {content?<div className='p-4' dangerouslySetInnerHTML={{__html:content}}></div>:
      steps!==2?<div className='place-custom-center-2'>loading...</div>:
      <div className='place-custom-center-2'><h3 className='text-2xl font-semibold w-fit'>No Content has been added for selected skills, please send use feedback from the form mentioning topic name which is not available we will notify you once its available</h3></div>}
      </div>
    </div>
  )
}

export default Tutorials
