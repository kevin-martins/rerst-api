import React from 'react'
import '../styles/clock.css'

const Loading = () => {
  return (
    <div className='absolute w-full h-screen top-0 left-0 bg-gray-800/80 grid place-content-center'>
      <div className="clock">
        <div className="hour-needle" />
        <div className="minute-needle" />
      </div>
    </div>
  )
}

export default Loading
