import React from 'react'

const PassCard = ({ pass, setIsUpdating, currentLevel }) => {
  const handleClick = () => {
    fetch(`http://localhost:8080/passes/${pass._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ level: pass?.level }),
    })
      .then((res) => res.json())
      .then(setIsUpdating(true))
      .catch((error) => console.log(error));
  }

  return (
    <li className='relative w-44 pb-2 bg-gray-900 rounded-md text-center'>
      <p
        className='w-full bg-gradient-to-r rounded-t-md from-indigo-500 via-purple-500 to-pink-500 p-2 text-lg'
      >
        {pass.price === 0 ? 'Free' : pass.price + "€"}
      </p>
      <div>
        <p>Débloque l'acces aux</p>
        {pass.items.map((item, i) => (
          <p key={i}>- {item.message}</p>
        ))}
      </div>
      {currentLevel !== pass?.level 
        ? <button
            className='p-2 mt-2 m-auto bg-blue-500 rounded hover:bg-blue-600'
            onClick={handleClick}
          >
            changer de pass
          </button>
        : <div className='absolute bg-white/70 w-44 rounded-md top-0 left-0 mx-auto h-full grid place-items-center border-2 border-green-500'>
            <p className='text-black text-2xl'>Pass actuel</p>
          </div>
      }
    </li>
  )
}

export default PassCard