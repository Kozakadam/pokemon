function OwnedPokemons({ownedPokemons, chosenPokemon}){
    return(
        <div className='selectionBackground'>
            <div className='pokemonSelectionContainer'>
                {ownedPokemons.map((pokemon) => {
                    const currentExp = pokemon.experience - Math.pow(pokemon.level, 3);
                    const maxExp = Math.pow(pokemon.level + 1, 3) - Math.pow(pokemon.level, 3);
                    const xpBarLength = (currentExp / maxExp) * 11;
                return <button className='ownedPokemonsButton' key={pokemon.id} id={pokemon.id} onClick={(e) => chosenPokemon(e)}>
                        <img className='pokemonSelectionImg' src={pokemon.sprites.front_default}  alt="my pokemon" ></img>
                        <span className='pokemonSelectionName'>{pokemon.name}</span>
                        <div className='hpBarContainer2'>
                            <div className='hpLabel'>HP</div>
                            <div className='pokemonHpBackground2'>
                                <div className='hpBar'></div>
                            </div>
                        <div className='xpBarBackground'></div>
                        <div className='xpBar' style={{width: `${xpBarLength}vw`}}></div>
                        </div>
                        <div className='hpNumbers'>{`${pokemon.stats[0].stat.value}/${pokemon.stats[0].stat.value}`}</div>
                    </button>
                })}
            </div>
        </div>
    )
}

export default OwnedPokemons;