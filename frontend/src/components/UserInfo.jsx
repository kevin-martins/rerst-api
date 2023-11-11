import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const UserInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState(props.first_name);
  const [lastName, setLastName] = useState(props.last_name);
  const [age, setAge] = useState(props.age);
  const [phoneNumber, setPhoneNumber] = useState(props.phone_number);
  const [address, setAddress] = useState(props.address);

  const handleSubmit = (e) => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      age,
      phone_number: phoneNumber,
      address
    }
    setIsLoading(true)
    fetch(`http://localhost:4000/users/${props._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    setFirstName(e.target.value)
  }

  return (
    <div>
      <section className='flex'>
        <h1 className='text-xl mr-1'>Welcome back </h1>
        <span className='mt-auto'>{props.last_name} {props.first_name}</span>
      </section>
      <h2>Informations</h2>
        <label></label>
        <p>
          pass_id: <Link to={`/passes/${props.pass_id}`} className='inline-block hover:text-yellow-500'>{props.pass_id}</Link>
        </p>
      <form className="max-w-md mx-auto flex flex-col gap-2">
        <div className="flex">
          <label htmlFor="first_name" className="pr-2 my-auto w-28">
            Prénom:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={handleChange}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white">
        Modifier
      </button>
    </form>
    </div>
  )
}

export default UserInfo
