import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Settings = ({ setIsLogged }) => {
  const [activated, setActivated] = useState(false);

  return (
    <div className='relative ml-auto my-auto'>
      <button
        onClick={() => setActivated(prev => !prev)}
        className='bg-blue-500 px-5 py-2 rounded hover:bg-blue-600'
      >
        Settings
      </button>
      {activated &&
        <div className='absolute top-14 px-5 py-2 flex flex-col bg-gray-900 rounded-lg'>
          <Link
            to="/profile"
            className='hover:text-gray-300'
          >
            Profil
          </Link>
          <button
            className='hover:text-gray-300'
            onClick={() => setIsLogged(false)}
          >
            Déconnexion
          </button>
        </div>
      }
    </div>
  )
}

export default Settings
