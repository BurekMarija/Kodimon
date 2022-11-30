import React from 'react'

export default function Pokemon(props) {
   let percent=(props.pokemon.life/props.pokemon.hp)*100
   if(percent<0){percent=0}
   if(percent<30){
    document.getElementById(props.id).style.backgroundColor = "#FF7575";
    document.getElementById(`bar${props.id}`).style.border = "1px solid red";
   }
   else if((percent>30) && (percent<50)){
    document.getElementById(props.id).style.backgroundColor = "orange";
   }
   else if((percent>50)){
    document.getElementById(props.id).style.backgroundColor = "#62FF84";
    document.getElementById(`bar${props.id}`).style.border = "1px solid #079325";
   }
   
  return (
    <div className='pokemonBox'>
        <div>
        <div className='progresBar' id={`bar${props.id}`}>
        <div className="progres" id={props.id} style={{width: percent + '%'}}></div>
        </div>
        
    </div>
    <div className='name'>{props.pokemon.name}</div>
      <img className='pokemonImg' id={`img${props.id}`} src={props.pokemon.url} alt=""/>
      <div className='statsTag'>Stats</div>
      <div className='stats okvir'>
      <div>HP:{props.pokemon.hp}</div>
      <div>Attack:{props.pokemon.attack}</div>
      <div>Defense:{props.pokemon.defense}</div>
      <div>Speed:{props.pokemon.speed}</div>
      </div>
    </div>
 )
}