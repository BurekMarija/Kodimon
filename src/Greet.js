import React from 'react'
import kodi from "./images/Kodi-logo.svg"
import logo from "./images/kodimon1.png"

export default function Greet(props) {
  return (
    <div className='greetScreen'>
    <div className='logoBox'>
        <img className='kodi' src={kodi} alt="" />
      <img className='logo' src={logo} alt="" />
    </div>
    <button className='newGame' onClick={props.newGame}>New Game</button>
    </div>
  )
}