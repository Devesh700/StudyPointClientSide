import React, { useEffect, useState } from 'react'
import { technology,skills } from './DummyData'
import Select from "react-select"
import makeAnimated from "react-select/animated"
const CreateYourJourney = () => {
  const[technolo,settechno]=useState();
  const[skillData,setskills]=useState();
    const tech=technology?.map(elem=>{
      return {label:elem, value:elem}
    })
    // const skill=skills?.map(elem=>({label:elem,value:elem}));
    const animated=makeAnimated();
    useEffect(()=>{
      setskills(skills[technolo]?.map(elem=>({label:elem,value:elem})));
    },[technolo])
    useEffect(()=>{
      console.log(skillData);
    },[skillData])
  return (
    <div>
      <fieldset className=' px-6 py-4 '>
      <form className='bg-white rounded-lg px-6 py-4 h-full'>
            <legend className='text-2xl font-bold'>Create Your Learning Joruney</legend>
            <div className='my-3'>
                <label htmlFor='technology' className='font-medium my-5'>Choose Technology</label>
                <Select
                id='technology'
                name='technology'
                closeMenuOnSelect={true}
                defaultValue={tech[0]}
                options={tech}
                onChange={(selectedOption)=>settechno(selectedOption.value)}
                components={animated}
                >
                </Select>
            </div>
            <div className='my-3'>
                <label htmlFor='skills' className='font-medium my-2'>Choose Skill</label>
                <Select
                id='skills'
                name='skills'
                closeMenuOnSelect={true}
                defaultValue={"choose skill"}
                options={skillData}
                components={animated}
                >
                </Select>
            </div>
            <button type='submit' className='w-full py-4 text-center bg-primary text-white rounded-lg hover:bg-violet-400'>Let's Begin</button>
      </form>
      </fieldset>
    </div>
  )
}


export default CreateYourJourney
