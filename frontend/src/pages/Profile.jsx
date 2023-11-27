import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { Link } from 'react-router-dom';
import { profileFormData } from '../static/profile';
import Loading from '../components/Loading';

const Profile = ({ user, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passLevel, setPassLevel] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/passes/${user.pass_id}`)
      .then(res => res.status === 200 && setPassLevel(res.data.level))
      .catch(err => alert(err.response.message))
      .finally(() => setIsLoading(false));
  }, [user]);

  const onSubmit = (data) => {
    setIsLoading(true)
    axios
      .put(`http://localhost:8080/users/${user._id}`, data)
      .then(res => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch(err => alert(err.response.message))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='text-white'>
      <section className='flex mb-3'>
        <h1 className='text-3xl mr-2'>Welcome back </h1>
        <span className='text-xl mt-auto'>{user.last_name} {user.first_name}</span>
      </section>
      <Link
        to={`/users/${user._id}/places`}
        className='mb-5 inline-block text-center rounded py-3 px-6 bg-blue-500 text-white hover:bg-blue-600'
      >
        voir les places accessibles
      </Link>
      <h2 className='w-max text-2xl'>
        Informations personnelles
        <div className='h-[.5px] bg-white' />
      </h2>
      <section className='max-w-md grid gap-6 mx-auto mt-5'>
        <div className='flex flex-row'>
          <p className='my-auto shrink-0'>niveau actuel du pass: </p>
          <p className='text-lg m-auto px-3'>{passLevel}</p>
          <Link
            to={`/passes/${user.pass_id}`} 
            className='w-full text-center rounded p-2 bg-blue-500 text-white hover:bg-blue-600'
          >
            Voir mon pass
          </Link>
        </div>
        <Form onSubmit={onSubmit} formData={profileFormData} defaultValues={user} />
      </section>
    </div>
  )
}

export default Profile
