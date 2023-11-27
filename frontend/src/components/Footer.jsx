import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ setIsLogged }) => {
  return (
    <div className='text-white'>
      <div className='pt-2 bg-gray-900 text-center pb-5'>
        <div className='md:w-2/3 mx-auto'>
          <div className='h-[.5px] bg-white' />
          <div className='grid grid-cols-1 my-4'>
            <div className='mx-auto w-2/3'>
              <ul className='flex flex-row gap-2 ml-3'>
                <li className='mx-auto'>
                  <Link
                    to='/home'
                    className=''
                  >
                    Accueil
                  </Link>
                </li>
                <li className='mx-auto'>
                  <Link
                    to='/profile'
                    className=''
                  >
                    Profil
                  </Link>
                </li>
                <li className='mx-auto'>
                  <button
                    className=''
                    onClick={() => setIsLogged(false)}
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='md:w-1/3 mx-auto h-[.5px] bg-white my-2' />
        &copy; Tout droits réservés
      </div>
    </div>
  )
}

export default Footer
