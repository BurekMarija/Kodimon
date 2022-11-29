import React from 'react'
import Pokemon from './Pokemon';

export default function Game() {
   
 const prvi=Math.floor(Math.random() * 20) + 1;
 const drugi=Math.floor(Math.random() * 20) + 1;
  return (
    <div>
        <h1>Kaj pise</h1>
        <Pokemon />
        <Pokemon />
    </div>
 )
}