import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <div id="nav-return">
            <nav id="nav-main">
                
                <Link to="/" className="nav-title">
                    <img className="nav-img" src="https://i.imgur.com/sPIZ9wJ.png" /></Link>
                
                <Link to="/picker" className="nav-title">
                    <img className="nav-img" src="https://i.imgur.com/kuOxyPY.png" /></Link>
                
                <Link to="/stats" className="nav-title">
                    <img className="nav-img" src="https://i.imgur.com/tH08SWh.png" /></Link>
                
                <Link to="/about" className="nav-title">
                    <img className="nav-img" src="https://i.imgur.com/q71MGm4.png" /></Link>
            </nav>
        </div>
    )
}

export default Navbar;