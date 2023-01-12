import React from "react";
import "./App.css";
import Pokemon from "./Pokemon";
import Menu from "./Menu";
import Logs from "./Logs";
import arrow from "./images/arrow.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "./";
import { setPobjedik } from "./reducer/pobjednik";
import { addLog, resetLog } from "./reducer/logsReducer";
import CSS from "csstype";

interface Props {
  changeGameOn: () => void;
}

export interface PokemonI {
  name: string;
  url: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  life: number;
  class: string;
}

export default function Game(props: Props) {
  const [pokemon1, setPokemon1] = React.useState<PokemonI | undefined>();
  const [pokemon2, setPokemon2] = React.useState<PokemonI | undefined>();
  const [onOfense, setOfense] = React.useState<number>(0);
  const [napad, setNapad] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>();
  let messagePos: CSS.Properties = {};
  let styleProb: CSS.Properties = {};
  const pobjednik = useSelector((state) => state.pobjednikReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    catchPokemons();
    // ovo je bilo namjerno, jebi se ESLint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (onOfense === 0) {
      if (pokemon1 && pokemon2) {
        if (pokemon1.speed > pokemon2.speed) {
          setOfense(1);
        }
        if (pokemon1.speed < pokemon2.speed) {
          setOfense(2);
        }
      }
    }
  }, [pokemon1, pokemon2, onOfense]);

  //Napad logika i izračun
  function attack() {
    if (pokemon1 && pokemon2) {
      let broj = Math.floor(Math.random() * 5) + 1;
      const gumb = document.getElementById(
        "attackButton"
      ) as HTMLButtonElement | null;
      if (gumb !== null) {
        gumb.disabled = true;
      }

      if (broj > 4) {
        dispatch(
          addLog(`${onOfense === 1 ? pokemon1.name : pokemon2.name} missed`)
        );
        if (onOfense === 1) {
          const zamjenskiPok1 = { ...pokemon1, class: "animateMiss" };
          setPokemon1(zamjenskiPok1);
          const zamjenskiPok2 = { ...pokemon2, class: "" };
          setPokemon2(zamjenskiPok2);
          setNapad(true);
          setMessage("Miss");
        }

        if (onOfense === 2) {
          const zamjenskiPok2 = { ...pokemon2, class: "animateMiss" };
          setPokemon1(zamjenskiPok2);
          const zamjenskiPok1 = { ...pokemon1, class: "" };
          setPokemon2(zamjenskiPok1);
          setNapad(true);
          setMessage("Miss");
        }
        setOfense((prije) => (onOfense === 1 ? 2 : 1));
        return;
      }

      if (onOfense === 1) {
        let allAttack = (pokemon1.attack / 2 / 100) * (100 - pokemon2.defense);
        let round = Math.round(allAttack * 100) / 100;
        let newLife = pokemon2.life - round;
        if (newLife <= 0) {
          dispatch(setPobjedik(pokemon1.name));
        }
        setNapad(true);
        setMessage(round + " DMG");
        const zamjenskiPok2 = { ...pokemon2, life: newLife, class: "" };
        setPokemon2(zamjenskiPok2);
        dispatch(
          addLog(`${pokemon1.name} attaked ${pokemon2.name} for ${round} dmg`)
        );
        const zamjenskiPok1 = { ...pokemon1, class: "animate1" };
        setPokemon1(zamjenskiPok1);
        setOfense(2);
      }
      if (onOfense === 2) {
        let allAttack = (pokemon2.attack / 2 / 100) * (100 - pokemon1.defense);
        let round = Math.round(allAttack * 100) / 100;
        let newLife = pokemon1.life - round;
        if (newLife <= 0) {
          dispatch(setPobjedik(pokemon2.name));
        }
        setNapad(true);
        setMessage(round + " DMG");
        const zamjenskiPok1 = { ...pokemon1, life: newLife, class: "" };
        setPokemon1(zamjenskiPok1);
        dispatch(
          addLog(`${pokemon2.name} attaked ${pokemon1.name} for ${round} dmg`)
        );
        const zamjenskiPok2 = { ...pokemon2, class: "animate2" };
        setPokemon2(zamjenskiPok2);
        setOfense(1);
      }
    }
  }

  //Delay za trajanje attack-a
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setNapad(false);
      const gumb = document.getElementById(
        "attackButton"
      ) as HTMLButtonElement | null;
      if (gumb !== null) {
        gumb.disabled = false;
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [onOfense]);

  //New game
  function newGame() {
    dispatch(setPobjedik(null));
    catchPokemons();
    dispatch(resetLog());
    setOfense(0);
    setNapad(false);
  }

  //Uhvati pokemona
  function getPokemon(id: number) {
    let broj = Math.floor(Math.random() * 20) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${broj}`)
      .then((res) => res.json())
      .then((data) => {
        let pok: PokemonI = {
          name: data.name,
          url: data.sprites.back_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          life: data.stats[0].base_stat,
          class: "",
        };
        id === 1 ? setPokemon1(pok) : setPokemon2(pok);
      });
  }

  //Reset opponent
  function resetOpponent() {
    dispatch(setPobjedik(null));
    if (pokemon1) {
      const zamjenskiPok1 = { ...pokemon1, life: pokemon1.hp };
      setPokemon1(zamjenskiPok1);
    }
    getPokemon(2);
    setOfense(0);
  }

  //Postavljane oba pokemona
  function catchPokemons() {
    getPokemon(1);
    getPokemon(2);
  }

  const shade = {
    opacity: pobjednik === null ? 1 : 0.3,
  };
  const shade2 = {
    opacity: napad === false ? 1 : 0.3,
  };

  if (onOfense === 2) {
    messagePos = {
      position: "absolute",
      top: "10%",
      left: "60%",
      transform: "rotate(-20deg)",
      color: message === "Miss" ? "black" : "red",
    };
  }
  if (onOfense === 1) {
    messagePos = {
      position: "absolute",
      top: "10%",
      left: "30%",
      transform: "rotate(20deg)",
      color: message === "Miss" ? "black" : "red",
    };
  }

  if (pobjednik !== null) {
    styleProb = {
      position: "absolute",
      top: "20%",
      left: "40%",
    };
  }

  return (
    <div className="mainBox">
      {pobjednik !== null && <h1 className="pobjednik">{pobjednik} won</h1>}
      <div className="battleBox" style={shade}>
        {pokemon1 && <Pokemon id={1} pokemon={pokemon1} />}
        <div className="attackBox">
          {napad && (
            <div style={messagePos} className="message">
              {message}
            </div>
          )}
          <img
            src={arrow}
            alt=""
            id="arrow"
            style={{
              transform: onOfense === 1 ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
          <button id="attackButton" style={shade2} onClick={attack}>
            Attack!
          </button>
        </div>
        {pokemon2 && <Pokemon id={2} pokemon={pokemon2} />}
      </div>
      <div className="down">
        <div style={styleProb}>
          <Menu
            changeGameOn={props.changeGameOn}
            newGame={newGame}
            resetOpponent={resetOpponent}
          />
        </div>
        <div style={shade}>
          <Logs />
        </div>
      </div>
    </div>
  );
}
