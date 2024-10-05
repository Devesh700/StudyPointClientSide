import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../../components/utils";

const Hero = () => {
  const navigate=useNavigate();
  const sessionData=JSON.parse(sessionStorage.getItem("user"))?.user;
  return (
    <section className=" text-center sm:p-20 bg-hero text-blue-950">
      <div className="grid justify-center py-4 mx-auto bg-primary-lighter lg:w-6/12 md:w-8/12 sm:w-9/12 w-10/12">
      <h1 className="text-4xl font-bold">Master Web Development with Us</h1>
      <p className="mt-4 text-xl">Learn, Practice, and Excel with our comprehensive resources.</p>
      <button className="mt-8 bg-white text-blue-100 py-2 px-4 rounded-full text-lg bg-primary-gradient max-w-max"
      onClick={()=>{
          navigate(`/tutorials`)
      }}>
        Get Started
      </button>
      </div>
    </section>
  );
};

export default Hero;
