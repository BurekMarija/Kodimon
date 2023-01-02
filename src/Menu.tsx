import React from "react";

interface Props {
  changeGameOn: () => void;
  newGame: () => void;
  resetOpponent: () => void;
}

export default function Menu(props: Props) {
  return (
    <div>
      <div className="menuLable">Menu</div>
      <div className="menu okvir">
        <button onClick={props.changeGameOn}>Home</button>
        <button onClick={props.newGame}>New game</button>
        <button onClick={props.resetOpponent}>New opponent</button>
      </div>
    </div>
  );
}
