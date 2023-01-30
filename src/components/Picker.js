import React, { useEffect, useState } from "react";
import {useOutletContext} from "react-router-dom";

const Picker = () =>{
    const [pokemonData, setPokemonData] = useState({})
    const [pokemonData2, setPokemonData2] = useState({});
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext();

    let pokemonId = Math.round(Math.random()*1008);
    let pokemonId2 = Math.round(Math.random()*1008);

    //acquires pokemon data by ID
    async function fetchPokemonData(id){
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`,
            {
                headers:{
                    'Content-Type':'application/json'
                },
            })
            let pokeData = await response.json();
            console.log(pokeData);
            return pokeData 
        }catch(error){
            console.log("your fetch has failed, bitch")
        }
    }
    //refreshes pokemon calls when used.
    async function newPokemon(){
        try{
        setPokemonData(await fetchPokemonData(pokemonId))
        setPokemonData2(await fetchPokemonData(pokemonId2));
        }catch(error){
            console.log(error)
        }
    }
    //initial setup useEffect wehs
    useEffect(() =>{
        newPokemon()
    },[])

    //pokemon left was picked
    const pokemonPickerLeft = (event)=>{
        console.log(pokemonData.id);
        setPokemonScaler()
        console.log(pokemonArray);
    }

    //pokemon right was picked
    const pokemonPickerRight = (event)=>{

        console.log(pokemonData2.id);
        if(!pokemonScaler.pokemonData2.name){
            //we need to pass a new key into an object named after the pokemon and assign victory/loss
            // setPokemonScaler(pokemonData2.name.toString() : {id:pokemonData2.id, victory: 1}})
        }
        if(!pokemonScaler.id)
        console.log(pokemonArray)

    }
    
    return(
        
        <div>
            <header id="pokemonPicker">Pick a pokemon!</header>

            <div id="pokeContainer">
            {!Object.keys(pokemonData).length?<div>There's no data</div>:
                <button onClick={pokemonPickerLeft} className="pokeButton" id="pokeButton1">
                    <div id="pokemonB">{pokemonData.name}</div>
                    <div >{pokemonData.id}</div>
                    {
                        Object.keys(pokemonData).length&&pokemonData.types.length?<div>{pokemonData.types[0].type.name}</div>:<div>whoops!</div>
                    }
                    {
                        Object.keys(pokemonData).length&&Object.keys(pokemonData.sprites).length?
                        <div id="pokemonBimg">
                            <img src={pokemonData.sprites.other['official-artwork'].front_default}/>
                        </div>:<div>loading</div>
                    }
                    
                </button>
            }   
            {!Object.keys(pokemonData2).length?<div>There's no data</div>:
                <button onClick={pokemonPickerRight} className="pokeButton" id="pokebutton2">
                    <div id="pokemonB">{pokemonData2.name}</div>
                    <div >{pokemonData2.id}</div>
                    {
                        Object.keys(pokemonData2).length&&pokemonData2.types.length?<div>{pokemonData2.types[0].type.name}</div>:<div>whoops!</div>
                    }
                    {
                        Object.keys(pokemonData2).length&&Object.keys(pokemonData2.sprites).length?
                        <div id="pokemonBimg">
                            <img src={pokemonData2.sprites.other['official-artwork'].front_default}/>
                        </div>:<div>loading</div>
                    }
                    
                </button>
            }   
            </div>
        </div>
    )
}

export default Picker;
