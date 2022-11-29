import React from 'react'

export default function Pokemon() {
    const [pokemon, setPokemon]=React.useState()
   
    React.useEffect(()=>{
        fetch("https://pokeapi.co/api/v2/pokemon/1")
        .then(res => res.json())
       .then(data => setPokemon(data))

    } , [])
    console.log(pokemon)
  return (
    <div>
      <h1>Evo</h1>
      <h1>{pokemon.name}</h1>
      
    </div>
  )
}