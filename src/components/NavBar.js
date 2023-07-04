import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
			<Link to='/' className='navbar-brand'>SentenceBuilder</Link>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav mr-auto'>
					<li className='navbar-item'>
						<Link to='/' className='nav-link'>Build A Sentence</Link>
					</li>
					<li className='navbar-item'>
						<Link to='/sentences' className='nav-link'>Show All Sentences Ever!</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar