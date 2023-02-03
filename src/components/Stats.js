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
            // pokemonArray = pokemonTypeSorter(pokemonArray, ["fire"])
            pokemonArray = pokemonWinSorter(pokemonArray);
        }
        setSortedPokemon(pokemonArray);

    },[])

    const pokemonTypeSorter = (array,searchTypes)=>{
        let filteredArray = []
        for(let i=0;i<searchTypes.length;i++){
            filteredArray = array.filter((pokemon) =>{
                if(pokemon[1].types[1]){
                    if(searchTypes[i] == pokemon[1].types[0].type.name || searchTypes[i] == pokemon[1].types[1].type.name){
                        return pokemon;
                    }
                }else if(searchTypes[i] == pokemon[1].types[0].type.name)
                    {
                        console.log("here " , pokemon)
                        return pokemon;
                    }
                
            })
        }
        console.log("wtf", filteredArray);
        return filteredArray;
    }
    
    const pokemonIdSorter = (array)=>{
        let sortedArray = array.sort((a,b)=>a[1].id - b[1].id);
        console.log(sortedArray);
        return sortedArray;
    }
    const pokemonWinSorter =(array)=>{
        let sortedArray = array.sort((b, a) =>a[1].netScore - b[1].netScore);
        //wins //id number
        return sortedArray
    }

//display pokemon in terms of who has won the most.
    return(
        <div>
            <h2 id="stats-head">
                <span className="header-page">
                    S t a t s</span>
            </h2>
            
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