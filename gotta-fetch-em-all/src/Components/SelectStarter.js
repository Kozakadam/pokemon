function SelectStarter({ setGameState, setOwnedPokemons, starterSelection}){

    async function selectPokemon(e){
        const id = Number(e.currentTarget.id);
        const selectedPokemon = starterSelection.filter((pokemon) => 
            Number(pokemon.id) === id);
        setOwnedPokemons(() => selectedPokemon);
        setGameState(() => 'location');
    }
    return(
        <div className='starterContainer'>
            <div className='starterTitle'>Choose your starter pokemon!</div>
            <div className='starterGrid'>
                {starterSelection.map((pokemon) => {
                    return (
                        <button key={pokemon.id} id={pokemon.id} className='starterPokemon' onClick={(e) => selectPokemon(e)}>
                            <img className='starterImg' src={pokemon.sprites.front_default} alt='pokemon'></img>    
                            <div className='starterName'>{pokemon.name}</div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SelectStarter;