function Pokemons({ owner, pokemon, multiplier, hp, exp }){

    let direction = 'back_default';
    if ( owner === 'enemyPokemon'){
        direction = 'front_default';
    }

    const hpBarLength = Math.max((hp / (Number(pokemon.stats[0].stat.value))) * 16, 0);
    let color = 'rgb(104, 229, 169, 1)';
    if (hpBarLength < 4) color = 'red';
    else if (hpBarLength < 9) color = 'orange';

    // const currentExp = pokemon.experience - Math.pow(pokemon.level, 3);
    let maxExp = Math.pow(pokemon.level + 1, 3) - Math.pow(pokemon.level, 3);
    let currentExp = exp;
    // if ((currentExp / maxExp) >= 1){
    //     currentExp = currentExp - maxExp;

    // }
    const xpBarLength = (currentExp / maxExp) * 16;

    return(
        <div className={owner}>
            <img className='pokemonImg' src={pokemon.sprites[direction]} id={pokemon.id} alt="chosen pokemon"></img>
            <div className='pokemonCard'>
                <div className='pokemonName'>{pokemon.name}</div>
                <span className='pokemonMulti'>Lv {pokemon.level}</span>
                <div className='hpBarContainer'>
                    <div className='hpLabel'>HP</div>
                    <div className='pokemonHpBackground'>
                        <div className='hpBar' style={{width: `${hpBarLength}vw`, backgroundColor: `${color}`}}></div>
                    </div>
                </div>
                <div className='hpNumbers2'>{`${Math.max(hp, 0)}/${pokemon.stats[0].stat.value}`}</div>
            </div>
            {owner === 'chosenPokemon' 
            ? <div className='xpBarContainer'>
                <div className='xpBarBackgroundFight'></div>
                <div className='xpBarFight' style={{width: `${xpBarLength}vw`}}></div>
                <span className='xpLabel'>EXP</span>
            </div>
            : null}
        </div>
    )
}

export default Pokemons;