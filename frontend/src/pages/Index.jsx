import React from 'react'
import Aside from './asides/Aside'
import Main from './main/Main'
import News from './news/News'

const Index = () => {
    return (
        <div className='flex bg-bg w-full h-[100vh]'>
            <div className='w-[20%]'>
                <Aside />
            </div>
            <div className='w-[50%]'>
                <Main/>
            </div>
            <div className='w-[30%]'>
                <News/>
            </div>

        </div>
    )
}

export default Index