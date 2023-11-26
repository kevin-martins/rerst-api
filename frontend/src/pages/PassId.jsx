import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Loading from '../components/Loading';
import PassCard from '../components/PassCard';
import { changeDate } from '../helpers/helpers';
import { staticPassesOffers } from '../static/passes';
import axios from 'axios';

const PassId = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/passes/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => alert(err.response.message))
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(false);
      });
  }, [isUpdating, id]);

  if (isLoading || isUpdating) {
    return <Loading />
  }

  return (
    <div className='text-white'>
      <p>Niveau actuel de mon pass: {data?.level}</p>
      <p>Mis à jour le {data?.updated_at && changeDate(data?.updated_at)}</p>
      <p>Créer le {data?.created_at && changeDate(data?.created_at)}</p>
      <div className='grid justify-items-center'>
        <ul className='flex flex-wrap gap-5 mt-8 text-center'>
          {staticPassesOffers.map(pass => (
            <PassCard key={pass.level} passId={id} pass={pass} setIsUpdating={setIsUpdating} currentLevel={data?.level} setData={setData} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PassId