function KeepPokemonOrNot({ownedPokemons, enemyPokemon, changePokemon, addPokemon, reTry, exp}) {

   return (
    <div>
        <div className='selectionBackground'>
            <div className='pokemonChangeContainer'>
                {ownedPokemons.sort((a, b) => (a.slot - b.slot)).map((pokemon) => {
                    const currentExp = pokemon.experience - Math.pow(pokemon.level, 3);
                    const maxExp = Math.pow(pokemon.level + 1, 3) - Math.pow(pokemon.level, 3);
                    const xpBarLength = (currentExp / maxExp) * 11;
                    return <button className='changePokemonsButton' key={pokemon.id} id={pokemon.id} onClick={(e) => changePokemon(e)}>
                                <img className='pokemonChangeImg' src={pokemon.sprites.front_default}  alt="my pokemon" ></img>
                                <span className='pokemonChangeName'>{pokemon.name}</span>
                                <div className='hpBarContainer2'>
                                    <div className='hpLabel'>HP</div>
                                    <div className='pokemonHpBackground2'>
                                        <div className='hpBar'></div>
                                    </div>
                                    <div className='xpBarBackground'></div>
                                    <div className='xpBar' style={{width: `${xpBarLength}vw`}}></div>
                                </div>
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