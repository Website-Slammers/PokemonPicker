import {useEffect, useState}from 'react';
import { fetchPokemonData } from '../api/pokemonFetch';

const Who = () =>{
    const [whoPokemon, setWhoPokemon] = useState({});
    const [toggle, setToggle ] = useState(false)
    let pokemonId = 1;

    async function yeahThisFunctionIsSupposedToBeAsync(){
        try{
            const pokemonData = await fetchPokemonData(pokemonId)
            setWhoPokemon(pokemonData);
        }catch(error){
            console.log(error);
        }
    }

    useEffect (()=>{
        pokemonId=Math.ceil(Math.random()*151)
    },[])

    useEffect (()=>{
        yeahThisFunctionIsSupposedToBeAsync(pokemonId);
        console.log(whoPokemon)
    },[pokemonId])

    return(
        <div>

        <h2>WHO'S THAT FAT DUMPSTER ASS POKEMON?!</h2>

        {!Object.keys(whoPokemon).length?<p>fetch failed</p>:
            Object.keys(whoPokemon).length&&Object.keys(whoPokemon.sprites).length?

            <div className ="who-img-container">
                <img className="who-img--background" src="https://i.imgur.com/rqos3AI.png" />
                <img className="who-img" src={whoPokemon.sprites.other['official-artwork'].front_default}/>
            </div>:
            <p>who-img--err....</p>
        }
        </div>
    )
}

export default Who;