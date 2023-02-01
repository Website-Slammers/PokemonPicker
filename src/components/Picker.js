import React, { useEffect, useState } from "react";
import {useOutletContext} from "react-router-dom";
import tokenMaker from "./tokenMaker";

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
        if(localStorage.getItem("pokemonObj")){
            let {pokemonObj} = JSON.parse(localStorage.getItem("pokemonObj"))
            console.log(pokemonObj)
            setPokemonScaler(pokemonObj)
        }
        newPokemon()
    },[])

    //pokemon left was picked
    const pokemonPickerLeft = (event)=>{
        let objectR = {};
        let inputs = pokemonDataRight.name; 
        let newObj = pokemonScaler[inputs];
        if(newObj){
            objectR = ({
                [inputs]:
                {
                    id: newObj.id,
                    name: pokemonDataRight.name,
                    types: newObj.types,
                    wins: newObj.wins,
                    losses: newObj.losses+1,
                    netScore: newObj.wins -newObj.losses-1,
                    pokemonWins: [...newObj.pokemonWins],
                    image: pokemonDataRight.sprites.front_default
                },...objectR})
        }else{
            objectR = ({[pokemonDataRight.name]: 
                {
                    id: pokemonDataRight.id,
                    name: pokemonDataRight.name,
                    types: pokemonDataRight.types,
                    wins: 0,
                    losses: 1,
                    netScore: -1,
                    pokemonWins: [],
                    image: pokemonDataRight.sprites.front_default
                }})
        }

        let inputL = pokemonDataLeft.name;
        let newObj2 = pokemonScaler[inputL];
        //if the pokemon Scaler has the pokemon name 
        if(pokemonScaler[inputL]){
            console.log("pokemon wins " , newObj2.pokemonWins);
            setPokemonScaler({...pokemonScaler,
                [inputL]:
                {
                    id: newObj2.id,
                    name: pokemonDataLeft.name,
                    types: newObj2.types,
                    wins: newObj2.wins+1,
                    losses: newObj2.losses,
                    netScore: newObj2.wins -newObj2.losses+1,
                    pokemonWins: [...newObj2.pokemonWins,(pokemonDataRight.id)],
                    image: pokemonDataLeft.sprites.front_default
                },...objectR})
        }
        //if the pokemon scaler does not have the name
        else{
            setPokemonScaler({...pokemonScaler, [pokemonDataLeft.name]: 
                {
                    id: pokemonDataLeft.id,
                    name: pokemonDataLeft.name,
                    types: pokemonDataLeft.types,
                    wins: 1,
                    losses: 0,
                    netScore: 1,
                    pokemonWins: [pokemonDataRight.id],
                    image: pokemonDataLeft.sprites.front_default
                }})
        }

        console.log(pokemonScaler);
        tokenMaker(pokemonScaler);
        newPokemonR()
    }

    //pokemon right was picked
    const pokemonPickerRight = (event)=>{
        let objectL = {};
        let inputL = pokemonDataLeft.name;
        let newObj2 = pokemonScaler[inputL];
        //loss data for left saved
        if(pokemonScaler[inputL]){
            objectL = ({
                [inputL]:
                {
                    id: newObj2.id,
                    name: pokemonDataLeft.name,
                    types: newObj2.types,
                    wins: newObj2.wins,
                    losses: newObj2.losses+1,
                    netScore:newObj2.wins -newObj2.losses-1,
                    pokemonWins: [...newObj2.pokemonWins],
                    image: pokemonDataLeft.sprites.front_default
                }})
        }else{ //loss data for left saved if there isn't already loss data
            objectL = ({[pokemonDataLeft.name]: 
                {
                    id: pokemonDataLeft.id,
                    name: pokemonDataLeft.name,
                    types: pokemonDataLeft.types,
                    wins: 0, 
                    losses: 1, 
                    netScore: -1,
                    pokemonWins: [],
                    image: pokemonDataLeft.sprites.front_default
            }})
        }

        let inputR = pokemonDataRight.name;
        let newObj = pokemonScaler[inputR];

        //victory for the right saved
        if(newObj){
            console.log("pokemon wins " , newObj.pokemonWins);
            setPokemonScaler({...pokemonScaler,
                [inputR]:
                {
                    id: newObj.id,
                    name: pokemonDataRight.name,
                    types: newObj.types,
                    wins: newObj.wins+1,
                    losses: newObj.losses,
                    netScore: newObj.wins -newObj.losses+1,
                    pokemonWins: [...newObj.pokemonWins,(pokemonDataLeft.id)],
                    image: pokemonDataRight.sprites.front_default
                },...objectL})
        }
        //if the pokemon scaler does not have the name
        else{
            setPokemonScaler({...pokemonScaler, [pokemonDataRight.name]: 
                {
                id: pokemonDataRight.id,
                name: pokemonDataRight.name,
                types: pokemonDataRight.types ,
                wins: 1, 
                losses: 0, 
                netScore: 1,
                pokemonWins: [pokemonDataLeft.id],
                image: pokemonDataRight.sprites.front_default
            }})
        }

        console.log(pokemonScaler)
        tokenMaker(pokemonScaler);
        newPokemonL()
    }
    
    return(
        
        <div>
            <header>
                <h1 id="pokemonPicker">P i c k- a-
              p o k e m o n !</h1>
            </header>

            <div id="pokeContainer">
            {!Object.keys(pokemonDataLeft).length?<div>There's no data</div>:
                <button onClick={pokemonPickerLeft} className="pokeButton" id="pokeButton1">
                    <div id="pokemon-left-name">{pokemonDataLeft.name}</div>
                    <div >{pokemonDataLeft.id}</div>
                    {
                        Object.keys(pokemonDataLeft).length&&pokemonDataLeft.types.length?<div>{pokemonDataLeft.types[0].type.name}</div>:<div>whoops!</div>
                    }
                    {
                        Object.keys(pokemonDataLeft).length&&Object.keys(pokemonDataLeft.sprites).length?
                        <div id="pokemonLimg">
                            <img src={pokemonDataLeft.sprites.other['official-artwork'].front_default}/>
                        </div>:<div>loading</div>
                    }
                    
                </button>
            }   
            {/* pokemon object two */}
            {!Object.keys(pokemonDataRight).length?<div>There's no data</div>:
                <button onClick={pokemonPickerRight} className="pokeButton" id="pokebutton2">
                    <div id="pokemonR">{pokemonDataRight.name}</div>
                    <div >{pokemonDataRight.id}</div>
                    {
                        Object.keys(pokemonDataRight).length&&pokemonDataRight.types.length?<div>{pokemonDataRight.types[0].type.name}</div>:<div>whoops!</div>
                    }
                    {
                        Object.keys(pokemonDataRight).length&&Object.keys(pokemonDataRight.sprites).length?
                        <div id="pokemonRimg">
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