import React from 'react'
import { Link } from 'react-router-dom'
import Settings from './Settings'

const Nav = ({ setIsLogged }) => {
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
							className='inline-block w-36 py-2 text-center rounded-md bg-black hover:bg-yellow-500 hover:text-yellow-900'
						>
							{nav.title}
						</Link>
				</li>
				))}
        <Settings setIsLogged={setIsLogged} />
			</ul>
    </nav>
  )
}

export default Nav
