import "./App.css";
import React from "react";
import Greet from "./Greet";
import Game from "./Game";

function App() {
  const [gameOn, setGameOn] = React.useState<boolean>(false);

  function changeGameOn() {
    console.log("ok");
    setGameOn(!gameOn);
  }

  return (
    <div className="App">
      {gameOn === false && (
        <Greet gameOn={gameOn} changeGameOn={changeGameOn} />
      )}
      {gameOn === true && <Game changeGameOn={changeGameOn} />}
    </div>
  );
}
export default App;
