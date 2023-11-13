import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = (props) => {
  console.log(props._id)
  return (
    <li className='w-96 h-44 bg-slate-900 mx-auto text-white rounded-lg border-2 border-slate-900 hover:border-yellow-600'>
      <Link
        to={`/users/${props._id}`}
        className='inline-block w-full h-full grid place-items-center'
      >
        {props.first_name}{' '}{props.last_name}
      </Link>
    </li>
  )
}

export default UserCard