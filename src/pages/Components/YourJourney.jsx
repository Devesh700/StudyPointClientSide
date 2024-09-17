import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GiRabbit } from "react-icons/gi";

const YourJourney = () => {
    const [fill,setfill]=useState(0);
    const[color,setcolor]=useState();
    useEffect(()=>{
        if(fill!==100)
        setTimeout(()=>setfill(fill+2),100)
    },[fill])
    useEffect(()=>{
        if(fill<=25)
        setcolor("rgb(185 28 28)");
        else if(fill>25 && fill <=50)
        setcolor("rgb(252 165 165)");
        else if(fill>50 && fill <=75)
        setcolor("rgb(134 239 172 )");
        else if(fill>75 && fill <=100)
        setcolor("rgb(21 128 61 )");
    },[fill])
  return (
    <>
    <div className=' lg:w-1/2 md:w-5/12 mx-auto w-full flex flex-col justify-center items-center text-center'>
        <div className='size-28 rounded-full flex justify-center items-center border-slate-400  transition-all'
        style=
        {{background:`conic-gradient(${color} ${fill}%, transparent ${fill}%)`,
            boxShadow:`0px 0px 5px 2px gray` 
        }}>
            <div className='border-slate-400 bg-white z-10 size-24 rounded-full grid justify-center items-center'><h3 className='text-2xl font-semibold'>{fill}</h3></div>
        </div>
        <h3 className='text-3xl'>{fill===100?"Congratulations on completing your journey of Full stack developer ":"Stay Foccussed and complete your journey"}</h3>

    <div className='journey-range w-full h-4 rounded-lg border-2 relative flex flex-nowrap justify-between items-center my-8'>
        <div className='h-full rounded-lg  px-4 mx-auto absolute transition-all' style={{width:`${fill}%`,backgroundColor:color}}><GiRabbit 
        style={{color:color}}
        className='absolute -top-6 right-0 text-2xl'/></div>
        <div className={`size-4 rounded-full bg-red-700`}
        style={fill>=25?{backgroundColor:color}:{}}></div>
        <div className={`size-4 rounded-full bg-red-300`}
        style={fill>=50?{backgroundColor:color}:{}}></div>
        <div className={`size-4 rounded-full bg-green-300`}
        style={fill>=75?{backgroundColor:color}:{}}></div>
        <div className={`size-4 rounded-full bg-green-700`}
        style={fill==100?{backgroundColor:color}:{}}></div>
    </div>
    </div>
    </>
  )
}

export default YourJourney
