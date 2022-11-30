import React from 'react'

export default function Menu(props) {
  return (
    <div>
      <div className='menuLable'>Menu</div>
      <div className='menu okvir'>
      <button onClick={props.changeGameOn}>Home</button>
      <button>New game</button>
      <button>New opponent</button>
      </div>
      
    </div>
  )
}