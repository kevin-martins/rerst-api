import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const UserAvailablePlaces = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}/places`)
    .then((res) => res.json())
      .then((res) => {
        setPlaces(res);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  })
  return (
    <div className='text-white'>
      {places.length > 0 && <p className='my-2'>{places.length} places disponnible{places.length > 1 ? 's' : ''}</p>}
      {isLoading
        ? <Loading />
        : <ul className='grid grid-flow-row grid-cols-3 gap-4'>
            {places.map(place => (
              <li className='bg-slate-900 text-center p-2 rounded-lg'>
                <p>{place.address}</p>
                <p>{place.required_age_level}</p>
                <p>{place.required_pass_level}</p>
              </li>
            ))}
          </ul>
      }
    </div>
  )
}

export default UserAvailablePlaces
