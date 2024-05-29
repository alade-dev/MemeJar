import React, { useState } from 'react'


const Main = ({ renderContent }) => {

return (
    <div className='bg-[#040608d9] border-white border-x h-full flex flex-col overflow-y-scroll no-scrollbar'>
      {renderContent()}
    </div>
  )
}

export default Main