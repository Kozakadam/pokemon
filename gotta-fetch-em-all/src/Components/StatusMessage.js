function StatusMessage({playerHp, enemyHp, gameState, reTry}){
    if (gameState === 'fight' && playerHp <= 0){
        return (
            <div className='statusMessage'>
                <h1>You Lost!</h1>
                <button className='reTryButton' onClick={reTry}>Ok I guess</button>
            </div>
        )
    } else if (gameState === 'fight' && enemyHp <= 0){
        return (
            <div className='statusMessage'>
                <h1>You Won!</h1>
            </div>
        )
    }
}

export default StatusMessage;