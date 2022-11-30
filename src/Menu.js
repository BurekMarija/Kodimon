import React from 'react'

export default function Menu(props) {
  return (
    <div>
      <div className='menuLable'>Menu</div>
      <div className='menu okvir'>
      <button onClick={props.changeGameOn}>Home</button>
      <button onClick={props.newGame}>New game</button>
      <button onClick={props.resetOpponent}>New opponent</button>
      </div>
      
    </div>
  )
}