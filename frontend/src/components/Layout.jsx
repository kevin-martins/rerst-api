import React, { useState } from 'react'
import Home from '../pages/Home';
import { Navigate, Outlet } from 'react-router-dom';
import Nav from './Nav';
import Auth from './Auth'

const Layout = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div className='bg-slate-800 h-screen'>
      {!isLogged
        ? <Auth setIsLogged={setIsLogged} />
        : <>
            <header className='fixed w-full p-8'>
              <Nav setIsLogged={setIsLogged} />
            </header>
            <main className='container w-full mx-auto'>
              <Outlet />
            </main>
          </>
        }
    </div>
  )
}

export default Layout
