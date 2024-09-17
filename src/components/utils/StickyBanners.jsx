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
        <h3 className='text-2xl font-bold mb-4'>Discover the power of products</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio pariatur deleniti, rerum accusantium autem nemo nisi sint blanditiis provident. Eum minima maxime quasi sapiente cumque quaerat. Quos dolorum soluta rem!</p>
        <button className='btn px-8 py-2 my-4 rounded-lg font-semibold text-white bg-primary'>Let's Begin</button>
      </section>
      <section className='relative custom-flexw-2-parts overflow-y-scroll h-80 scroll-none'>
        <div className="sticky transition bg-purple-200 top-0  -rotate-1 w-full   text-primary gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Medium heading length of the banner</h3>
        <h3 className='text-2xl font-bold mb-4'>01</h3>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nam, dignissimos earum itaque aliquam in voluptatum cum. Vero, iure inventore.</p>
        
        <div>
        </div>
      </div>

      <div className="sticky transition bg-blue-950 text-white top-6  rotate-1 w-full    gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Medium heading length of the banner</h3>
        <h3 className='text-2xl font-bold mb-4'>02</h3>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nam, dignissimos earum itaque aliquam in voluptatum cum. Vero, iure inventore.</p>
        
        <div>
        </div>
      </div>

      <div className="sticky transition bg-purple-200 top-0  -rotate-1 w-full   text-primary gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Medium heading length of the banner</h3>
        <h3 className='text-2xl font-bold mb-4'>03</h3>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nam, dignissimos earum itaque aliquam in voluptatum cum. Vero, iure inventore.</p>
        
        <div>
        </div>
      </div>

      <div className="sticky transition bg-blue-950 text-white top-6  rotate-1 w-full    gap-8  p-4 my-6">
        <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold mb-4'>Medium heading length of the banner</h3>
        <h3 className='text-2xl font-bold mb-4'>04</h3>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nam, dignissimos earum itaque aliquam in voluptatum cum. Vero, iure inventore.</p>
        
        <div>
        </div>
      </div>
      </section>
    </div>
  )
}

export default StickyBanners
