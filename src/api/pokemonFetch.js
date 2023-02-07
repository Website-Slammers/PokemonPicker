
export async function fetchPokemonData(id){
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
        console.log("your fetch has failed, bitch");
    }
}