import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="picker">Picker</Link>
                <Link to="stats">Stats</Link>
                <Link to="about">About</Link>
            </nav>
        </div>
    )
}

export default Navbar;