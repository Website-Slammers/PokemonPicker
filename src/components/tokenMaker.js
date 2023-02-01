import React from "react";

const tokenMaker = (pokemonObj) =>{
    localStorage.setItem("pokemonObj",JSON.stringify({pokemonObj}))
}

export default tokenMaker;
