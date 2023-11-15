import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Loading from '../components/Loading';
import UserInfo from '../components/UserInfo';

const User = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    _id: "",
    pass_id: "",
    first_name: "",
    last_name: "",
    age: 0,
    phone_number: "",
    address: ""
  })

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    // setData({
    //   address: "789 Route de la Forêt, 31000 Toulouse",
    //   age: 32,
    //   first_name: "Daniel",
    //   last_name: "Taylor",
    //   pass_id: "6549acabf9c0e23ed99107e5",
    //   phone_number: "0612345006",
    //   _id: "6549acacf9c0e23ed99107f1"
    // })
  }, [id])

  return (
    <div className='text-white'>
      {/* userId: {id} */}
      {isLoading 
        ? <Loading />
        : <UserInfo {...data} />
      }
    </div>
  )
}

export default User
