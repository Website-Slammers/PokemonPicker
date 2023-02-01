import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <div id="nav-return">
            <nav id="nav-main">
                <Link to="/" className="nav-title">Home</Link>
                <Link to="picker" className="nav-title">Picker</Link>
                <Link to="stats" className="nav-title">Stats</Link>
                <Link to="about" className="nav-title">About</Link>
            </nav>
        </div>
    )
}

export default Navbar;