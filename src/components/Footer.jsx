import { Link, useNavigate } from "react-router-dom";
import { verifyLogin } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllSkillTitle } from "../store/slices/tutorialSlice";
import { useEffect } from "react";
import navicon2 from "../assets/navicon2.webp"

const Footer = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const allTitle=useSelector(state=>state?.tutorials?.allTitle) || [];
  const sessionData=JSON.parse(sessionStorage.getItem("user"))?.user;

    useEffect(()=>{
    if(!allTitle?.length>0)
      dispatch(getAllSkillTitle());
  },[dispatch])

  useEffect(()=>{
    console.log(allTitle);
  },[allTitle])
  return (
    <footer className="bg-gray-900 text-white sm:p-4 mt-10 text-center md:px-8">
      <div className="flex justify-evenly gap-4 flex-wrap">
        <div>
          <Link to={"/"} className="hover:text-blue-400 size-28"><img src={navicon2} className="size-28" /></Link>
          <p className="text-white">
            Subscribe to our new letter for latest trending topics and tips.
          </p>
          <div className="my-4 flex items-stretch bg-white rounded-lg w-max h-fit overflow-hidden outline-orange-500  focus:outline-double focus-visible:outline-double" tabIndex={0}>
            <input type="email" className="sm:w-60 w-44 px-4 outline-none h-8 py-6 text-black" />
            <button className="px-8 py-2 bg-primary min-h-full">Subscribe</button>
          </div>
        </div>

        <div>
          <h3 className="text-2xl fw-bold">Important links</h3>
          <nav className="  mt-2 flex flex-col text-justify">
              <Link to={"/articles"}>Articles</Link>
              <Link to={"/tutorials"}>Tutorials</Link>
              <Link to={"/"}>Home</Link>
              {!verifyLogin()?<Link to={"/login"}>login</Link>:<button className="px-0 w-fit"
              onClick={()=>navigate(`/user/${sessionData._id}`,{state:{user:sessionData}})} to={"/"}>MyProfile</button>}
              <Link to={"/contact"}>Contact</Link>
              {/* <Link to={"/"}></Link> */}
          </nav>
        </div>

        <div>
          <h3 className="text-2xl fw-bold">Important topics</h3>
          <nav className="  mt-2 flex flex-col text-justify">
            {allTitle?.slice(0,5)?.map((material)=>
            <button className="px-0 w-fit " to={"/"}
            onClick={()=>navigate(`/tutorials/${material?._id}`, {state:material})}>{material?.title}</button>)}
          </nav>
        </div>

      </div>
      <p>&copy; 2024 WebAlay. All rights reserved.</p>
      <nav className="space-x-4 mt-2">
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        <Link to="/" className="hover:text-blue-400">Privacy Policy</Link>
      </nav>
    </footer>
  );
};

export default Footer;
