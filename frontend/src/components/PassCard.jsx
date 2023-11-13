import React, { useState } from 'react'

const PassCard = ({ passId, setUpdate, currentLevel, level }) => {
  const handleClick = () => {
    fetch(`http://localhost:4000/passes/${passId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ level: level }),
    })
      .then((res) => res.json())
      .then(setUpdate(true))
      .catch((error) => console.log(error));
  }

  return (
    <li className={`w-40 p-2 rounded-md text-center border-2 ${currentLevel === level ? 'border-green-500' : ''}`}>
      <p className='p-2 text-lg'>niveau: {level}</p>
      <button
        className='p-2 bg-slate-900 rounded hover:bg-yellow-500 hover:text-yellow-900'
        onClick={handleClick}
      >
        changer de pass
      </button>
    </li>
  )
}

export default PassCard