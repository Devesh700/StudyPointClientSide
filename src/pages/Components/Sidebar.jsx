// Sidebar.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select"

const Sidebar = ({data,setParentData}) => {
  const [option1,setOption1]=useState();
  const [selectedOption1,setselectedOption1]=useState();
  const [selectedOption2,setselectedOption2]=useState();
  const [option2,setOption2]=useState();
  useEffect(()=>{
    setOption1(Object.keys(data).map(elem=>({label:elem,value:elem})));
  },[data])

  useEffect(()=>{
    let option2Data=data[selectedOption1?.value]?.map(elem=>({label:elem?.title,value:elem?._id}))
    console.log(option2Data)
    setOption2(option2Data)
  },[selectedOption1])
  return (
    <aside className="w-full bg-gray-100 p-4 ">
      <h2 className="font-bold text-xl mb-4">Choose Stack and Technology</h2>
      <Select
      className="space-y-2"
      name="stack"
      id="stack"
      closeMenuOnSelect={true}
      options={option1}
      defaultValue={{label:"FrontEnd",value:"FrontEnd"}}
      onChange={(selectedOption)=>setselectedOption1(selectedOption)}>
      </Select>

      <Select
      className="space-y-2"
      name="technology"
      id="technology"
      closeMenuOnSelect={true}
      options={option2}
      defaultValue={{label:"React",value:"React"}}
      onChange={(selectedOption)=>{setselectedOption2(selectedOption); if(setParentData)setParentData(selectedOption.value)}}>
      </Select>
    </aside>
  );
};

export default Sidebar;
