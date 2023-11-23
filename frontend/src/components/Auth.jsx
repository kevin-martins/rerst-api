import React, { useState } from 'react'
import axios from 'axios'
import Loading from './Loading'
import ToggleSwitch from './ToggleSwitch'

const LogIn = ({ setIsLoading, setIsLogged }) => {
  const [phoneNumber, setPhoneNumber] = useState("0612345001")
  const [password, setPassword] = useState("Pass1234")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('http://localhost:8080/login', { phone_number: phoneNumber, password })
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          setIsLogged(true);
        }
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h1 className='text-xl text-center pb-3'>J'ai déjà un compte</h1>
      <form
        className='flex flex-col gap-4 w-2/3 mx-auto'
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="phone_number">
            Numéro de téléphone
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 rounded text-black outline-none"
          />
          {/* <Link to='/change-password' className='hover:text-yellow-500'>mot de passe oublié</Link> */}
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600">
          Se connecter
        </button>
      </form>
    </>
  )
}

const SignIn = ({ setIsLoading, setIsLogged }) => {
  const [data, setData] = useState({
    "first_name": "Kevin",
    "last_name": "Martins",
    "age": 30,
    "phone_number": "0695886540",
    "password": "secret",
    "password_confirmation": "secret"
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('http://localhost:8080/signin', data)
      .then(res => {
        console.log(res.data)
        if (res.status === 201) {
          setIsLogged(true);
        }
        setIsLoading(false);
      })
      .catch(err => console.log(err))
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
    <>
      <h1 className='text-xl text-center pb-3'>je créer mon compte</h1>
      <form
        className='flex flex-col gap-4 w-2/3 mx-auto'
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="phone_number">
            Numéro de téléphone
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={data.phone_number}
            onChange={handleChange}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">
            Confirmez votre mot de passe
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600">
          créer mon compte
        </button>
      </form>
    </>
  )
}

const Auth = ({ setIsLogged }) => {
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='grid place-content-center h-full'>
      <div className='w-96 py-5 bg-slate-900 text-white rounded-lg'>
        {isLoading && <Loading />}
        <ToggleSwitch setToggle={setToggle} />

        {toggle
          ? <SignIn setIsLoading={setIsLoading} setIsLogged={setIsLogged} />
          : <LogIn setIsLoading={setIsLoading} setIsLogged={setIsLogged} />
        }
      </div>
    </div>
  )
}

export default Auth
