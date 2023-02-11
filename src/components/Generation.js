import {react, useEffect,useState} from 'react'

const Generation =()=>{
    const [generationToggle, setGenerationToggle] = useState([true,true,true,true,true,true,true,true,true])
    const [pokemonNumber, setPokemonNumber] = useState(1)

    const pokeGenerations = [
        {generation: 1,
        pokemonAmt:151,
        startingId:1},

        {generation: 2,
        pokemonAmt:100,
        startingId:152},

        {generation: 3,
        pokemonAmt: 135,
        startingId: 252},

        {generation: 4,
        pokemonAmt: 107,
        startingId: 387},
        
        {generation: 5,
        pokemonAmt: 156,
        startingId: 494},

        {generation:6,
        pokemonAmt:72,
        startingId:649},
        
        {generation:7,
        pokemonAmt:88,
        startingId:722},

        {generation:8,
        pokemonAmt:96,
        startingId:810},

        {generation:9,
        pokemonAmt:103,
        startingId:906}];

    useEffect(()=>{
        let totalAmt = 0
        let generations = generationToggle;
        console.log(pokeGenerations[0].pokemonAmt)
        for(let i = 0; i<generationToggle.length; i++){
            if(generationToggle[i]=== true) totalAmt+= pokeGenerations[i].pokemonAmt;
        }
        let tempMath = Math.ceil(Math.random()*totalAmt);
        console.log("initial Number ",  tempMath);
        let gen = 0;
        while(tempMath> 0){
            if(generationToggle[gen] == true ){
                tempMath -= pokeGenerations[gen]?.pokemonAmt
            }
            console.log('helo')
            gen ++
        }
        gen --
        tempMath += pokeGenerations[gen]?.pokemonAmt + pokeGenerations[gen]?.startingId
        console.log("gen ", gen+1, " tempMath ", tempMath)
        console.log("generation toggle ", generationToggle);
        setPokemonNumber(tempMath)
       console.log("hello")
    },[generationToggle])
    
    function toggleGenerations(event, index){
        let tempArray = [...generationToggle];
        if(tempArray[index]== true) tempArray[index] = false;
        else tempArray[index] = true;
        console.log(tempArray);
        
        setGenerationToggle(tempArray);
    }

    return(
        <div>
            {
            generationToggle?generationToggle.map((element,index)=>{
                
                return(
                    <button onClick={(event)=>{toggleGenerations(event, index)}}
                    id={'Generation ' +index+1}> Generation {index +1}</button>
                )})
                :<div>types failed to load</div>
            }
        </div>
    )
}

export default Generation