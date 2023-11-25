import React, { useState } from 'react'
import Home from '../pages/Home';
import { Navigate, Outlet } from 'react-router-dom';
import Nav from './Nav';
import Auth from './Auth'
import Form from './Form'

const Layout = ({ setIsLogged }) => {
  return (
    <div className='bg-slate-800 h-screen'>
      <header className='fixed w-full p-8'>
        <Nav setIsLogged={setIsLogged} />
      </header>
      <main className='container w-full mx-auto py-44'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
