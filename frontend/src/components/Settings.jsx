import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Settings = ({ setIsLogged }) => {
  const [activated, setActivated] = useState(false);

  return (
    <div className='relative ml-auto my-auto px-3'>
      <button
        onClick={() => setActivated(prev => !prev)}
      >
        Settings
      </button>
      {activated &&
        <div className='absolute w-44 flex flex-col bg-gray-900 border-2 rounded-lg border-yellow-600'>
          <Link to="/profile">
            profil
          </Link>
          <button className='' onClick={() => setIsLogged(false)}>Log off</button>
        </div>
      }
    </div>
  )
}

export default Settings
