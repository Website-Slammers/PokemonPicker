import React, { useEffect,useState } from "react";
import {useOutletContext} from "react-router-dom";


const Stats = ()=>{
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext();
    const [sortedPokemon, setSortedPokemon] = useState([]);
    let pokemonArray = [];

    useEffect(()=>{
        if(localStorage.getItem("pokemonObj")){
            const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            setPokemonScaler(pokemonObj);
            pokemonArray = Object.entries(pokemonObj);
            pokemonWinSorter (pokemonArray)
            console.log(pokemonArray); 

        }
        setSortedPokemon(pokemonArray);

    },[])

    const pokemonWinSorter =(array)=>{
        let sortedArray = array.sort((b, a) =>a[1].netScore - b[1].netScore);
        //wins //id number
        console.log(sortedArray);
        return sortedArray
    }

//display pokemon in terms of who has won the most.
    return(
        <div>
            <h1 id="stats-head">S t a t s</h1>
            
            <div className="pokeContainer">
            {sortedPokemon?
            sortedPokemon.map((pokemon)=>{
                return(
                    <div className= "pokebox">
                        <div className = "pokeText">
                        <div className = "pokeTitle">{pokemon[1].name}</div>
                        <div>{pokemon[1].id}</div>
                        <p>Net Score:{pokemon[1].netScore}</p>
                        <p>Wins:{pokemon[1].wins}</p>
                        <p>Losses:{pokemon[1].losses}</p>
                        
                        {pokemon[1].types[1]?
                            <p>{pokemon[1].types[0].type.name}/{pokemon[1].types[1].type.name}</p>
                            :<p>{pokemon[1].types[0].type.name}</p>}
                        </div>
                        {<img className="pokeImg" src={pokemon[1].image} alt="pokemon img"/>}
                        
                    </div>
                )
            })
            : <div>no data made it through</div>
            }
            </div>
        </div>
    )
}

export default Stats;