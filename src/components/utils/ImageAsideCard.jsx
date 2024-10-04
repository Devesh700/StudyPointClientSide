import React, { useState } from 'react'

const ImageAsideCard = ({img="src/assets/hero.webp",features=["","",""]}) => {
    const [activeFeature,setactiveFeature]=useState("f1");
    const handleMouseOver=(str)=>{
        setactiveFeature(str);
    }
  return (
    <section className='lg:w-10/12 md:w-11/12 w-full mx-auto p-4 flex justify-between items-stretch flex-wrap my-6' dir='ltr'>
        <aside className='custom-flexw-2-parts min-w-80'>
            <img src={img} className='w-full h-full ' />
        </aside>

        <aside className='custom-flexw-2-parts min-w-80'>
            {features?.map((elem,index)=>(
                <div className={`px-4 transition my-4 ${activeFeature===index?" border-s-2 border-black":"border-0"}`}
            onMouseOver={()=>handleMouseOver(index)}>
                <h3 className='text-2xl font-semibold mb-4'> #{index+1}</h3>
                <p className='text-base'>{elem!==""?elem:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem recusandae modi voluptatibus, qui dolores magnam pariatur? Ad blanditiis numquam molestiae illum facilis ab ullam enim ipsum, inventore reiciendis, non nobis."}</p>
            </div>    
            ))}
        </aside>
    </section>
  )
}

export default ImageAsideCard
