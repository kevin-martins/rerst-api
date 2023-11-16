import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Card from '../components/Card'

const Users = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/users`, {})
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [])
  return (
    <>
      {isLoading
        ? <Loading />
        : <ul className='flex flex-wrap gap-2'>
            {users.map(user => (
              <Card
                key={user._id}
                link={`/users/${user._id}`}
                text={`${user.first_name} ${user.last_name}`}
              />
            ))}
          </ul>
      }
    </>
  )
}

export default Users