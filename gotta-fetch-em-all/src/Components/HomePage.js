import logo from '../Images/pokemon-logo.png';

function HomePage({setGameState}){
    function handleStart(){
        setGameState(() => 'location');
    }
    return (
        <div className='startMenu'>
            <img src={logo} alt='pokemon-logo' className='pokemonLogo'></img>
            <div className='startContext'>Press Start to Play</div>
            <button className='startButton' onClick={handleStart}>Start</button>
        </div>
    )
};

export default HomePage;