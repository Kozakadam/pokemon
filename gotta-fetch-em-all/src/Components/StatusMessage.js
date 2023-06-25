function StatusMessage({ playerHp, enemyHp, gameState, reTry, accept, enemyPokemon, chosenPokemon }){
    const gainedExp = Math.round(enemyPokemon.base_experience * enemyPokemon.level / 7);
    const isLevelUp = (chosenPokemon.experience - gainedExp) < Math.pow(chosenPokemon.level, 3);
        return (
            <div>
                {gameState === 'fight' && playerHp <= 0
                ? <div className='statusMessage'>
                    <h1>You Lost!</h1>
                    <button className='reTryButton' onClick={reTry}>Ok I guess</button>
                </div>
                : null}
                {gameState === 'fight' && enemyHp <= 0 && isLevelUp 
                ? <div className='statusMessage'>
                    <h1>Congratulations!</h1>
                    <h3>Your <span className='capitlaize'>{chosenPokemon.name}</span> gained {gainedExp} experience and leveled up!</h3>
                    <h3>It is now level {chosenPokemon.level}</h3>
                    <button className='reTryButton' onClick={accept}>Ok I guess</button>
                </div>
                : null}
                {gameState === 'fight' && enemyHp <= 0 && !isLevelUp
                ? <div className='statusMessage'>
                    <h1>Congratulations!</h1>
                    <h3>Your <span className='capitalize'>{chosenPokemon.name}</span> gained {gainedExp} experience!</h3>
                    <button className='reTryButton' onClick={accept}>Ok I guess</button>
                </div>
                : null}
            </div>
        )
}

export default StatusMessage;