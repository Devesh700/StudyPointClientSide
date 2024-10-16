import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GiRabbit } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSkillTitleById } from '../../store/slices/tutorialSlice';
import { current } from '@reduxjs/toolkit';
import { getUserById } from '../../store/slices/userSlice';
import ReactAlert from '../../components/utils/ReactAlert';

const YourJourney = ({completed,skills,name}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [fill,setfill]=useState(completed?completed:0);
    const User=useSelector(state=>state.user.user);
    const [activeSkill,setActiveSkill]=useState();
    const[color,setcolor]=useState();

    const goToTutorial=(id,index)=>{
        //alert(index);
        //alert(activeSkill);
        //alert(index===activeSkill);
        dispatch(getSkillTitleById(id)).then((data)=>{
            if(data?.error)
            <ReactAlert type='Error' message='Error accessing file'/>;
            else{
                console.log(data)
                navigate(`/${data?.payload?.title}/notes/${data.payload?._id}`, {state:{...data.payload,progress:true,journey:name,disabled:index===activeSkill}})
            }
        })
    }
    useEffect(()=>{
        setfill(completed)
    },[completed])

    useEffect(()=>{
        if(fill===0)
        setcolor("transparent")
        else if(fill<=25)
        setcolor("rgb(185 28 28)");
        else if(fill>25 && fill <=50)
        setcolor("rgb(252 165 165)");
        else if(fill>50 && fill <=75)
        setcolor("rgb(134 239 172 )");
        else if(fill>75 && fill <=100)
        setcolor("rgb(21 128 61 )");
    },[fill])

    useEffect(() => {
    if (skills?.length > 0) {
        let current = Math.round(skills?.length * (completed / 100));
        if (isNaN(current) || current < 0) current = 0;
        if (current >= skills.length) current = skills.length - 1; // Ensure current is within bounds
        
        setActiveSkill(current);

        let bullets = document.querySelectorAll(`.journey-range${name} .size-4`);
        if (bullets.length > 0 && current < bullets.length) {
            bullets[current].removeAttribute("disabled");
            bullets[current].ariaDisabled = "false";

            for (let i = current + 1; i < skills.length; i++) {
                bullets[i].ariaDisabled = "true";
                bullets[i].setAttribute("disabled", "true");
            }
        }
        console.log(bullets);
    }
}, [completed, skills, name]);

  return (
    <>
    <div className='w-full flex flex-col justify-center items-center text-center px-4'>
        <div className='size-28 rounded-full flex justify-center items-center border-slate-400  transition-all'
        style=
        {{background:`conic-gradient(${color} ${fill}%, transparent ${fill}%)`,
            boxShadow:`0px 0px 5px 2px gray` 
        }}>
            <div className='border-slate-400 bg-white z-10 size-24 rounded-full grid justify-center items-center'><h3 className='text-2xl font-semibold'>{fill}%</h3></div>
        </div>
        <h3 className='text-3xl'>{fill===100?`Congratulations on completing your journey of ${name} `:"Stay Foccussed and complete your journey"}</h3>

    <div className={`journey-range${name} w-full me-4 h-4 rounded-lg border-2 relative flex flex-nowrap justify-between items-center my-8`}>
        <div className='h-full rounded-lg  px-4 mx-auto absolute transition-all' style={{width:`${fill}%`,backgroundColor:color}}><GiRabbit 
        style={{color:color}}
        className='absolute -top-6 right-0 text-2xl'/></div>
        {skills?.map((skill,index)=>
        <button className={`size-4 relative rounded-full bg-red-700`}
        style={fill>=25?{backgroundColor:color}:{}}
        onClick={()=>goToTutorial(skill._id,index)}>
            <span className='absolute top-4 -right-1/2 text-xs'>{skill?.name}</span>
        </button>)}

        {!skills && <><div className={`size-4 rounded-full bg-red-700`}
        style={fill>=25?{backgroundColor:color}:{}}></div>
        <div className={`size-4 rounded-full bg-red-300`}
        style={fill>=50?{backgroundColor:color}:{}}></div>
        <div className={`size-4 rounded-full bg-green-300`}
        style={fill>=75?{backgroundColor:color}:{}}></div>
        <div className={`size-4 rounded-full bg-green-700`}
        style={fill==100?{backgroundColor:color}:{}}></div></>}
    </div>
    </div>
    </>
  )
}

export default YourJourney
