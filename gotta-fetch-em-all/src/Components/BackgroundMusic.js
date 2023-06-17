import { useState } from 'react';
import Sound from 'react-sound';
import BackgroundMusic from '../Music/BackgroundMusic.mp3';
import FightMusic from '../Music/FightMusic.mp3';
import buttonOff from '../Images/volume-xmark-solid.svg';
import buttonOn from '../Images/volume-high-solid.svg';

const PlaySound = ({handleSongPlaying, handleSongFinsihedPlaying, gameState}) => {
    //handleSongLoading,
         const [isPlaying, setIsPLaying] = useState(false);
         const [battleMusicIsPlaying, setBattleMusicIsPlaying] = useState(true);


    return (gameState !== 'fight') ? (
    <div>
        <Sound
            url={BackgroundMusic}
            playStatus={
                isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
            }
            onPlaying={handleSongPlaying}
            onFinishedPlaying={handleSongFinsihedPlaying}
        />
        {/* <button className='soundBtn' onClick={() => setIsPLaying(!isPlaying)}>{isPlaying
            ? <span className="material-symbols-outlined">volume_up</span>
            : <span className="material-symbols-outlined">volume_off</span>}
        </button> */}
        <button className='soundBtn' style={{ backgroundImage: isPlaying ? `url(${buttonOn})` : `url(${buttonOff})` }} onClick={() => setIsPLaying(!isPlaying)}></button>
    </div>
    ) : (
    <div>
        <Sound
            url={FightMusic}
            playStatus={
                battleMusicIsPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
            }
            onPlaying={handleSongPlaying}
            onFinishedPlaying={handleSongFinsihedPlaying}
        />
        {/* <button className='soundBtn' onClick={() => setBattleMusicIsPlaying(!battleMusicIsPlaying)}>{battleMusicIsPlaying
            ? <span className="material-symbols-outlined">volume_up</span>
            : <span className="material-symbols-outlined">volume_off</span>}
         </button> */}
        <button className='soundBtn' style={{ backgroundImage: battleMusicIsPlaying ? `url(${buttonOn})` : `url(${buttonOff})` }} onClick={() => setBattleMusicIsPlaying(!battleMusicIsPlaying)}></button>
    </div>
    )
}

export default PlaySound;