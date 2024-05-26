import React from 'react'

const Create = () => {
  return (
    <div>
      <h1 className='text-white font-semibold text-3xl text-center my-10'>
        Post a Meme
      </h1>

      <form action="" className='text-center bg-slate-50 w-3/4 p-7 rounded-xl m-auto'>
        <div className='text-xl text-black'>
          <input type="file" name='upload' src="" alt="" />
        </div>

        <div className='text-xl text-black'>
          <textarea name="" id="" cols="40" rows="5" placeholder='Description' className=' bg-[#a8b8e4]  my-3 placeholder:text-white p-3 text-white-200 outline-none border-none rounded-xl '></textarea>
        </div>

        <div className='bg-[#667bf0fd] text-white rounded-full p-3 text-center font-bold mt-12 hover:bg-[#a3b0f7fd] cursor-pointer'>
          <button className='text-xl'> Create Post </button>
        </div>

      </form>

    </div>
  )
}

export default Create