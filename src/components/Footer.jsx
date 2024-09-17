import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white sm:p-4 mt-10 text-center md:px-8">
      <div className="flex justify-evenly gap-4 flex-wrap">
        <div>
          <Link to={"/"} className="hover:text-blue-400 size-28"><img src="src/assets/navicon2.png" className="size-28" /></Link>
          <p className="text-white">
            Subscribe to our new letter for latest trending topics and tips.
          </p>
          <div className="my-4 flex items-stretch bg-white rounded-lg w-max h-fit overflow-hidden outline-orange-500  focus:outline-double focus-visible:outline-double" tabIndex={0}>
            <input type="email" className="sm:w-60 w-44 px-4 outline-none h-8 py-6" />
            <button className="px-8 py-2 bg-primary">Subscribe</button>
          </div>
        </div>

        <div>
          <h3 className="text-2xl fw-bold">Important links</h3>
          <nav className="  mt-2 flex flex-col text-justify">
              <Link to={"/"}>Articles</Link>
              <Link to={"/"}>Quizes</Link>
              <Link to={"/"}>Daily Tips</Link>
              <Link to={"/"}>Start your Journey</Link>
              <Link to={"/"}>Express</Link>
              {/* <Link to={"/"}></Link> */}
          </nav>
        </div>

        <div>
          <h3 className="text-2xl fw-bold">Important topics</h3>
          <nav className="  mt-2 flex flex-col text-justify">
              <Link to={"/"}>JavaScript</Link>
              <Link to={"/"}>React</Link>
              <Link to={"/"}>Node</Link>
              <Link to={"/"}>Docker</Link>
              <Link to={"/"}>Express</Link>
              {/* <Link to={"/"}></Link> */}
          </nav>
        </div>

      </div>
      <p>&copy; 2024 WebAlay. All rights reserved.</p>
      <nav className="space-x-4 mt-2">
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
      </nav>
    </footer>
  );
};

export default Footer;
