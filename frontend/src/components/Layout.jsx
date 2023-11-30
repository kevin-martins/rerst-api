import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ setIsLogged, user }) => {
  return (
    <div className='bg-slate-800'>
      <header>
        <Nav setIsLogged={setIsLogged} user={user} />
      </header>
      <main className='max-w-5xl mx-auto pt-40 pb-12 px-2'>
        <Outlet />
      </main>
      <footer>
        <Footer setIsLogged={setIsLogged} />
      </footer>
    </div>
  )
}

export default Layout
