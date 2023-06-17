function Areas({areas, onSelect, reTry}){
    return(
        <div className='areaContainer'>
            {areas.length > 0 
                ? areas.map((area) => {
                    const splitUrl = area.url.split('/');
                    const newKey = splitUrl[splitUrl.length - 2];
                    return <button className='areaButton' key={newKey} onClick={() => onSelect(newKey)}>
                        {area.name}
                    </button>
                })
                : <button className='rocketTeamButton' onClick={reTry}>
                    <p>
                        Prepare for trouble! 
                    </p>
                    <p>
                        And make it double!
                    </p>
                    <p>
                        To protect the world from devastation!
                    </p>
                    <p>
                        To unite all peoples within our nation!
                    </p>
                    <p>
                        To denounce the evils of truth and love!
                    </p>
                    <p>
                        To extend our reach to the stars above!
                    </p>
                        Jessie! James!
                    <p>
                        Team Rocket blasts off at the speed of light!
                    </p>
                    <p>
                        Surrender now, or prepare to fight!
                    </p>
                    <p>
                        Meowth! That's right!
                    </p>
                    <div className='rocketTeamContainer'>
                        <div className='rocketImg'></div>
                    </div>
                    

                </button>
            }
        </div>
    )
}

export default Areas;