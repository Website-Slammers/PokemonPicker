import React, { useEffect } from "react";
import {useOutletContext} from "react-router-dom";


const Stats = ()=>{
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext();
    useEffect(()=>{
        if(localStorage.getItem("pokemonObj")){
            const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            setPokemonScaler(pokemonObj);
        }
        console.log(pokemonScaler);
    },[])

//display pokemon in terms of who has won the most.
    return(
        <div>
            <h1>Stats</h1>
            <div className="pokeContainer">
            {pokemonScaler?
            Object.keys(pokemonScaler).map((pokemon)=>{
                console.log(pokemon)
                return(
                    <div className= "pokebox">
                        <div>{pokemon}</div>
                        <div>{pokemonScaler[pokemon].id}</div>
                        <p>Wins:{pokemonScaler[pokemon].wins}</p>
                        <p>Losses:{pokemonScaler[pokemon].losses}</p>
                        {pokemonScaler[pokemon].types[1]?
                            <p>{pokemonScaler[pokemon].types[0].type.name}/{pokemonScaler[pokemon].types[1].type.name}</p>
                            :<p>{pokemonScaler[pokemon].types[0].type.name}</p>}
                        {<img className="pokeImg" src={pokemonScaler[pokemon].image} alt="pokemon img"/>}
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