import React from 'react'
import Home from './pages/Home'
import Explore from './pages/Explore'

const Main = () => {
  return (
    <div className='bg-[#00000094] h-full flex flex-col overflow-y-scroll no-scrollbar'>
        {/* <Home/> */}
        <Explore/>
    </div>
  )
}

export default Main