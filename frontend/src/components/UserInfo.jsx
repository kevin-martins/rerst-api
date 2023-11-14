import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { capitalize, mapUserData } from '../helpers/helpers'

const UserInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [passLevel, setPassLevel] = useState(null)
  const [data, setData] = useState(props);

  useEffect(() => {
    fetch(`http://localhost:4000/passes/${props.pass_id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setPassLevel(res.level);
      })
      .catch((error) => console.log(error));
  })

  const handleSubmit = (e) => {
    setIsLoading(true)
    console.log(data)
    fetch(`http://localhost:4000/users/${props._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        // setData({ ...res })
        console.log(res)
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    setData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div>
      <section className='flex'>
        <h1 className='text-xl mr-1'>Welcome back </h1>
        <span className='mt-auto'>{props.last_name} {props.first_name}</span>
      </section>
      <h2 className='w-max text-lg'>
        Informations
        <div className='h-[.5px] bg-white' />
      </h2>
      <p>
        niveau actuel du pass: {passLevel} <Link to={`/passes/${props.pass_id}`} className='ml-3 inline-block w-48 text-center rounded p-2 bg-blue-500 text-white hover:bg-blue-600'>changer de pass</Link>
      </p>
      <form
        className="max-w-md mx-auto flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        {mapUserData(data).map(prop => (
        <div key={prop.key} className="flex">
          <label htmlFor={prop.key} className="pr-2 my-auto w-28">
            {capitalize(prop.name)}:
          </label>
          <input
            type="text"
            id={prop.key}
            name={prop.key}
            value={prop.value}
            onChange={handleChange}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        ))}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600">
        Modifier
      </button>
    </form>
    </div>
  )
}

export default UserInfo
