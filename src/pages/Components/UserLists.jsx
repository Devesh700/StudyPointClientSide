import React from 'react'

const UserLists = ({list}) => {
  return (
    
    <div className='w-full bg-slate-100 py-4 px-2'>
      <h3 className='text-2xl font-semibold'>This is Dummy data integrating following and follower soon</h3>
      {/* {list?.length<1?
      <h3 className='text-3xl font-bold text-center'>Empty list</h3>
      :list?.map(item=>
        <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src={item.image?item.image:'.././src/assets/dummyProfile.png'} className='size-10 rounded-full'/>
        <p>{item.fullName}</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      )} */}
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
      <div className='px-6 py-4 flex justify-between items-center bg-white my-2 rounded-md'>
        <img src='.././src/assets/dummyProfile.png' className='size-10 rounded-full'/>
        <p>First follower</p>
        <button className='px-6 py-2 rounded-lg bg-primary-lighter'>view</button>
      </div>
    </div>
  )
}

export default UserLists
