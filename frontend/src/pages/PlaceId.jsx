import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const PlaceId = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [place, setPlace] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:4000/places/${id}`)
    .then((res) => res.json())
      .then((res) => {
        setPlace(res);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  })

  return (
    <div className='text-white'>
      {isLoading
        ? <Loading />
        : <div className='grid grid-rows-4'>
            <p>adresse actuelle: {place.address}</p>
            <p>numéro de téléphone: {place.phone_number}</p>
            <p>niveau du pass minimum requis: {place.required_pass_level}</p>
            <p>age minimum requis: {place.required_age_level}</p>
          </div>
      }
    </div>
  )
}

export default PlaceId
