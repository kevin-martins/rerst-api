import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';
import Unauthorized from './Unauthorized';

const PlaceId = ({ user }) => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [place, setPlace] = useState({})
  const [unautorized, setUnautorized] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`http://localhost:8080/users/${user._id}/access`, {
        placeId: id
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setPlace(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setUnautorized(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (unautorized) {
    return alert("Vous n'etes pas autorisé sur cette page");
  }

  return (
    <div className='text-white'>
      <div className='grid grid-rows-4'>
        <p>adresse actuelle: {place.address}</p>
        <p>numéro de téléphone: {place.phone_number}</p>
        <p>niveau du pass minimum requis: {place.required_pass_level}</p>
        <p>age minimum requis: {place.required_age_level}</p>
      </div>
    </div>
  )
}

export default PlaceId
