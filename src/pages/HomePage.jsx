import Hero from './Components/Hero';
import FeaturedSections from './Components/FeaturedSections';
import Footer from '../components/Footer';
import Home from './Home';
import ImageAsideCard from '../components/utils/ImageAsideCard';
import TiltedBanner from '../components/utils/TiltedBanner';
import StickyBanners from '../components/utils/StickyBanners';
import CreateYourJourney from './Components/CreateYourJourney';
import YourJourney from './Components/YourJourney';
import { useEffect, useMemo, useState } from 'react';
import { verifyLogin } from '../components/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../store/slices/userSlice';
import { getAllArticle } from '../store/slices/articleSlice';
import ArticleListing from './Components/ArticleListing';
import Articles from './Components/Articles';
import hero from "../assets/hero.webp"

const HomePage = () => {
  //debugger
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loggedIn,setloggedIn]=useState(false);
  const User=useSelector(state=>state.user.user);
  const userId=JSON.parse(sessionStorage.getItem("user"))?.user?._id;
  const allArticle=useSelector(state=>state.article.allArticles);
  useEffect(()=>{
    setloggedIn(verifyLogin());
  },[sessionStorage])

  useEffect(()=>{
    //debugger;
    if(!User?._id && userId)
      dispatch(getUserById(userId))
    if(allArticle?.length===0)
      dispatch(getAllArticle())
    
  },[dispatch])

  const course=useMemo(()=>{
    let journey=User?.journey;
    for(let i=0;i<journey?.length;i++){
      if(journey[i]?.completed!==100)
      return journey[i];
      else if(i===journey?.length-1)
      return journey[i];
    }
  },[User])

  const PostArticle=()=>{
    const flag=verifyLogin();
    if(flag){
      //alert(flag)
      navigate("/postarticle")
    }
    else{
      navigate("/login");
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero/>
        <FeaturedSections />
        {allArticle?.length!==0 && <ArticleListing Articles={allArticle?.slice(0,6)}/>}
        <button className='bg-gray-200 rounded-md px-24 py-2 mx-auto grid hover:bg-gray-100' onClick={()=>navigate("/articles")}>View All</button>
        <div className='lg:w-10/12 md:w-11/12 w-full mx-auto p-4 flex justify-between flex-wrap my-6 items-end'>
          {!loggedIn && <CreateYourJourney/>}
          <div className=' lg:w-1/2 md:w-5/12 mx-auto w-full'>
          <YourJourney completed={course?.completed} skills={course?.skills} name={course?.name}/>
          {/* {course?.completed!==100 && <button className='bg-primary rounded-md px-6 py-2 text-white mx-auto grid'>Resume your journey</button>} */}
          </div>
        </div>
        <ImageAsideCard img={hero} features={[
          "Comprehensive Tutorials and Articles: The web app provides in-depth tutorials and articles on various web development technologies. Users can access well-organized and categorized content, covering a wide range of topics to help them enhance their skills.",
          "User Authentication and Personalization: The platform includes user authentication, allowing users to sign up, log in, and personalize their learning experience. They can save their progress, bookmark articles, and revisit topics based on their preferences.",
          "Interactive Challenges and Study Materials: Users can engage with interactive challenges that test their knowledge and understanding of various web development topics. The web app also offers a vast collection of study materials to aid in learning."]}/>
        <TiltedBanner heading={"start posting articles today"} description={"posting articles may give you a chance to present your knowledge among other peoples, so what are you waiting for lets create an article"} button={{text:"Create article",link:"",handleClick:PostArticle}}/>
        <StickyBanners/>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
