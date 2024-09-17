import React from 'react'
import CreateYourJourney from './Components/CreateYourJourney'

const Home = () => {
  return (
    <div className='w-full relative h-55vh flex justify-between py-4'>
        <img src='src/assets/hero.png' 
        className='absolute top-0 h-full w-full'/>
        <div 
        className='z-10 absolute custom-left-10 custom-flexi-top-20 lg:w-3/12 md:w-4/12 w-1/2'>
        <h3 
        className='font-semibold md:text-3xl text-lg'>Master Web Development with us
        </h3>
        <h3 
        className='font-semibold md:text-3xl text-lg'>Learn practice and
        </h3>
        <h3 
        className='font-semibold md:text-3xl text-lg'>Excel
        </h3>
        <button 
        className=' bg-primary text-white sm:py-4 sm:px-8 py-1 px-5 rounded-ss-3xl rounded-ee-3xl lg:mt-16 md:mt-8 sm:mt-4 mt-1 md:text-lg text-base '
        >Get Started
        </button>
        </div>
        <div className='absolute right-6 h-full'>
          <CreateYourJourney/>
        </div>
        
      
    </div>
  )
}

export default Home
