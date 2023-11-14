import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Places = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [places, setPlaces] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/places')
    .then((res) => res.json())
      .then((res) => {
        setPlaces(res);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  })
  return (
    <ul className='flex flex-wrap gap-5'>
      {isLoading
        ? <Loading />
        : places.map(place => (
        <li className='w-96 h-44 bg-slate-900 mx-auto text-white rounded-lg border-2 border-slate-900 hover:border-yellow-600'>
          <Link
            to={`/places/${place._id}`}
            className='inline-block w-full h-full grid place-items-center'
          >
            Voir la place
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Places