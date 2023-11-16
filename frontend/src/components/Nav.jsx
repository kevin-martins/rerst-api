import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ setIsLogged }) => {
	const navigation = [
		{ title: "Accueil", href: "/" },
		{ title: "Utilisateurs", href: "/users" },
		{ title: "Places", href: "/places" },
	]

  const handleClick = () => {
    setIsLogged(false)
  }

  return (
    <nav className='max-w-5xl bg-slate-900 mx-auto p-3 shadow-lg rounded-lg text-white'>
			<ul className='flex gap-4'>
				{navigation.map(nav => (
					<li
						key={nav.title}
					>
						<Link
							to={nav.href}
							className='inline-block w-36 py-2 text-center rounded-md bg-black hover:bg-yellow-500 hover:text-yellow-900'
						>
							{nav.title}
						</Link>
				</li>
				))}
        <button className='ml-auto px-3' onClick={handleClick}>Log off</button>
			</ul>
    </nav>
  )
}

export default Nav
