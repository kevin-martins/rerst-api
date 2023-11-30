import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Settings from './Settings'
import '../styles/menuToggle.css';

const Nav = ({ setIsLogged, user }) => {
  const [openMenu, setOpenMenu] = useState(false);
	const navigation = [
		{ title: "Accueil", href: "/" },
		{ title: "Places", href: "/places" },
	]

  const phoneNavigation = [
    { title: "Accueil", href: "/", onClick: () => { setOpenMenu(false) } },
    { title: "Places", href: "/places", onClick: () => { setOpenMenu(false) } },
		{ title: "Profil", href: "/profile", onClick: () => { setOpenMenu(false) } },
    { title: "Mon Pass", href: `/passes/${user.pass_id}`, onClick: () => { setOpenMenu(false) } },
  ]

  const handleClick = () => {
    setOpenMenu(prev => !prev);
  }

  return (
    <>
      <div className='hidden sm:block fixed w-full z-50'>
        <nav className='flex md:max-w-3xl max-w-xl bg-slate-900 p-3 rounded-lg text-white mt-3 mx-auto'>
          <ul className='flex gap-4'>
            {navigation.map(nav => (
              <li
                key={nav.title}
              >
                <Link
                  to={nav.href}
                  className='inline-block w-36 text-center bg-blue-500 py-2 rounded hover:bg-blue-600'
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
          <Settings setIsLogged={setIsLogged} user={user} />
        </nav>
      </div>
      <div className='relative sm:hidden flex'>
        <button
          className={`absolute open-main-nav ${openMenu ? 'is-open' : ''}`}
          onClick={handleClick}
        >
          <span className="relative burger bg-white"></span>
          <span className="burger-text text-white">{openMenu ? 'BACK' : 'MENU'}</span>
        </button>
        <nav
          className={`main-nav w-full h-screen text-white ${openMenu ? 'is-open' : ''}`}
          id="main-nav"
        >
          <ul>
            {phoneNavigation.map(nav => (
              <li
                key={nav.title}
              >
                <Link
                  to={nav.href}
                  className='hover:text-gray-400'
                  onClick={nav.onClick}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
            <li>
              <button
                className='hover:text-gray-400'
                onClick={() => {
                  setOpenMenu(false);
                  setIsLogged(false);
                }}
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Nav
