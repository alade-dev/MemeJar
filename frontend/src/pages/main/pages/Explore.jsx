import React from 'react'
import { memes } from '../../../contants'

const Explore = () => {
  return (
    <div className='px-10 py-4'>
      {memes.map((meme)=>{
        return(
          <div key={meme.id} className='rounded-md p-2 bg-primary outline-none border-none border-primary relative mb-6'>
            <div className='flex items-center gap-2 '>
              <img src={meme.img} alt="" width={34} height={34} className='rounded-full object-contain' />
              <h3 className='font-semibold text-gray-100'>Concepify</h3>
            </div>
            <p className='text-sm leading-8 text-gray-300'>{meme.description}</p>
            <img src={meme.meme} alt="" className='w-[100%] ' />
            <img src={meme.like} alt="" width={20} height={20} className='ml-auto my-2 cursor-pointer'/>

          </div>

        )
      })}
    </div>
  )
}

export default Explore