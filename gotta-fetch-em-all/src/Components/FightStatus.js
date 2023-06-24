import Pokemon from './Pokemon';

function FightStatus({chosenPokemon, enemyPokemon, playerHp, enemyHp, playerMultiplier, aiMultiplier}){
        return(
            <div className='fightBackground'>
                <Pokemon
                owner={'chosenPokemon'}
                pokemon={chosenPokemon}
                multiplier={playerMultiplier}
                hp={playerHp}/>

                <Pokemon
                owner={'enemyPokemon'}
                pokemon={enemyPokemon}
                multiplier={aiMultiplier}
                hp={enemyHp}/>
            </div>
        )
}

export default FightStatus;