import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const UserAvailablePlaces = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}/places`)
    .then((res) => res.json())
      .then((res) => {
        setPlaces(res);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  })
  return (
    <div>
      {isLoading
        ? <Loading />
        : <ul className='grid grid-flow-row grid-cols-3 gap-4 text-white'>
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
