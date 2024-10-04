import React, { useLayoutEffect, useRef } from 'react'

const StickyBanners = () => {
  const banner=useRef();
  const handleScroll=(e)=>{
    console.log(banner.current.clientHeight);
    console.log(banner.current.getBoundingClientRect().y);
    console.log(window.scrollY);
    
  }
  useLayoutEffect(()=>{
    window.addEventListener("scroll",handleScroll)
    return ()=>{
      removeEventListener("scroll",handleScroll);
    }
  },[])
  return (
    <div className='lg:w-10/12 md:w-11/12 w-full mx-auto p-4 flex justify-between flex-wrap my-6' ref={banner}>
      <section className='custom-flexw-2-parts'>
        <h3 className='text-2xl font-bold mb-4'>Master Web Development</h3>
        <p>Learn the latest in HTML, CSS, and JavaScript. Build responsive, modern web applications with step-by-step tutorials and best practices.</p>
        <button className='btn px-8 py-2 my-4 rounded-lg font-semibold text-white bg-primary'>Start Learning</button>
      </section>
      <section className='relative custom-flexw-2-parts overflow-y-scroll h-80 scroll-none'>
        <div className="sticky transition bg-purple-200 top-0  -rotate-1 w-full   text-primary gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Dive Deep into Backend Technologies</h3>
        <h3 className='text-2xl font-bold mb-4'>01</h3>
        </div>
        <p>Understand the core principles of server-side development. Explore Node.js, Express, databases, and more with our comprehensive tutorials.</p>
        
        <div>
        </div>
      </div>

      <div className="sticky transition bg-blue-950 text-white top-6  rotate-1 w-full    gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>DevOps Made Easy</h3>
        <h3 className='text-2xl font-bold mb-4'>02</h3>
        </div>
        <p>Learn how to automate your workflows, manage deployments, and streamline development with powerful DevOps tools and practices.</p>
        
        <div>
        </div>
      </div>

      <div className="sticky transition bg-purple-200 top-0  -rotate-1 w-full   text-primary gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Full-Stack Development Tutorials</h3>
        <h3 className='text-2xl font-bold mb-4'>03</h3>
        </div>
        <p>Combine frontend and backend knowledge to become a full-stack developer. Build real-world projects from start to finish.</p>
        
        <div>
        </div>
      </div>

      <div className="sticky transition bg-blue-950 text-white top-6  rotate-1 w-full    gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Stay Updated with the Latest Tech Trends</h3>
        <h3 className='text-2xl font-bold mb-4'>04</h3>
        </div>
        <p>Stay ahead in the fast-paced world of web development. Follow our guides on the latest frontend frameworks, backend technologies, and DevOps tools.</p>
        
        <div>
        </div>
      </div>
      </section>
    </div>
  )
}

export default StickyBanners
