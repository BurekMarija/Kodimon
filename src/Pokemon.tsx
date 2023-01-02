import React from "react";
import { PokemonI } from "./Game";

interface Props {
  pokemon: PokemonI;
  id: number;
}

export default function Pokemon(props: Props) {
  let percentStyle = {};
  let progresBarStyle = {};
  let progresStyle = {};
  let percent = Math.round((props.pokemon.life / props.pokemon.hp) * 100);
  if (percent < 0) {
    percent = 0;
  }
  if (percent < 30) {
    progresBarStyle = { border: "1px solid red" };
    percentStyle = { color: "red" };
    progresStyle = { backgroundColor: "#FF7575", width: percent + "%" };
  } else if (percent > 30 && percent < 50) {
    progresStyle = { backgroundColor: "orange", width: percent + "%" };
    percentStyle = { color: "orange" };
    progresBarStyle = { border: "1px solid orange" };
  } else if (percent > 50) {
    percentStyle = { color: "#079325" };
    progresBarStyle = { border: "1px solid #079325" };
    progresStyle = { backgroundColor: "#62FF84", width: percent + "%" };
  }

  return (
    <div className="pokemonBox">
      <div>
        <div className="percent" style={percentStyle}>
          {percent + "%"}
        </div>
        <div className="progresBar" style={progresBarStyle}>
          <div className="progres" style={progresStyle}></div>
        </div>
      </div>
      <div className="name">{props.pokemon.name}</div>
      <div>
        <img
          className={`pokemonImg ${props.pokemon.class}`}
          id={`img${props.id}`}
          src={props.pokemon.url}
          alt=""
        />
      </div>
      <div className="statsTag">Stats</div>
      <div className="stats okvir">
        <div>HP:{props.pokemon.hp}</div>
        <div>Attack:{props.pokemon.attack}</div>
        <div>Defense:{props.pokemon.defense}</div>
        <div>Speed:{props.pokemon.speed}</div>
      </div>
    </div>
  );
}
