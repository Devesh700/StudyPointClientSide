import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaAviato, FaBootstrap, FaChevronLeft, FaCss3, FaExpand, FaHtml5, FaJs, FaLink, FaLinkSlash, FaReact } from "react-icons/fa6";
import StudyMaterial from "./StudyMaterial.json";
import { Styles } from "./Styles";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllSkillTitle } from "../../store/slices/tutorialSlice";
import { skillNames } from "./DummyData";

const FeaturedSections = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const allTitle=useSelector(state=>state?.tutorials?.allTitle);
  const[touchX,setTouchX]=useState(0);
  const [data,setData]=useState([]);
  const carousel=useRef();
  useEffect(()=>{
    Styles();
  },[])


  const moveLeft=(i)=>{
    let container=document.querySelector(`.container-${i}`);
    // console.log(container.childNodes?.length,container.clientWidth,container.getClientRects());
    let containerWidth=container.clientWidth;
    if(containerWidth>800){
      containerWidth/=2;
    }
    container.scrollBy({
      left:-containerWidth,
      behavior:"smooth",
    })
  }
  const moveRight=(i)=>{
    let container=document.querySelector(`.container-${i}`);
    let containerWidth=container.clientWidth;
    if(containerWidth>800){
      containerWidth/=2;
    }
    container.scrollBy({
      left:containerWidth,
      behavior:"smooth",
    })
  }

  useEffect(()=>{
    if(!allTitle?.length>0)
      dispatch(getAllSkillTitle());
  },[dispatch])

  useEffect(()=>{
    console.log(allTitle);

// Function to normalize and check similarity
const isSimilar = (skill, names) => {
    return names.some(name => {
        const regex = new RegExp(`^${name.trim().toLowerCase()}$`, 'i'); // Case-insensitive match
        return regex.test(skill.trim().toLowerCase());
    });
};

let frontEnd = allTitle?.filter(skill => isSimilar(skill.title, skillNames["FrontEnd"])) || [];
let Backend = allTitle?.filter(skill => isSimilar(skill.title, skillNames["Backend"])) || [];
let Devops = allTitle?.filter(skill => isSimilar(skill.title, skillNames["Devops"])) || [];


  let updateddata=[frontEnd,Backend,Devops];
  console.log(updateddata)
  setData(updateddata)
  },[allTitle])


  
  
  return (
    <div className=" container mx-auto p-4 pt-10 lg:w-10/12 md:w-11/12 sm:w-full  my-4">
      <h3 className="text-2xl font-semibold">PICK UP SKILLS AND START LEARNING TODAY</h3>
      <div className="w-full overflow-hidden skills-container " ref={carousel}
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
      >
        {data?.map((study,index)=>(
          <section className="relative px-8 py-4">
            <h3 className="text-xl font-medium text-primary underline">
              {index===0 && "FrontEnd" || index===1 && "Backend" || index===2 && "Devops"}
            </h3>
            <button className="absolute top-2/4 left-0 text-2xl z-10" onClick={()=>moveLeft(index)}><FaChevronLeft/></button>
            <button className="absolute top-2/4 right-0 text-2xl z-10" onClick={()=>moveRight(index)}><FaChevronRight/></button>
            <div className={`sm:p-10 flex flex-nowrap md:gap-6 gap-2 scroll-smooth carousel-container container-${index}`}>
            {study?.map(material=>(
              <div className="carousel-item shadow-lg rounded-lg  w-full sm:min-w-80 sm:w-auto  bg-white text-black">
                <div className="p-6 w-full border-b-2 border-gra\">
        <h2 className="text-3xl font-bold mb-4">{material.title}</h2>
        <p className="text-lg">Get Started with</p>
        </div>
        <div className="px-6 py-4 w-full">
        <button onClick={()=>navigate(`/tutorials/${material?._id}`, {state:material})} className="text-orange-300 text-base hover:underline items-center gap-4 flex">Explore <FaLink/></button>
        </div>
      </div>
            ))}
            </div>
          
      </section>
        ))}
        </div>
  
    </div>
    
  );
};

export default FeaturedSections;
