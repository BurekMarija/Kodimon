import './App.css';
import React from 'react';
import Greet from './Greet';
import Game from './Game';

function App() {
  const [gameOn, setGameOn] =React.useState(false)

  function newGame(){
    setGameOn(!gameOn)
  }

  return (
    <div className="App">
     {gameOn===false &&
     <Greet gameOn={gameOn}
            newGame={newGame}
     />}
     {gameOn===true && <Game/>}
    </div>
  );
}
export default App;