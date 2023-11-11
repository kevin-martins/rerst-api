import React from 'react'
import Home from '../pages/Home';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = () => {
  return (
    <div className='bg-slate-800 h-screen'>
      <header className='w-full p-8'>
        <Nav />
      </header>
      <main className='container mx-auto'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
