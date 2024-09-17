import React from 'react'

const TiltedBanner = ({heading,description,button={text:"",link:""}}) => {
  return (
    // <div className='relative  container mx-auto p-4 pt-10 lg:w-10/12 md:w-11/12 sm:w-full   my-12 h-48 hover:scale-105'>
      /* <div className="absolute opacity-95 bg-purple-950 top-0 left-0  w-full h-44"></div> */
      <div className="container mx-auto my-12 lg:w-10/12 md:w-11/12 sm:w-11/12 transition bg-purple-200 top-0 left-0  w-full px-4 py-10 flex justify-center items-center text-primary gap-8 hover:bg-blue-950 hover:text-white ">
        <div>
        <h3 className='text-2xl font-bold mb-4'>{heading?heading:"Medium heading length of the banner"}</h3>
        <p>{description?description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nam, dignissimos earum itaque aliquam in voluptatum cum. Vero, iure inventore."}</p>
        </div>
        <div>
            <button className='btn px-8 py-4 rounded-lg font-semibold text-white bg-primary w-max'>{button?.text?button.text:"Let's Begin"}</button>
        </div>
      </div>
    // </div>
  )
}

export default TiltedBanner
