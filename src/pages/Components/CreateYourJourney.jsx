import React, { useEffect, useState } from 'react'
import { technology,skills, learningStacks } from './DummyData'
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllSkillTitle } from '../../store/slices/tutorialSlice'
import { verifyLogin } from '../../components/utils'
import { updateUser } from '../../store/slices/userSlice'
const CreateYourJourney = () => {
const dispatch=useDispatch()
const navigate=useNavigate();
    let Stacks = Object.keys(learningStacks)?.map(elem => ({ label: elem, value: elem }))
    const allTitle = useSelector(state => state.tutorials.allTitle)
    const user=useSelector(state=>state.user.user) || JSON.parse(sessionStorage.getItem("user"))?.user

  // const[technolo,settechno]=useState();
    const [createJourney, setCreateJourney] = useState();
  const [selectedjourney, setSelectedJourney] = useState();
  // const[skillData,setskills]=useState();
  
  useEffect(()=>{
      if (allTitle?.length === 0)
      dispatch(getAllSkillTitle())
  },[dispatch])

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
    // const tech=technology?.map(elem=>{
    //   return {label:elem, value:elem}
    // })
    // const skill=skills?.map(elem=>({label:elem,value:elem}));
    // const animated=makeAnimated();
    // useEffect(()=>{
    //   setskills(skills[technolo]?.map(elem=>({label:elem,value:elem})));
    // },[technolo])
    // useEffect(()=>{
    //   console.log(skillData);
    // },[skillData])
  return (
    <div>
      <fieldset className=' px-6 py-4 '>
      <form className='bg-white rounded-lg px-6 py-4 h-full'>
            <legend className='text-2xl font-bold'>Create Your Learning Joruney</legend>
            <div className='my-3'>
                <label htmlFor='technology' className='font-medium my-5'>Choose Technology</label>
                <Select
            className='mt-4'
            placeholder="Select the Stack"
            options={Stacks}
            closeMenuOnSelect={true}
            onChange={(selectedOption) => setSelectedJourney(selectedOption.value)} />
          <button className='w-full py-2 bg-green-950 text-white my-2'
          type='button'
          onClick={()=>{
            debugger
            if(verifyLogin()){
              //alert("created");
              dispatch(updateUser({journey:{name:selectedjourney,skills:createJourney}})).then(data=>data?.payload && navigate(`/user/${data.payload._id}`,{state:{user:data.payload}}))  
            }
            else{
              navigate("/login")  
            }
            // verifyLogin()? console.log(verifyLogin()) &&
            // dispatch(updateUser({journey:{name:selectedjourney,skills:createJourney}})).then(data=>data?.payload && navigate(`/user/${user._id}`)):
            // navigate("/login");

            }}>Create your Journey</button>


          {/* </div> */}
                {/* </Select> */}
            </div>
            {/* <div className='my-3'>
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
            </div> */}
            {/* <button type='submit' className='w-full py-4 text-center bg-primary text-white rounded-lg hover:bg-violet-400'>Let's Begin</button> */}
      </form>
      </fieldset>
    </div>
  )
}


export default CreateYourJourney
