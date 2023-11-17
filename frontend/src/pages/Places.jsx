import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Card from '../components/Card';

const Places = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/places')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setPlaces(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  })

  return (
    <>
      {isLoading
        ? <Loading />
        : <ul className='flex flex-wrap gap-5'>
            {places.map(place => (
              <Card
                key={place._id}
                link={`/places/${place._id}`}
                text="Voir la place"
              />
            ))}
          </ul>
        }
    </>
  )
}

export default Places