import React, { useState } from 'react'


const Main = ({ renderContent }) => {

return (
    <div className='bg-[#00000094] h-full flex flex-col overflow-y-scroll no-scrollbar'>
      {renderContent()}
    </div>
  )
}

export default Main