import React, { useState } from 'react'
import Aside from './asides/Aside'
import Main from './main/Main'
import News from './news/News'
import Home from './main/pages/Home'
import Explore from './main/pages/Explore'
import Saved from './main/pages/Saved'
import Create from './main/pages/Create'




const Index = () => {

    const [currentPage, setCurrentPage] = useState("Home");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Render content based on the current page
    const renderContent = () => {
        switch (currentPage) {
            case "Home":
                return <Home />;
            case "Explore":
                return <Explore />;
            case "Create":
                return <Create />;
            case "Saved":
                return <Saved/>;
            default:
                return null;
        }
    };

    return (
        <div className='flex bg-[#667bf0fd] w-full h-[100vh]'>
            <div className='w-[20%]'>
                <Aside handlePageChange={handlePageChange} />
            </div>
            <div className='w-[60%]'>
                <Main renderContent={renderContent} />
            </div>
            <div className='w-[25%]'>
                <News />
            </div>


        </div>
    )
}

export default Index