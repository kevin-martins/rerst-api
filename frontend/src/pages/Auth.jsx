import React, { useState } from 'react'

const Auth = () => {
  const [userName, setUserName] = useState("Emilie")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    
  }

  return (
    <div className='w-96 py-5 bg-slate-900 text-white rounded-lg mx-auto'>
      <h1 className='text-xl text-center pb-3'>Connexion</h1>
      <form
        className='flex flex-col gap-4 w-2/3 mx-auto'
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="username" className="">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userName}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 rounded text-black outline-none"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600">
          Envoyer
        </button>
      </form>
    </div>
  )
}

export default Auth
