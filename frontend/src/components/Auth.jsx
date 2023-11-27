import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import ToggleSwitch from './ToggleSwitch';
import Form from './Form';
import { logInFormData, signInFormData } from '../static/auth';

const LogIn = ({ setIsLoading, setIsLogged, setUser }) => {
  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post('http://localhost:8080/login', data)
      .then(res => {
        if (res.status === 200) {
          setIsLogged(true);
          setUser(res.data);
        }
      })
      .catch(err => alert(err.response.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <h1 className='text-xl text-center pb-3'>J'ai déjà un compte</h1>
      <Form onSubmit={onSubmit} formData={logInFormData} defaultValues={{}} />
    </>
  )
}

const SignIn = ({ setIsLoading, setIsLogged, setUser }) => {
  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post('http://localhost:8080/signin', {
        ...data,
      })
      .then(res => {
        if (res.status === 201) {
          setUser(res.data)
          setIsLogged(true);
        }
      })
      .catch(err => alert(err.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <h1 className='text-xl text-center pb-3'>je créer mon compte</h1>
      <Form onSubmit={onSubmit} formData={signInFormData} defaultValues={{}} />
    </>
  )
}

const Auth = ({ setIsLogged, setUser }) => {
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='grid place-content-center bg-gray-800 h-full h-screen'>
      <div className='sm:w-96 py-5 bg-slate-900 text-white rounded-lg mx-auto px-6'>
        {isLoading && <Loading />}
        <ToggleSwitch setToggle={setToggle} />

        {toggle
          ? <SignIn setIsLoading={setIsLoading} setIsLogged={setIsLogged} setUser={setUser} />
          : <LogIn setIsLoading={setIsLoading} setIsLogged={setIsLogged} setUser={setUser} />
        }
      </div>
    </div>
  )
}

export default Auth
