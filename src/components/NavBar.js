import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<nav className='navbar px-3 navbar-dark bg-dark navbar-expand-lg'>
			<Link to='/' className='navbar-brand'>SentenceBuilder</Link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
				<ul className='navbar-nav mr-auto'>
					<li className='nav-item'>
						<Link to='/' className='nav-link'>Build A Sentence</Link>
					</li>
					<li className='nav-item'>
						<Link to='/sentences' className='nav-link'>Show All Sentences Ever!</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar