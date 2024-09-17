import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAlignLeft } from "react-icons/fa";

const NavBar = () => {
  const [activeMobileNav, setActiveMobileNav] = useState(false);

  return (
    <nav 
    className='w-full flex justify-between gap-2 items-center bg-primary-gradient lg:px-10 px-4 sticky top-0 z-50'>
      <div 
      className='flex justify-between items-center gap-4 md:w-2/6 relative'>
        <img src='/src/assets/navIcon2.png' className='size-20' alt="Nav Icon" />
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

      <div className='size-12 rounded-full bg-white flex place-items-center justify-center'>
        <p className='text-xl text-primary'>M</p>
      </div>
    </nav>
  );
};

export default NavBar;
