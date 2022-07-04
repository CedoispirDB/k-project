import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

export default function Navbar({ name, signedIn }) {

    const [click, setClick] = useState(false);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    let title = "Profile";

    if (name !== "init_mate") {
        if (signedIn) {
            title = name;
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        K-Project
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/search' className='nav-links' onClick={closeMobileMenu}>
                                Search
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/watched' className='nav-links' onClick={closeMobileMenu}>
                                Watched
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/watching' className='nav-links' onClick={closeMobileMenu}>
                                Watching
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/want-to-watch' className='nav-links' onClick={closeMobileMenu}>
                                Want to watch
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                                {title}
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}
