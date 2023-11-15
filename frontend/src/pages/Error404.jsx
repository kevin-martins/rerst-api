import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className='h-screen text-white w-full grid place-items-center'>
      <div>
        <h1 className='text-3xl'>Page introuvable</h1>
        <p>'{window.location.pathname}' n'a pas l'air d'être une page valide.</p>
        <Link to={'/'} className="block bg-slate-900 px-6 py-3 hover:bg-yellow-600 hover:text-yellow-900 mt-1 rounded-lg text-center">retour à l'accueil</Link>
      </div>
    </div>
  )
}

export default Error404
