import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Loading from '../components/Loading';
import PassCard from '../components/PassCard';
import { changeDate } from '../helpers/helpers';

const PassId = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`http://localhost:8080/passes/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
        setUpdate(false);
      })
      .catch((error) => console.log(error));
  }, [update, id])

  return (
    <div className='text-white'>
      <p>pass_id: {id}</p>
      <p>{data?.level}</p>
      <p>Mis à jour le {data?.updated_at && changeDate(data?.updated_at)}</p>
      <p>Créer le {data?.created_at && changeDate(data?.created_at)}</p>
      <div className='grid justify-items-center'>
        {(isLoading || update)
          ? <Loading />
          : <ul className='flex flex-wrap gap-5 mt-8 text-center'>
              {[1, 2, 3, 4, 5].map(level => (
                <PassCard key={level} passId={id} setUpdate={setUpdate} currentLevel={data?.level} level={level} />
              ))}
            </ul>
        }
      </div>
    </div>
  )
}

export default PassId