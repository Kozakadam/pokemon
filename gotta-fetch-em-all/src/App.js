import { useState, useEffect } from 'react';
import './App.css';

import Location from './Components/Locations.js';
import OwnedPokemons from './Components/OwnedPokemons.js';
import Areas from './Components/Areas.js';
import FightStatus from './Components/FightStatus.js';
import StatusMessage from './Components/StatusMessage.js';
import KeepPokemonOrNot from './Components/KeepPokemonOrNot';
import HomePage from './Components/HomePage';
import SelectStarter from './Components/SelectStarter';

// import Sound from 'react-sound';
// import PlaySound from './Components/BackgroundMusic';

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
  const [gameState, setGameState] = useState('start');
  const [ownedPokemons, setOwnedPokemons] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState({});
  const [chosenPokemon, setChosenPokemon] = useState({});
  const [playerHp, setPlayerHp] = useState(-1);
  const [enemyHp, setEnemyHp] = useState(-1);
  const [turn, setTurn] = useState(0)
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
  }, [turn]);

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

  function fight() {
    console.log(playerMultiplier, aiMultiplier);
    console.log(chosenPokemon);
    const playerDmg = calculateDmg(
      Number(chosenPokemon.stats[1].base_stat),
      Number(enemyPokemon.stats[2].base_stat),
      playerMultiplier
    );
    console.log(playerDmg);
    setEnemyHp(() => enemyHp - playerDmg);
    console.log(`Enemy HP = ${enemyHp}`);
    if (enemyHp > 0) {
      setTimeout(() => {
        const enemyDmg = calculateDmg(
          Number(enemyPokemon.stats[1].base_stat),
          Number(chosenPokemon.stats[2].base_stat),
          aiMultiplier
        );
        console.log(enemyDmg);
        setPlayerHp(() => playerHp - enemyDmg);
        if (playerHp <= 0 && playerHp !== -1){
          setGameState('location');
        }
        console.log(`Player HP = ${playerHp}`);
        setTurn(() => turn + 1);
      }, 1000);
    } else {
        setGameState('keepPokemonOrNot');
    }
  }

  async function startFight(pokemon){
    await getPokemonTypes(pokemon, enemyPokemon);
    setGameState('fight');
    setTurn(1);
  }

 async function getPokemonTypes(playerPokemon, aiPokemon){
  const aiTypes = getTypes(aiPokemon);
  playerPokemon.types.map(async (type) => {
    const response = await fetch(type.type.url);
    const typeData = await response.json();
    // console.log(typeData);
    updateMultipliers(typeData, aiTypes);
  });
}

function updateMultipliers(typeData, aiTypes){
  playerMultiplier = 1;
  aiMultiplier = 1; 
  typeData.damage_relations.double_damage_from.forEach((type2) => 
  aiTypes.includes(type2.name) ? aiMultiplier *= 2 : null);
typeData.damage_relations.double_damage_to.forEach((type2) => 
  aiTypes.includes(type2.name) ? playerMultiplier *= 2 : null);
typeData.damage_relations.half_damage_from.forEach((type2) => 
  aiTypes.includes(type2.name) ? aiMultiplier *= 0.5 : null);
typeData.damage_relations.half_damage_to.forEach((type2) => 
  aiTypes.includes(type2.name) ? playerMultiplier *= 0.5 : null);
typeData.damage_relations.no_damage_from.forEach((type2) => 
  aiTypes.includes(type2.name) ? aiMultiplier *= 0.25 : null);
typeData.damage_relations.no_damage_to.forEach((type2) => 
  aiTypes.includes(type2.name) ? playerMultiplier *= 0.25 : null);
}

function getTypes(pokemon){
  const types = []
  pokemon.types.forEach((type) => {
    types.push(type.type.name);
  });
  return types;
}

async function choosePokemon(event) {
  const chosenPokemonId = Number(event.currentTarget.id);
  const selectedPokemon = ownedPokemons.find((pokemon) => (pokemon.id === chosenPokemonId));
  setChosenPokemon(() => selectedPokemon);
  setPlayerHp(() => Number(selectedPokemon.stats[0].base_stat));
  startFight(selectedPokemon);
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
      <div className='menuContainer'>
      </div>
      <div className='gameContainer'>
        {/* {gameState !== 'fight' && <PlaySound/>} */}
        {/* <PlaySound gameState={gameState} /> */}
        {gameState === 'start' && (
          <HomePage setGameState={setGameState} />
        )}
        {gameState === 'selectStarter' && (
          <HomePage setGameState={setGameState} />
        )}
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
    </div>
  );
}

export default App;
