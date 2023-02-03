import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';

import './pokeball.js'
import './style.css'
import './animations.css'

const App = () =>{
    const [pokemonScaler, setPokemonScaler] = useState({});

    return(
        <div>
            <header>
                {/* <h1>Pokemon Picker!</h1> */}
                <img id="head-img" src="https://i.imgur.com/xotOQCg.png"></img>
            </header>
            <Navbar />
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