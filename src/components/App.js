import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';

const App = () =>{
    const [pokemonScaler, setPokemonScaler] = useState({});

    return(
        <div>
            <header>
                <h1>Pokemon Picker!</h1>
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