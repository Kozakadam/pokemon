function FightStatus({chosenPokemon, enemyPokemon, playerHp, enemyHp, playerMultiplier, aiMultiplier}){
    // console.log(chosenPokemon)
    // console.log(enemyPokemon)
    // if (gameState === 'fight'){
        let playerColor = 'rgb(104, 229, 169, 1)';
        let enemyColor = 'rgb(104, 229, 169, 1)';
        const playerHpBarLength = Math.max((playerHp / (Number(chosenPokemon.stats[0].base_stat))) * 16, 0);
        if (playerHpBarLength < 4){
            playerColor = 'red';
        }else if (playerHpBarLength < 9){
            playerColor = 'orange';
        }
        const enemyHpBarLength = Math.max((enemyHp / (Number(enemyPokemon.stats[0].base_stat))) * 16, 0);
        if (enemyHpBarLength < 4){
            enemyColor = 'red';
        } else if (enemyHpBarLength < 9){
            enemyColor = 'orange';
        }
        return(
            <div className='fightBackground'>
                {/* <div ></div> */}
                <div className='chosenPokemon'>
                    <img className='pokemonImg' src={chosenPokemon.sprites.back_default} id={chosenPokemon.id} alt="chosen pokemon"></img>
                    <div className='pokemonCard'>
                        <div className='pokemonName'>{chosenPokemon.name}</div>
                        <span className='pokemonMulti'>{playerMultiplier} x</span>
                        <div className='hpBarContainer'>
                            <div className='hpLabel'>HP</div>
                            <div className='pokemonHpBackground'>
                                <div className='hpBar' style={{width: `${playerHpBarLength}vw`, backgroundColor: `${playerColor}`}}></div>
                            </div>
                        </div>
                        <div className='hpNumbers2'>{`${Math.max(playerHp, 0)}/${chosenPokemon.stats[0].base_stat}`}</div>
                    </div>
                    {/* <p>HP: {chosenPokemon.stats[0].base_stat}</p> */}
                    {/* <p>Attack: {chosenPokemon.stats[1].base_stat}</p>
                    <p>Defense: {chosenPokemon.stats[2].base_stat}</p> */}
                </div>
                <div className='enemyPokemon'>
                    <img className='pokemonImg' src={enemyPokemon.sprites.front_default} id={enemyPokemon.id} alt="enemy pokemon"></img>
                    <div className='pokemonCard'>
                        <div className='pokemonName'>{enemyPokemon.name}</div>
                        <span className='pokemonMulti'>{aiMultiplier} x</span>
                        <div className='hpBarContainer'>
                            <div className='hpLabel'>HP</div>
                            <div className='pokemonHpBackground'>
                                <div className='hpBar' style={{width: `${enemyHpBarLength}vw`, backgroundColor: `${enemyColor}`}}></div>
                            </div>
                        </div>
                        <div className='hpNumbers2'>{`${Math.max(enemyHp, 0)}/${enemyPokemon.stats[0].base_stat}`}</div>
                    </div>
                    {/* <p>HP: {enemyPokemon.stats[0].base_stat}</p> */}
                    {/* <p>Attack: {enemyPokemon.stats[1].base_stat}</p>
                    <p>Defense: {enemyPokemon.stats[2].base_stat}</p> */}
                </div>
            </div>
        )
}

export default FightStatus;