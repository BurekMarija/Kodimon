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
    catchPokemons()
    
    } , [])

    if(onOfense===0){
          if(pokemon1.speed>pokemon2.speed){setOfense(1)}
          if(pokemon1.speed<pokemon2.speed){setOfense(2)}
        }


   React.useEffect(()=>{
    if(onOfense===1){document.getElementById("arrow").style.transform="rotate(180deg)";}
    else{document.getElementById("arrow").style.transform="rotate(0deg)";}
    } , [onOfense])

    //Provjeravam dali netko od 2 igrača nije "živ"
    React.useEffect(()=>{
        if(pokemon1.life<0){
            setPobjednik(pokemon2.name)
        }
        else if(pokemon2.life<0){
            setPobjednik(pokemon1.name)
        }
    } , [pokemon1.life, pokemon2.life])


    //Napad logika i izračun
    function attack(){

        let broj=Math.floor(Math.random() * 5) + 1
        
        if(broj>4){
            setLogs(prije=>([...prije, `${onOfense===1?pokemon1.name:pokemon2.name} missed`]))
            if(onOfense===1){
                setPokemon1(prije=>({...prije, class:"animateMiss"}))
                setPokemon2(prije=>({...prije, class:""}))
            }
                
            if(onOfense===2){
                setPokemon2(prije=>({...prije, class:"animateMiss"}))
                setPokemon1(prije=>({...prije, class:""}))
            }
            setOfense(prije=>onOfense===1?2:1)
            return}
        
        if(onOfense===1){
            let allAttack=((pokemon1.attack/2)/100)*(100-pokemon2.defense)
            let round=Math.round(allAttack * 100) / 100
           let newLife=pokemon2.life-round
           setPokemon2((pok)=>({...pok, life:newLife}))
           setLogs(prije=>([...prije, `${pokemon1.name} attaked ${pokemon2.name} for ${round} dmg`]))
           setPokemon1(prije=>({...prije, class:"animate1"}))
           setPokemon2(prije=>({...prije, class:""}))
           
           setOfense(2)
           
           
        }
        if(onOfense===2){
            let allAttack=((pokemon2.attack/2)/100)*(100-pokemon1.defense)
            let round=Math.round(allAttack * 100) / 100
           let newLife=pokemon1.life-round
           setPokemon1((pok)=>({...pok, life:newLife}))
           setLogs(prije=>([...prije, `${pokemon2.name} attaked ${pokemon1.name} for ${round} dmg`]))
           setPokemon2(prije=>({...prije, class:"animate2"}))
           setPokemon1(prije=>({...prije, class:""}))
           setOfense(1)
           
        }
    }

    function newGame(){
        catchPokemons()
        setLogs([])
        setPobjednik(null)
        onOfense(0)
    }
    function resetOpponent(){
        setPokemon1(prije=>({...prije, life:prije.hp}))
        let broj=Math.floor(Math.random() * 20) + 1
        fetch(`https://pokeapi.co/api/v2/pokemon/${broj}`)
        .then((res) => res.json())
       .then((data) => {
        console.log(data)
        let pok={name:data.name, 
            url:data.sprites.back_default, 
            hp:data.stats[0].base_stat,
            life:data.stats[0].base_stat,
            attack:data.stats[1].base_stat, 
            defense:data.stats[2].base_stat,
            speed:data.stats[5].base_stat,
            class:""}
        setPokemon2(pok)
       })
        setPobjednik(null)
        onOfense(0)

    }

    function catchPokemons(){
        for(let i=1; i<3; i++){
       let broj=Math.floor(Math.random() * 20) + 1
        fetch(`https://pokeapi.co/api/v2/pokemon/${broj}`)
        .then((res) => res.json())
       .then((data) => {
        console.log(data)
        let pok={name:data.name, 
            url:data.sprites.back_default, 
            hp:data.stats[0].base_stat,
            life:data.stats[0].base_stat,
            attack:data.stats[1].base_stat, 
            defense:data.stats[2].base_stat,
            speed:data.stats[5].base_stat,
            class:""}
        if(i===1){setPokemon1(pok)}
        else{setPokemon2(pok)}
       })
    }

    }

    const shade={
        opacity: pobjednik===null? 1:0.3
    }

    let menuPos={}
    if(pobjednik!==null){
        menuPos={
        position:"absolute",
        top: "20%",
        left: "40%"
    }
    }
    
    


  return (
    <div>
        {pobjednik!==null && <h1 className='pobjednik'>{pobjednik} won</h1>}
    <div className='battleBox' style={shade}>
        {pokemon1!==undefined &&<Pokemon id={1} pokemon={pokemon1}/>}
        <div className='attackBox'>
            <img src={arrow} alt="" id="arrow"/>
            {pobjednik===null && <button onClick={attack}>Attack!</button>}
            </div>
        {pokemon2!==undefined &&<Pokemon id={2} pokemon={pokemon2}/>}
    </div>
    <div className='down' >
        <div style={menuPos}><Menu changeGameOn={props.changeGameOn} newGame={newGame} resetOpponent={resetOpponent}/></div>
        <div style={shade}><Logs logs={logs}/></div>
    </div>
    </div>
)
}