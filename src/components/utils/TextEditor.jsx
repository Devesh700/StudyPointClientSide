import React, { useState } from 'react'
import Select from "react-select";
const TextEditor = () => {
    const [selectedText,setselectedText]=useState();

    const FontSize=[
        {label:4,value:4},
        {label:8,value:8},
        {label:12,value:12},
        {label:16,value:16},
        {label:20,value:20},
        {label:24,value:24},
        {label:28,value:28},
    ]
  return (
    <div className='w-11/12 min-w-80 border border-black rounded-lg resize'>
      <div className='w-full py-2 px-4 flex justify-between'>
        <Select
        options={FontSize}
        defaultValue={FontSize[3]}
        closeMenuOnSelect={true}
        onChange={(selectedOption)=>console.log(selectedOption.value)}/>
        <button><h3>B</h3></button>
        <button><i>I</i></button>
        <button><u>U</u></button>
        <div className='size-10 bg-gray-100 flex flex-col justify-around items-center'>
            <ul className='w-full flex flex-col justify-around items-center gap-2 list-disc'>
                <li className='w-full px-2'><div className='w-full h-px bg-black' /></li>
                <li className='w-full px-2'><div className='w-full h-px bg-black' /></li>
                <li className='w-full px-2'><div className='w-full h-px bg-black' /></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default TextEditor
