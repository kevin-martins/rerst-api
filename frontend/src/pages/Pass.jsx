import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Loading from '../components/Loading';

const Pass = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`http://localhost:4000/passes/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <div className='text-white'>
      <p>pass_id: {id}</p>
      {isLoading
        ? <Loading />
        : <p>niveau: {data?.level}</p>
      }
    </div>
  )
}

export default Pass
