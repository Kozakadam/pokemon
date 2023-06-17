import { useState, useEffect } from 'react';
import Sound from 'react-sound';
import './App.css';
import Location from './Components/Locations.js';
import OwnedPokemons from './Components/OwnedPokemons.js';
import Areas from './Components/Areas.js';
import FightStatus from './Components/FightStatus.js';
import StatusMessage from './Components/StatusMessage.js';
import KeepPokemonOrNot from './Components/KeepPokemonOrNot';
import PlaySound from './Components/BackgroundMusic';

const STARTER_POKEMONS = [
  'ekans',
  'sandaconda',
  'arbok',
  'seviper',
  'silicobra'
];

let playerMultiplier = 1;
let aiMultiplier = 1;

function App() {
  const [locations, setLocations] = useState([]);
  const [areas, setAreas] = useState([]);
  const [gameState, setGameState] = useState('location');
  const [ownedPokemons, setOwnedPokemons] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState({});
  const [chosenPokemon, setChosenPokemon] = useState({});
  const [playerHp, setPlayerHp] = useState(-1);
  const [enemyHp, setEnemyHp] = useState(-1);
  // const [damageMulti, setDamageMulti] = useState([1, 1]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const locations = await response.json();
      setLocations(locations.results);
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    function fetchOwnedPokemons(STARTER_POKEMONS) {
      const pokemonCollection = [];
      STARTER_POKEMONS.map(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const nextPokemon = await response.json();
        pokemonCollection.push(nextPokemon);
      });
      setOwnedPokemons(pokemonCollection);
    }
    fetchOwnedPokemons(STARTER_POKEMONS);
  }, []);

  useEffect(() => {
    if (playerHp > 0 && enemyHp > 0) {
      setTimeout(() => {
        fight();
      }, 1000);
    } else if (gameState === 'fight' && enemyHp <= 0) {
      setGameState('keepPokemonOrNot');
    }
  }, [playerHp]);

  async function selectLocation(locationId) {
    
    const regionResponse = await fetch(
      `https://pokeapi.co/api/v2/location/${locationId}`
      );
      const region = await regionResponse.json();
    setGameState('pokemonSelection');
    setAreas(region.areas);
    setGameState('location-area');
  }

  async function selectArea(areaId) {
    setAreas([]);
    setGameState('selectPokemon');

    const response = await fetch(
      `https://pokeapi.co/api/v2/location-area/${areaId}`
    );
    const region = await response.json();
    const encounters = region.pokemon_encounters;

    const randomPokemonIndex = Math.floor(Math.random() * encounters.length);
    const selectedEnemy = encounters[randomPokemonIndex].pokemon.name;

    const response2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${selectedEnemy}`
    );
    const pokemon = await response2.json();
    setEnemyPokemon(pokemon);
    setEnemyHp(Number(pokemon.stats[0].base_stat));
  }

  function calculateDmg(attack, defense, multiplier) {
    const random = Math.round(Math.random() * 38) + 217;
    return Math.max(Math.floor(
      (((((2 / 5 + 2) * attack * 60) / defense / 50 + 2) * random) / 255) * multiplier
    ), 1);
  }

  async function fight() {
    // console.log(playerMultiplier, aiMultiplier);
    const playerDmg = calculateDmg(
      Number(chosenPokemon.stats[1].base_stat),
      Number(enemyPokemon.stats[2].base_stat),
      playerMultiplier
    );
    console.log(playerDmg);
    setEnemyHp(() => enemyHp - playerDmg);
    // console.log(`Enemy HP = ${enemyHp}`);
    if (enemyHp > 0) {
      setTimeout(() => {
        const enemyDmg = calculateDmg(
          Number(enemyPokemon.stats[1].base_stat),
          Number(chosenPokemon.stats[2].base_stat),
          aiMultiplier
        );
        console.log(enemyDmg);
        setPlayerHp(() => playerHp - enemyDmg);
        // console.log(`Player HP = ${playerHp}`);
      }, 500);
    }
    
  }

 async function getPokemonTypes(playerPokemon, aiPokemon){
  playerMultiplier = 1;
  aiMultiplier = 1; 
  // const playerTypes = getTypes(playerPokemon);
  const aiTypes = getTypes(aiPokemon);
  console.log(playerPokemon.types);
  playerPokemon.types.map(async (type) => {
    const response = await fetch(type.type.url);
    const typeData = await response.json();
    // console.log(typeData);
    typeData.damage_relations.double_damage_from.map((type2) => 
      aiTypes.includes(type2.name) ? aiMultiplier = aiMultiplier * 2 : null);
    typeData.damage_relations.double_damage_to.map((type2) => 
      aiTypes.includes(type2.name) ? playerMultiplier = playerMultiplier * 2 : null);
    typeData.damage_relations.half_damage_from.map((type2) => 
      aiTypes.includes(type2.name) ? aiMultiplier = aiMultiplier * 0.5 : null);
    typeData.damage_relations.half_damage_to.map((type2) => 
      aiTypes.includes(type2.name) ? playerMultiplier = playerMultiplier * 0.5 : null);
    typeData.damage_relations.no_damage_from.map((type2) => 
      aiTypes.includes(type2.name) ? aiMultiplier = aiMultiplier * 0.25 : null);
    typeData.damage_relations.no_damage_to.map((type2) => 
      aiTypes.includes(type2.name) ? playerMultiplier = playerMultiplier * 0.25 : null);
  });
}

function getTypes(pokemon){
  const types = []
  pokemon.types.map((type) => {
    types.push(type.type.name);
  });
  return types;
}

/**
 * Choose a pokemon from the owned pokemons.
 * @constructor
 * @param {event} title - Click to the button of the chosen pokemon.
 */
function choosePokemon(event) {
  const chosenPokemonId = Number(event.currentTarget.id);
  ownedPokemons.forEach((pokemon) => {
    if (pokemon.id === chosenPokemonId) {
      getPokemonTypes(pokemon, enemyPokemon);
      setPlayerHp(Number(pokemon.stats[0].base_stat));
      setChosenPokemon(pokemon);
      setGameState('fight');
    }
  });

 }

  function reTry() {
    setGameState('location');
  }

  //Change one of our owned pokemon with the defeated one.
  async function changePokemon(event) {
    const chosenPokemonId = Number(event.currentTarget.id);
    const newGang = ownedPokemons.filter(
      (pokemon) => Number(pokemon.id) !== chosenPokemonId
    );
    newGang.push(enemyPokemon);
    setOwnedPokemons([...newGang]);
    setGameState('location');
  }
  
  async function addPokemon() {
    setOwnedPokemons([...ownedPokemons, enemyPokemon]);
    setGameState('location');
  }

  return (
    <div className="App">
      {/* {gameState !== 'fight' && <PlaySound/>} */}
      {/* <PlaySound gameState={gameState} /> */}
      {gameState === 'location' && (
        <Location locations={locations} onSelect={selectLocation} />
      )}
      {gameState === 'location-area' && (
        <Areas areas={areas} onSelect={selectArea} reTry={reTry} />
      )}
      {gameState === 'selectPokemon' && (
        <OwnedPokemons
          ownedPokemons={ownedPokemons}
          gameState={gameState}
          chosenPokemon={choosePokemon}
        />
      )}
      {gameState === 'fight' && (
        <FightStatus
          chosenPokemon={chosenPokemon}
          enemyPokemon={enemyPokemon}
          playerHp={playerHp}
          enemyHp={enemyHp}
          gameState={gameState}
          playerMultiplier={playerMultiplier}
          aiMultiplier={aiMultiplier}
        />
      )}
      <StatusMessage
        playerHp={playerHp}
        enemyHp={enemyHp}
        gameState={gameState}
        reTry={reTry}
      />
      {gameState === 'keepPokemonOrNot' && (
        <KeepPokemonOrNot
          ownedPokemons={ownedPokemons}
          enemyPokemon={enemyPokemon}
          changePokemon={changePokemon}
          addPokemon={addPokemon}
          reTry={reTry}
        />
      )}
    </div>
  );
}

export default App;
