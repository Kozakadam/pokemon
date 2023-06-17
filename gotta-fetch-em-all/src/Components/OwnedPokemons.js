function OwnedPokemons({ownedPokemons, gameState, chosenPokemon}){
        return(
            <div className='selectionBackground'>
                <div className='pokemonSelectionContainer'>
                    {ownedPokemons.map((pokemon) => {
                    return <button className='ownedPokemonsButton' key={pokemon.id} id={pokemon.id} onClick={(e) => chosenPokemon(e)}>
                            <img className='pokemonSelectionImg' src={pokemon.sprites.front_default}  alt="my pokemon" ></img>
                            <span className='pokemonSelectionName'>{pokemon.name}</span>
                            <div className='hpBarContainer2'>
                                <div className='hpLabel'>HP</div>
                                <div className='pokemonHpBackground2'>
                                    <div className='hpBar'></div>
                                </div>
                            </div>
                            <div className='hpNumbers'>{`${pokemon.stats[0].base_stat}/${pokemon.stats[0].base_stat}`}</div>
                        </button>
                    })}
                </div>
            </div>
        )
}

export default OwnedPokemons;