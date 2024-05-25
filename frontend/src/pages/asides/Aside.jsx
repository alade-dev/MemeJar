import React from 'react'
import { AsideBar } from '../../contants'
import { FaHome, FaLongArrowAltUp, FaSignOutAlt, } from 'react-icons/fa'

const Aside = () => {
    return (
        <div className='bg-primary text-white h-full p-6 relative'>
            <div className='leading-none mb-6'>
                <h1 className='font-bold text-center text-3xl text-secondary '> MemeJar</h1>
                <p className='text-sm font-light text-center text-blue-50'> ...the Best Meme Social Media</p>
            </div>

            <div className=''>
                {AsideBar.map((aside) => {
                    return (

                        
                        <ul key={aside.id} className='p-2'>
                           <li className=' rounded-lg px-2 py-3 font-semibold text-lg text-white-200 hover:bg-[#a3b0f7fd] hover:text-primary cursor-pointer flex gap-3 items-center'>
                                <img src={aside.icon} alt="icon.alt" width={24} height={24}/>
                                <a href="" className=''>{aside.title}</a>
                            </li>
                        </ul>
                    )
                })}
            </div>

            <a href="/login" className='absolute bottom-5 right-[50%] flex items-center ' >
                <FaSignOutAlt />
                <p className='pl-2'>Logout</p>
            </a>
        </div>
    )
}

export default Aside