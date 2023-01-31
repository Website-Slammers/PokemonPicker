import React, { useEffect, useState } from "react";
import {useOutletContext} from "react-router-dom";

const Picker = () =>{
    const [pokemonData, setPokemonData] = useState({})
    const [pokemonData2, setPokemonData2] = useState({});
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext();
    let pokemonIdLeft = 1;
    let pokemonIdRight = 2;

    // const [pokemonPicked, setPokemonPicked] = useState([]);

    //assigns two pokemon id's guarunteeing that they are not the same.
    const pokemonIdAssigner = (sameNumber) => {
        let newPokemon =  Math.ceil(Math.random()*151)
        if(newPokemon == sameNumber)
        {
            console.log("FORBIDDEN NUMBER");
            newPokemon = pokemonIdAssigner(sameNumber)
        }
        console.log("same pokemon " , sameNumber, " variable Pokemon", newPokemon);
        return newPokemon
    }

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
            return pokeData;
        }catch(error){
            console.log("your fetch has failed, bitch")
        }
    }

    //refreshes pokemon calls when used. and stuff
    async function newPokemon(){
        try{
            pokemonIdLeft = pokemonIdAssigner(pokemonIdRight)
            pokemonIdRight = pokemonIdAssigner(pokemonIdLeft)

            setPokemonData(await fetchPokemonData(pokemonIdLeft));
            setPokemonData2(await fetchPokemonData(pokemonIdRight));
            
        }catch(error){
            console.log(error)
        }
    }

    async function newPokemonL(){
        try{
            pokemonIdLeft = pokemonIdAssigner(pokemonData2.id);
            setPokemonData(await fetchPokemonData(pokemonIdLeft))
        }catch(error){
            console.log(error)
        }
    }

    async function newPokemonR(){
        try{
            pokemonIdRight = pokemonIdAssigner(pokemonData.id);
            setPokemonData2(await fetchPokemonData(pokemonIdRight))
        }catch(error){
            console.log(error)
        }
    }
    //initial setup useEffect wehs
    useEffect(() =>{
        newPokemon()
        console.log("Pokemon Left id ",  pokemonIdLeft,"   ", pokemonData.id)
        console.log("Pokemon Right id ", pokemonIdRight,"   ", pokemonData2.id)
    },[])

    //pokemon left was picked
    const pokemonPickerLeft = (event)=>{
        console.log(pokemonData.id);
        setPokemonScaler({...pokemonScaler,
            [pokemonData.name]:
            {wins: 1, losses:0, pokemonWins:[pokemonData2.id] },
            [pokemonData2.name]: 
            {wins: 0, losses: 1, pokemonLost:[pokemonData.id]}})
        console.log(pokemonScaler);
        newPokemonR()
        console.log("Pokemon Left id ",  pokemonIdLeft," pokemonDataId  ", pokemonData.id)
        console.log("Pokemon Right id ", pokemonIdRight," pokemonDataId ", pokemonData2.id)
    }

    //pokemon right was picked
    const pokemonPickerRight = (event)=>{
        console.log(pokemonData2.id);
        setPokemonScaler({...pokemonScaler, 
            [pokemonData.name]: 
            {wins: 0, losses: 1, pokemonLost:[pokemonData2.id]}, 
            [pokemonData2.name]: 
            {wins: 1, losses: 0, pokemonWins:[pokemonData.id]}})
        console.log(pokemonScaler);
        newPokemonL()
        console.log("Pokemon Left id ",  pokemonIdLeft," pokemonDataId  ", pokemonData.id)
        console.log("Pokemon Right id ", pokemonIdRight," pokemonDataId ", pokemonData2.id)
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
            {/* pokemon object two */}
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