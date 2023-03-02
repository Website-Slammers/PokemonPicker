import React, { useEffect,useState } from "react";
import {useOutletContext} from "react-router-dom";

import Header from './Header'

const Stats = ()=>{
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext(); 
    const [sortedPokemon, setSortedPokemon] = useState([]);
    const [statSorter, setStatSorter] = useState("wins");
    const [cutPokemonTypes, setCutPokemonTypes] = useState([]);
    let pokemonArray = [];
    let pokemonTypesArray = ['bug','dark','dragon','electric','fairy','fighting','fire',
    'flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']


    useEffect(()=>{
        if(localStorage.getItem("pokemonObj")){
            const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            setPokemonScaler(pokemonObj);
            pokemonArray = Object.entries(pokemonObj);
            // pokemonArray = pokemonTypeSorter(pokemonArray, ["fire"])
            // console.log(pokemonArray);
            pokemonArray = pokemonWinSorter(pokemonArray);
        }
        setSortedPokemon(pokemonArray);

    },[])

    useEffect(()=>{
        
        if(localStorage.getItem("pokemonObj")){
            const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
                setPokemonScaler(pokemonObj);
                pokemonArray = Object.entries(pokemonObj);
            sortSwitcher(statSorter, pokemonArray)
        }
    },[statSorter])
    

    const pokemonIdSorter = (array)=>{
        // console.log(array);
        let sortedArray = array.sort((a,b)=>a[1].id - b[1].id);
        // console.log(sortedArray);
        return sortedArray;
    }
    
    const pokemonWinSorter =(array)=>{
        let sortedArray = array.sort((b, a) =>a[1].netScore - b[1].netScore);
        //wins //id number
        return sortedArray
    }

    const pokemonTypeSorter = (array)=>{
        let filteredArray = []
        let searchTypes = pokemonTypesArray;
        searchTypes = pokemonTypesArray.filter(type => !cutPokemonTypes.includes(type))
        // console.log(array);
        filteredArray = array.filter((pokemon=>{
            if(pokemon[1].types[1]){
                if(searchTypes.includes(pokemon[1].types[0].type.name) || searchTypes.includes(pokemon[1].types[1].type.name)){
                    return pokemon; 
            }}else if(searchTypes.includes(pokemon[1].types[0].type.name))
                {
                    return pokemon;
                }
        }))
        console.log("filtered ", filteredArray);
        filteredArray = pokemonWinSorter(filteredArray);
        // console.log("wtf", filteredArray);
        setSortedPokemon(pokemonWinSorter(filteredArray));
    }

    function sortSwitcher(statSorter, pokemonArray){
        switch(statSorter){
            case 'wins': setSortedPokemon(pokemonWinSorter(pokemonArray))
                break;
            case 'id': setSortedPokemon(pokemonIdSorter(pokemonArray))
                break;
            default: setSortedPokemon(pokemonWinSorter(pokemonArray))
                break;  
    }
        // console.log(sortedPokemon)
    
    }

    
    //if the type is in the Usestate, filter it out of the array.
    const elementFlip=(event, element)=>{
        let tempTypes = [...cutPokemonTypes];
        let toggle = false;

        console.log(element);
        tempTypes.map((type)=>{
            if(type == element) toggle = true;
        })
        if(toggle == false){
            tempTypes.push(element)
        }else if(toggle == true){
            tempTypes = tempTypes.filter(function(type){
                if(type !== element) return type;
            })
        }
        console.log("tempTypes " , tempTypes);
        setCutPokemonTypes(tempTypes);
    }

    useEffect (()=>{
        if(localStorage.getItem("pokemonObj")){
            const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
                setPokemonScaler(pokemonObj);
                pokemonArray = Object.entries(pokemonObj)
            pokemonTypeSorter(pokemonArray);
        }
    },[cutPokemonTypes])

//display pokemon in terms of who has won the most.
    return(
        <div>
            <Header />

            <label form="sort">Sort by:</label>
            <select name="sort" id="sort" value={statSorter} onChange={(event)=>{setStatSorter(event.target.value), console.log(event.target.value)}} >
                <option value="wins">Wins</option>
                <option value="id">Number</option>
            </select>

            {
            pokemonTypesArray?pokemonTypesArray.map((element,index)=>{
                
                return(
                    <button onClick={(event)=>{elementFlip(event, element)}}
                    id={element}> {element}</button>
                )})
                :<div>types failed to load</div>
            }
            
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