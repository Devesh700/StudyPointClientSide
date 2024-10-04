import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaAlignLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { verifyLogin } from './utils';
import { resetState } from '../store/slices/userSlice';
import navIcon2 from "../assets/navicon2.webp"

const NavBar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [activeMobileNav, setActiveMobileNav] = useState(false);
  const [hoverOptions,setHoverOptions]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const user=useSelector(state=>state.user.user);
  const sessionData = JSON.parse(sessionStorage.getItem("user"));
    const localData = localStorage.getItem("accessToken");

  const logOut=()=>{
    dispatch(resetState())
    localStorage.clear();
    sessionStorage.clear();
    handleStorageChange();
    navigate("/");
  }

  useEffect(() => {
    console.log(user);
    
    if(user?.data?.accessToken)
    setIsLoggedIn(true);
  }, [user]);
  const handleStorageChange = () => {
      if(verifyLogin()){
        !isLoggedIn && setIsLoggedIn(true);
      }
      else{
        isLoggedIn && setIsLoggedIn(false);
      }
    };

  useEffect(()=>{
    window.addEventListener("storage",()=> {handleStorageChange()});
     if(verifyLogin()){
      //alert("loggedin")
        !isLoggedIn && setIsLoggedIn(true);
      }
      else{
        //alert("logged out")
        isLoggedIn && setIsLoggedIn(false);
      } 

    return () => {
      window.removeEventListener("storage", handleStorageChange); // Clean up
    };
  },[sessionStorage])
  return (
    <nav 
    className='w-full flex justify-between gap-2 items-center bg-primary-gradient lg:px-10 px-4 sticky top-0 z-50'>
      <div 
      className='flex justify-between items-center gap-4 md:w-2/6 relative'>
        <img src={navIcon2} className='size-20' alt="Nav Icon" />
        <FaAlignLeft
          className='sm:hidden block mobile-nav-tab text-white'
          tabIndex={0}
          onClick={() => setActiveMobileNav(!activeMobileNav)}
        />
        <ul className={`flex justify-start gap-8 text-white font-sans sm:static sm:flex-row sm:bg-transparent absolute top-16 z-20 flex-col bg-white ${activeMobileNav ? "active-mobile-nav" : "p-0"}`}>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => isActive ? "link-active" : "nav-links"}
              onClick={() => setActiveMobileNav(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/tutorials"}
              className={({ isActive }) => isActive ? "link-active" : "nav-links"}
              onClick={() => setActiveMobileNav(false)}
            >
              Tutorials
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/articles"}
              className={({ isActive }) => isActive ? "link-active" : "nav-links"}
              onClick={() => setActiveMobileNav(false)}
            >
              Articles
            </NavLink>
          </li>
        </ul>
      </div>

      {isLoggedIn?
      <div className='size-12 rounded-full bg-white flex place-items-center justify-center relative cursor-pointer'
      onMouseEnter={()=>setHoverOptions(true)}
      onClick={()=>setHoverOptions(!true)}
      onMouseLeave={()=>setHoverOptions(false)} >
        <p className='text-xl text-primary'>{sessionData?.user?.fullName?.substring(0,1)}</p>

        {hoverOptions && <div className='absolute top-8 right-8 bg-white w-36 rounded-md overflow-hidden '>
          <button 
          className='w-full py-2  text-center  hover:bg-slate-600 hover:text-white transition-colors'
          onClick={()=>navigate(`/user/${sessionData?.user?._id}`,{state:{user:sessionData?.user}})}>
            My Profile
          </button>
          <button 
          className='w-full py-2  text-center hover:bg-red-600 hover:text-white transition-colors'
          onClick={()=>logOut()}>
            Log Out
          </button>
          <button 
          className='w-full py-2  text-center hover:bg-green-600 hover:text-white transition-colors'
          onClick={()=>navigate("/postarticle")}
          >
            Post an Article
          </button>
        </div>}
      </div>:
      <button className='bg-white px-6 py-2 rounded-lg' onClick={()=>navigate("/register")}>Signup/Login</button>}
    </nav>
  );
};

export default NavBar;
