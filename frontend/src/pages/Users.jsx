import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import UserCard from '../components/UserCard'

const Users = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/users`, {})
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [])
  return (
    <div className=''>
      {isLoading 
        ? <Loading />
        : <ul className='flex flex-wrap gap-2'>
            {data.map(userData => (
              <UserCard {...userData} />
            ))}
          </ul>
      }
    </div>
  )
}

export default Users