import React from 'react'
import './App.css';
import Pokemon from './Pokemon';
import Menu from './Menu';
import Logs from './Logs';
import arrow from "./images/arrow.svg"


export default function Game(props) {
    const [pokemon1, setPokemon1]=React.useState([])
    const [pokemon2, setPokemon2]=React.useState([])
    const [onOfense, setOfense]=React.useState(0)
    const [logs, setLogs]=React.useState([])
    const [pobjednik, setPobjednik]=React.useState(null)

   React.useEffect(()=>{
    let broj1=Math.floor(Math.random() * 20) + 1
    let broj2=Math.floor(Math.random() * 20) + 1
        fetch(`https://pokeapi.co/api/v2/pokemon/${broj1}`)
        .then((res) => res.json())
       .then((data) => {
        console.log(data)
        let pok1={name:data.name, 
            url:data.sprites.back_default, 
            hp:data.stats[0].base_stat,
            life:data.stats[0].base_stat,
            attack:data.stats[1].base_stat, 
            defense:data.stats[2].base_stat,
            speed:data.stats[5].base_stat}
        setPokemon1(pok1)
       })

       fetch(`https://pokeapi.co/api/v2/pokemon/${broj2}`)
        .then((res) => res.json())
       .then((data) => {
        let pok2={name:data.name, 
            url:data.sprites.back_default, 
            hp:data.stats[0].base_stat,
            life:data.stats[0].base_stat,
            attack:data.stats[1].base_stat, 
            defense:data.stats[2].base_stat,
            speed:data.stats[5].base_stat}
        setPokemon2(pok2)
       })

    } , [])
   

    //Provjeravam dali netko od 2 igrača nije "živ"
    React.useEffect(()=>{
        if(pokemon1.life<0){
            setPobjednik(pokemon2.name)
            console.log(pobjednik, "bravo")
        }
        else if(pokemon2.life<0){
            setPobjednik(pokemon1.name)
            console.log(pobjednik, "bravo")
        }
    } , [pokemon1.life, pokemon2.life])

    function attack(){
        let broj=Math.floor(Math.random() * 5) + 1
         let ikona1=document.getElementById(`img1`)
         let ikona2=document.getElementById("img2")
        
        
        
       
        if(broj>4){
            setLogs(prije=>([...prije, `${onOfense===1?pokemon1.name:pokemon2.name} missed`]))
            setOfense(prije=>onOfense===1?2:1)
            return}
        if(onOfense===0){
          if(pokemon1.speed>pokemon2.speed){setOfense(1)
         document.getElementById("arrow").style.transform="rotate(180deg)";}
          else(setOfense(2))
        }
        if(onOfense===1){
            let allAttack=((pokemon1.attack/2)/100)*(100-pokemon2.defense)
           let newLife=pokemon2.life-allAttack
           setPokemon2((pok)=>({...pok, life:newLife}))
           setLogs(prije=>([...prije, `${pokemon1.name} attaked ${pokemon2.name} for ${allAttack} dmg`]))
           setOfense(2)
           ikona1.classList.add("animate1")
           setTimeout(function() {
        ikona1.classList.remove("animate1");}, 500);
           document.getElementById("arrow").style.transform="rotate(0deg)";
        }
        if(onOfense===2){
            let allAttack=((pokemon2.attack/2)/100)*(100-pokemon1.defense)
           let newLife=pokemon1.life-allAttack
           setPokemon1((pok)=>({...pok, life:newLife}))
           setLogs(prije=>([...prije, `${pokemon2.name} attaked ${pokemon1.name} for ${allAttack} dmg`]))
           setOfense(1)
           ikona2.classList.add("animate2")
           setTimeout(function() {
        ikona1.classList.remove("animate2");}, 500);
           document.getElementById("arrow").style.transform="rotate(180deg)";
        }
    }

  return (
    <div>
    <div className='battleBox'>
        {pokemon1!==undefined &&<Pokemon id={1} pokemon={pokemon1}/>}
        <div className='attackBox'>
            {pobjednik!==null && <h1>{pobjednik} won</h1>}
            <img src={arrow} alt="" id="arrow"/>
            <button onClick={attack}>Attack!</button>
            </div>
        {pokemon2!==undefined &&<Pokemon id={2} pokemon={pokemon2}/>}
    </div>
    <div className='down'>
        <Menu changeGameOn={props.changeGameOn}/>
        <Logs logs={logs}/>
    </div>
    </div>
)
}