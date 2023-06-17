function KeepPokemonOrNot({ownedPokemons, enemyPokemon, changePokemon, addPokemon, reTry}) {

   return (
    <div>
        <div className='selectionBackground'>
            <div className='pokemonChangeContainer'>
                {ownedPokemons.map((pokemon) => {
                    return <button className='changePokemonsButton' key={pokemon.id} id={pokemon.id} onClick={(e) => changePokemon(e)}>
                                <img className='pokemonChangeImg' src={pokemon.sprites.front_default}  alt="my pokemon" ></img>
                                <span className='pokemonChangeName'>{pokemon.name}</span>
                            </button>
                })}
                {ownedPokemons.length < 6 
                ?   <button className='addPokemonsButton' onClick={(e) => addPokemon(e)}>
                        <span className='plusButton'>+</span>
                    </button> 
                : null}
            </div>
        </div>
        <div className='newPokemon' key={enemyPokemon.id} id={enemyPokemon.id}>
            <img className='newPokemonImg' src={enemyPokemon.sprites.front_default}  alt="my newPokemon" ></img>
            <span className='newPokemonName'>{enemyPokemon.name}</span>
        <button className='skipButton' onClick={reTry}>Skip</button>
        </div>
    </div>
)}

export default KeepPokemonOrNot