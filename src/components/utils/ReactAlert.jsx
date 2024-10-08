import React, { useEffect, useState } from 'react'
import { CiCircleAlert } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { MdDone } from "react-icons/md";

const ReactAlert = ({
    type="Alert",
    message="Alert",
    className="",
    style={}
}) => {
    const [display,setdisplay]=useState(true);
  return (
    <div className={`${className} bg-slate-100 shadow-sm shadow-slate-100 z-50 transition-all fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-xl px-4 py-6 flex-col justify-around items-center md:w-80 w-72 ${display?"flex":"hidden"}`} style={style}>
      <h3 className='text-3xl font-bold '>
        {type==="Alert" && <CiCircleAlert/> || type==="Error" && <AiOutlineClose/> || type==="Success" && <MdDone/>}
      </h3>
      <p className='text-lg font-medium text-center'>{message}</p>
      <button className={`text-white px-4 py-2 rounded-lg ${type==="Alert"?"bg-blue-600":type==="Error"?"bg-red-600":type==="Success"?"bg-green-600":"bg-gray-600" }`}
      onClick={()=>setdisplay(false)}>Ok</button>
    </div>
  )
}

export default ReactAlert
