import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ link, text }) => {
  return (
    <li className='w-96 h-44 bg-slate-900 mx-auto text-white rounded-lg border-2 border-slate-900 hover:border-yellow-600'>
      <Link
        to={link}
        className='inline-block w-full h-full grid place-items-center'
      >
        {text}
      </Link>
    </li>
  )
}

export default Card