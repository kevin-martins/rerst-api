import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import axios from 'axios'

const UserAvailablePlaces = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}/places`)
      .then(res => setPlaces(res.data))
      .catch(err => alert(err.response.message))
      .finally(() => setIsLoading(false));
  })
  return (
    <div className='text-white'>
      {places.length > 0 && <p className='my-2'>{places.length} places disponnible{places.length > 1 ? 's' : ''}</p>}
      {isLoading
        ? <Loading />
        : <ul className='flex flex-wrap gap-5'>
            {places.map(place => (
              <li className='sm:w-72 w-full bg-slate-900 mx-auto text-white rounded-lg text-center py-2'>
                <p>{place.phone_number}</p>
                <p>{place.address}</p>
                <div className='flex gap-x-2'>
                  <p className='ml-auto'>Age requis: </p>
                  <p className='text-green-500 mr-auto'>{place.required_age_level}</p>
                  <p className='ml-auto'>Pass requis: </p>
                  <p className='text-green-500 mr-auto'>{place.required_pass_level}</p>
                </div>
              </li>
            ))}
          </ul>
      }
    </div>
  )
}

export default UserAvailablePlaces
