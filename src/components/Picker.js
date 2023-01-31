import React, { useEffect, useState } from "react";
import {useOutletContext} from "react-router-dom";

const Picker = () =>{
    const [pokemonDataLeft, setPokemonDataLeft] = useState({})
    const [pokemonDataRight, setPokemonDataRight] = useState({});
    const {pokemonScalerObj: [pokemonScaler,setPokemonScaler]} = useOutletContext();
    let pokemonIdLeft = 1;
    let pokemonIdRight = 2;


    //assigns two pokemon id's guarunteeing that they are not the same.
    const pokemonIdAssigner = (sameNumber) => {
        let newPokemon =  Math.ceil(Math.random()*151)
        if(newPokemon == sameNumber)
        {
            console.log("FORBIDDEN NUMBER");
            newPokemon = pokemonIdAssigner(sameNumber)
        }
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

            setPokemonDataLeft(await fetchPokemonData(pokemonIdLeft));
            setPokemonDataRight(await fetchPokemonData(pokemonIdRight));
            
        }catch(error){
            console.log(error)
        }
    }

    async function newPokemonL(){
        try{
            pokemonIdLeft = pokemonIdAssigner(pokemonDataRight.id);
            setPokemonDataLeft(await fetchPokemonData(pokemonIdLeft))
        }catch(error){
            console.log(error)
        }
    }

    async function newPokemonR(){
        try{
            pokemonIdRight = pokemonIdAssigner(pokemonDataLeft.id);
            setPokemonDataRight(await fetchPokemonData(pokemonIdRight))
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
        let objectR = {};
        let inputs = pokemonDataRight.name;
        if(pokemonScaler[inputs]){
            objectR = ({
                [inputs]:
                {
                    wins: pokemonScaler[inputs].wins,
                    losses: pokemonScaler[inputs].losses+1,
                    pokemonWins: [...pokemonScaler[inputs].pokemonWins]
                }})
        }else{
            objectR = ({[pokemonDataRight.name]: 
            {wins: 0, losses: 1, pokemonWins: []}})
        }

        let inputL = pokemonDataLeft.name;
        //if the pokemon Scaler has the pokemon name 
        if(pokemonScaler[inputL]){
            console.log("pokemon wins " , pokemonScaler[inputL].pokemonWins);
            setPokemonScaler({...pokemonScaler,
                [inputL]:
                {
                    wins: pokemonScaler[inputL].wins+1,
                    losses: pokemonScaler[inputL].losses,
                    pokemonWins: [...pokemonScaler[inputL].pokemonWins,(pokemonDataRight.id)]
                },...objectR})
        }
        //if the pokemon scaler does not have the name
        else{
            setPokemonScaler({...pokemonScaler, [pokemonDataLeft.name]: 
            {wins: 1, losses: 0, pokemonWins: [pokemonDataRight.id]},...objectR})
        }

        console.log(pokemonScaler)
        newPokemonR()
    }

    //pokemon right was picked
    const pokemonPickerRight = (event)=>{
        let objectL = {};
        let inputL = pokemonDataLeft.name;
        if(pokemonScaler[inputL]){
            objectL = ({
                [inputL]:
                {
                    wins: pokemonScaler[inputL].wins,
                    losses: pokemonScaler[inputL].losses+1,
                    pokemonWins: [...pokemonScaler[inputL].pokemonWins]
                }})
        }else{
            objectL = ({[pokemonDataLeft.name]: 
            {wins: 0, losses: 1, pokemonWins: []}})
        }

        let inputR = pokemonDataRight.name;
        //if the pokemon Scaler has the pokemon name 
        if(pokemonScaler[inputR]){
            console.log("pokemon wins " , pokemonScaler[inputR].pokemonWins);
            setPokemonScaler({...pokemonScaler,
                [inputR]:
                {
                    wins: pokemonScaler[inputR].wins+1,
                    losses: pokemonScaler[inputR].losses,
                    pokemonWins: [...pokemonScaler[inputR].pokemonWins,(pokemonDataLeft.id)]
                },...objectL})
        }
        //if the pokemon scaler does not have the name
        else{
            setPokemonScaler({...pokemonScaler, [pokemonDataRight.name]: 
            {wins: 1, losses: 0, pokemonWins: [pokemonDataLeft.id]},...objectL})
        }

        console.log(pokemonScaler)
        newPokemonL()
    }
    
    return(
        
        <div>
            <header id="pokemonPicker">Pick a pokemon!</header>

            <div id="pokeContainer">
            {!Object.keys(pokemonDataLeft).length?<div>There's no data</div>:
                <button onClick={pokemonPickerLeft} className="pokeButton" id="pokeButton1">
                    <div id="pokemonB">{pokemonDataLeft.name}</div>
                    <div >{pokemonDataLeft.id}</div>
                    {
                        Object.keys(pokemonDataLeft).length&&pokemonDataLeft.types.length?<div>{pokemonDataLeft.types[0].type.name}</div>:<div>whoops!</div>
                    }
                    {
                        Object.keys(pokemonDataLeft).length&&Object.keys(pokemonDataLeft.sprites).length?
                        <div id="pokemonBimg">
                            <img src={pokemonDataLeft.sprites.other['official-artwork'].front_default}/>
                        </div>:<div>loading</div>
                    }
                    
                </button>
            }   
            {/* pokemon object two */}
            {!Object.keys(pokemonDataRight).length?<div>There's no data</div>:
                <button onClick={pokemonPickerRight} className="pokeButton" id="pokebutton2">
                    <div id="pokemonB">{pokemonDataRight.name}</div>
                    <div >{pokemonDataRight.id}</div>
                    {
                        Object.keys(pokemonDataRight).length&&pokemonDataRight.types.length?<div>{pokemonDataRight.types[0].type.name}</div>:<div>whoops!</div>
                    }
                    {
                        Object.keys(pokemonDataRight).length&&Object.keys(pokemonDataRight.sprites).length?
                        <div id="pokemonBimg">
                            <img src={pokemonDataRight.sprites.other['official-artwork'].front_default}/>
                        </div>:<div>loading</div>
                    }
                    
                </button>
            }   
            </div>
        </div>
    )
}

export default Picker;