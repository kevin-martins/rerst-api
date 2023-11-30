import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ setIsLogged }) => {
  return (
    <div className='text-white'>
      <div className='pt-2 bg-gray-900 text-center pb-5'>
        <div className='w-2/3 max-w-3xl mx-auto'>
          <div className='h-[.5px] bg-white' />
          <div className='max-w-2xl mx-auto my-4'>
            <ul className='flex flex-row gap-2'>
              <li className='mx-auto'>
                <Link
                  to='/home'
                  className='inline-block'
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
        <div className='w-1/3 mx-auto h-[.5px] bg-white my-2' />
        &copy; Tout droits réservés
      </div>
    </div>
  )
}

export default Footer
