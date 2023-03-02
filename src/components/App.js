import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';

import './css/pokeball.js'
import './css/pokeball.css'

import './css/imports.css'

import './css/app.css'
import './css/header.css'
import './css/picker.css'
import './css/stats.css'
import './css/about.css'
import './css/who.css'

import Header from './Header'

const App = () =>{
    const [pokemonScaler, setPokemonScaler] = useState({});

    return(
        <div>
            {/* <Header /> */}
            
            <Outlet context={{
                pokemonScalerObj: [pokemonScaler,setPokemonScaler]
            }}/>

            <footer>
                <span className="tech-lang">
                    React, Logic, and API calls:</span><br />
                <span id="ian-font">
                    Engineered by Ian</span><br />
                <span className="tech-lang">
                React, CSS:</span><br />
                Developed by <span id="drew-font">Drewford</span>
            </footer>
        </div>
    )
}

export default App;