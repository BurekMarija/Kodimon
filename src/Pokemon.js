import React from 'react'

export default function Pokemon(props) {
   let percent=Math.round((props.pokemon.life/props.pokemon.hp)*100)
   if(percent<0){percent=0}
   if(percent<30){
    document.getElementById(props.id).style.backgroundColor = "#FF7575";
    document.getElementById(`bar${props.id}`).style.border = "1px solid red";
    document.getElementById(`perc${props.id}`).style.color = "red";
   }
   else if((percent>30) && (percent<50)){
    document.getElementById(props.id).style.backgroundColor = "orange";
    document.getElementById(`perc${props.id}`).style.color = "orange";
   }
   else if((percent>50)){
    document.getElementById(props.id).style.backgroundColor = "#62FF84";
    document.getElementById(`bar${props.id}`).style.border = "1px solid #079325";
    document.getElementById(`perc${props.id}`).style.color = "#079325";
   }
   
  return (
    <div className='pokemonBox'>
        <div>
        <div className='percent' id={`perc${props.id}`}>{percent+"%"}</div>
        <div className='progresBar' id={`bar${props.id}`}>
        <div className="progres" id={props.id} style={{width: percent + '%'}}></div>
        </div>
        
    </div>
    <div className='name'>{props.pokemon.name}</div>
    <div>
        <img className={`pokemonImg ${props.pokemon.class}`} id={`img${props.id}`} src={props.pokemon.url} alt=""/>
    </div>
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