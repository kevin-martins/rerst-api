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
      <section className='flex mb-8'>
        <h1 className='text-3xl mr-2'>Welcome back </h1>
        <span className='text-xl mt-auto'>{props.last_name} {props.first_name}</span>
      </section>
      <h2 className='w-max text-2xl'>
        Informations
        <div className='h-[.5px] bg-white' />
      </h2>
      <section className='max-w-md grid gap-6 mx-auto mt-5'>
        <div className='flex flex-row'>
          <p className='my-auto shrink-0'>niveau actuel du pass: </p>
          <p className='text-lg m-auto px-3'>{passLevel}</p>
          <Link to={`/passes/${props.pass_id}`} className='w-full text-center rounded p-2 bg-blue-500 text-white hover:bg-blue-600'>changer de pass</Link>
        </div>
        <form
          className="max-w-md flex flex-col gap-2"
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
      </section>
    </div>
  )
}

export default UserInfo
