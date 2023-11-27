import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ setIsLogged, user }) => {
  return (
    <div className='bg-slate-800'>
      <header className='bg-slate-800 fixed w-full h-content pt-8'>
        <Nav setIsLogged={setIsLogged} user={user} />
      </header>
      <main className='container w-full mx-auto pt-40 pb-12'>
        <Outlet />
      </main>
      <footer>
        <Footer setIsLogged={setIsLogged} />
      </footer>
    </div>
  )
}

export default Layout
