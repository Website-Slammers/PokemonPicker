import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';

import './pokeball.js'
import './style.css'

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
                Footer
            </footer>
        </div>
    )
}

export default App;