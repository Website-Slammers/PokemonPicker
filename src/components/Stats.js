import React, { useEffect,useState } from "react";
import {useOutletContext} from "react-router-dom";


const Stats = ()=>{
    let cumstain = "penis"
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext();
    const [sortedPokemon, setSortedPokemon] = useState([]);
    const [statSorter, setStatSorter] = useState("wins");
    const [pokemonTypes, setPokemonTypes] = useState();
    let pokemonArray = [];
    let pokemonTypesArray =['bug','dark','dragon','electric','fairy','fighting','fire',
    'flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']


    useEffect(()=>{
        if(localStorage.getItem("pokemonObj")){
            const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            setPokemonScaler(pokemonObj);
            pokemonArray = Object.entries(pokemonObj);
            // pokemonArray = pokemonTypeSorter(pokemonArray, ["fire"])
            console.log(pokemonArray);
            pokemonArray = pokemonWinSorter(pokemonArray);
        }
        setSortedPokemon(pokemonArray);

    },[])

    useEffect(()=>{
        // pokemonArray = pokemonTypeSorter(pokemonArray, ["fire"])
        const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            setPokemonScaler(pokemonObj);
            pokemonArray = Object.entries(pokemonObj);
        sortSwitcher(statSorter, pokemonArray)
    },[statSorter])
    
    useEffect(()=>{
        const {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            setPokemonScaler(pokemonObj);
            pokemonArray = Object.entries(pokemonObj);
        pokemonTypeSorter(pokemonArray);
    },[pokemonTypes])


    const pokemonIdSorter = (array)=>{
        console.log(array);
        let sortedArray = array.sort((a,b)=>a[1].id - b[1].id);
        console.log(sortedArray);
        return sortedArray;
    }
    
    const pokemonWinSorter =(array)=>{
        let sortedArray = array.sort((b, a) =>a[1].netScore - b[1].netScore);
        //wins //id number
        return sortedArray
    }

    const pokemonTypeSorter = (array)=>{
        let filteredArray = []
        let searchTypes = pokemonTypesArray; //filter out all types that are in the useState.
        
        console.log(searchTypes);
        for(let i=0;i<searchTypes.length;i++){
            filteredArray = array.filter((pokemon) =>{
                if(pokemon[1].types[1]){
                    
                    if(searchTypes[i][1] == true){
                    if(searchTypes[i][0] == pokemon[1].types[0].type.name || searchTypes[i][0] == pokemon[1].types[1].type.name){
                        return pokemon;
                    }
                }else if(searchTypes[i][0] == pokemon[1].types[0].type.name)
                    {
                        return pokemon;
                    }
                }
            })
        }
        filteredArray = pokemonWinSorter(filteredArray);
        console.log("wtf", filteredArray);
        return filteredArray;
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
        console.log(sortedPokemon)
    
    }

    //if the type is in the Usestate, filter it out of the array.
    const elementFlip=(event,element)=>{
        let tempTypes =pokemonTypes;
        
        if(tempTypes.length){
            let inType = false;
            tempTypes.map((type, index)=>{
                if(type === element){
                    inType = true;
                    return 
                }else {
                    return element;
                }
            })
            if (inType == false){
                tempTypes.push(element)
            }
        }
        setPokemonTypes(tempTypes);
        console.log("hello ", pokemonTypesArray)
    }
//display pokemon in terms of who has won the most.
    return(
        <div>
            <h2 id="stats-head">
                <span className="header-page">
                    S t a t s</span>
            </h2>

            <label form="sort">Sort by:</label>
            <select name="sort" id="sort" value={statSorter} onChange={(event)=>{setStatSorter(event.target.value), console.log(event.target.value)}} >
                <option value="wins">Wins</option>
                <option value="id">Number</option>
            </select>

            {
            pokemonTypesArray?pokemonTypesArray.map((element,index)=>{
                
                return(
                    <button style={{brightness:100}}  onClick={(event)=>{elementFlip(element)}}
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