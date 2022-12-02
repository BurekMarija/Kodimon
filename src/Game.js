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
    const [napad, setNapad]=React.useState(false)
    const [message, setMessage]=React.useState()
    let messagePos={}

   React.useEffect(()=>{
    catchPokemons()
    } , [])

    if(onOfense===0){
          if(pokemon1.speed>pokemon2.speed){setOfense(1)}
          if(pokemon1.speed<pokemon2.speed){setOfense(2)}
        }


    //Napad logika i izračun
    function attack(){

        let broj=Math.floor(Math.random() * 5) + 1
        document.getElementById("attackButton").disabled=true
        
        if(broj>4){
            setLogs(prije=>([...prije, `${onOfense===1?pokemon1.name:pokemon2.name} missed`]))
            if(onOfense===1){
                setPokemon1(prije=>({...prije, class:"animateMiss"}))
                setPokemon2(prije=>({...prije, class:""}))
                setNapad(true)
                setMessage("Miss")
                
            }
                
            if(onOfense===2){
                setPokemon2(prije=>({...prije, class:"animateMiss"}))
                setPokemon1(prije=>({...prije, class:""}))
                setNapad(true)
                setMessage("Miss")
            }
            setOfense(prije=>onOfense===1?2:1)
            return}
       
        if(onOfense===1){
            let allAttack=((pokemon1.attack/2)/100)*(100-pokemon2.defense)
            let round=Math.round(allAttack * 100) / 100
           let newLife=pokemon2.life-round
           if(newLife<=0){setPobjednik(pokemon1.name)}
           setNapad(true)
           setMessage(round +" DMG")
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
           if(newLife<=0){setPobjednik(pokemon2.name)}
           setNapad(true)
           setMessage(round+" DMG")
           setPokemon1((pok)=>({...pok, life:newLife}))
           setLogs(prije=>([...prije, `${pokemon2.name} attaked ${pokemon1.name} for ${round} dmg`]))
           setPokemon2(prije=>({...prije, class:"animate2"}))
           setPokemon1(prije=>({...prije, class:""}))
           setOfense(1)
           
        }
    }

    //Delay za trajanje attac-a
    React.useEffect(() => {
  const timer = setTimeout(() => {setNapad(false)
         document.getElementById("attackButton").disabled=false
        }, 700);
  return () => clearTimeout(timer);
}, [onOfense]);

    //New game 
    function newGame(){
        setPobjednik(null)
        catchPokemons()
        setLogs([])
        setOfense(0)
        setNapad(false)
        console.log(pobjednik, "pobjednik")

    }
    console.log(pobjednik)

    //Reset opponent
    function resetOpponent(){
        setPobjednik(null)
        setPokemon1(prije=>({...prije, life:prije.hp}))
        let broj=Math.floor(Math.random() * 20) + 1
        fetch(`https://pokeapi.co/api/v2/pokemon/${broj}`)
        .then((res) => res.json())
       .then((data) => {
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
        setOfense(0)
        console.log(pobjednik, "pobjednik")
    }
    

    function catchPokemons(){
        for(let i=1; i<3; i++){
       let broj=Math.floor(Math.random() * 20) + 1
        fetch(`https://pokeapi.co/api/v2/pokemon/${broj}`)
        .then((res) => res.json())
       .then((data) => {
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
    const shade2={
        opacity: napad===false? 1:0.3
        
    }

     if(onOfense===2){
        messagePos={
        position:"absolute",
        top: "10%",
        left: "60%",
        transform: "rotate(-20deg)",
        color:message==="Miss"?"black": "red"
    }
    }
    if(onOfense===1){
        messagePos={
        position:"absolute",
        top: "10%",
        left: "30%",
        transform: "rotate(20deg)",
        color:message==="Miss"?"black": "red"
    }
    }

     


  return (
    <div className='mainBox'>
        {pobjednik!==null && <h1 className='pobjednik'>{pobjednik} won</h1>}
    <div className='battleBox' style={shade}>
        <Pokemon id={1} pokemon={pokemon1}/>
        <div className='attackBox'>
            {napad &&<div style={messagePos} className='message'>{message}</div>}
            <img src={arrow} alt="" id="arrow" style={{transform:onOfense===1?"rotate(180deg)":"rotate(0deg)"}}/>
             <button id="attackButton" style={shade2} onClick={attack} >Attack!</button>
            </div>
        <Pokemon id={2} pokemon={pokemon2}/>
    </div>
    <div className='down' >
        <div style={pobjednik!==null?{
            position:"absolute",
            top: "20%",
            left: "40%"
        }
            :null}>
        <Menu changeGameOn={props.changeGameOn} 
        newGame={newGame} 
        resetOpponent={resetOpponent}/></div>
        <div style={shade}><Logs logs={logs}/></div>
    </div>
    </div>
)
}