import React from 'react'
import { Link } from 'react-router-dom'
import Settings from './Settings'

const Nav = ({ setIsLogged, user }) => {
	const navigation = [
		{ title: "Accueil", href: "/" },
		{ title: "Places", href: "/places" },
	]

  return (
    <nav className='max-w-5xl bg-slate-900 mx-auto p-3 shadow-lg rounded-lg text-white'>
			<ul className='flex gap-4'>
				{navigation.map(nav => (
					<li
						key={nav.title}
					>
						<Link
							to={nav.href}
							className='inline-block w-36 text-center bg-blue-500 py-2 rounded hover:bg-blue-600'
						>
							{nav.title}
						</Link>
				</li>
				))}
        <Settings setIsLogged={setIsLogged} user={user} />
			</ul>
    </nav>
  )
}

export default Nav
