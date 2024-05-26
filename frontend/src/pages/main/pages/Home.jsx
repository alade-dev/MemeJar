import React from 'react'

const Home = () => {
    return (
        <div className='grid items-center place-content-center h-full'>
            <div>
                <h1 className='text-6xl  text-center text-white font-bold '>Welcome <br /> to <br /> <span className='text-primary'> MemeJar </span></h1>
                <p className='text-sm font-thin text-center text-white italic'>...best Meme Social Media Network</p>
                <div className='text-center'>

                    <button className='text-white-200 py-2 px-4 my-3 mx-auto bg-primary rounded-lg text-xl hover:bg-secondary hover:text-white-200'>Connect Wallet </button>
                </div>
            </div>
        </div>
    )
}

export default Home