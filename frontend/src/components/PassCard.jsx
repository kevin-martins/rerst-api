import axios from 'axios';
import React from 'react'

const PassCard = ({ passId, pass, setIsUpdating, currentLevel, setData }) => {
  const handleClick = () => {
    setIsUpdating(true)
    axios
      .put(`http://localhost:8080/passes/${passId}`, { level: pass.level })
      .then(res => setData(res.data))
      .catch((err) => alert(err.response.message))
      .finally(() => setIsUpdating(false));
  }

  return (
    <li className='relative w-44 pb-2 bg-gray-900 rounded-md text-center'>
      <p
        className='w-full bg-gradient-to-r rounded-t-md from-indigo-500 via-purple-500 to-pink-500 p-2 text-lg'
      >
        {pass.price === 0 ? 'Gratuit' : pass.price + "€"}
      </p>
      <div>
        <p>Débloque l'acces aux</p>
        {pass.items.map((item, i) => (
          <p key={i}>- {item.message}</p>
        ))}
      </div>
      {currentLevel !== pass?.level 
        ? <button
            className='px-5 py-2 mt-2 m-auto bg-blue-500 rounded hover:bg-blue-600'
            onClick={handleClick}
          >
            Choisir
          </button>
        : <div className='absolute bg-white/70 w-44 rounded-md top-0 left-0 mx-auto h-full grid place-items-center border-2 border-green-500'>
            <p className='text-black text-2xl'>Pass actuel</p>
          </div>
      }
    </li>
  )
}

export default PassCard