import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className='bg-gray-800 text-white w-full grid place-items-center'>
      <div>
        <h1 className='text-3xl'>Page non autorisé</h1>
        <p>Vous n'etes pas autorisé à acceder à cette page</p>
        <Link to={'/'} className="block bg-slate-900 px-6 py-3 hover:bg-yellow-600 hover:text-yellow-900 mt-1 rounded-lg text-center">retour à l'accueil</Link>
      </div>
    </div>
  )
}

export default Unauthorized
