function Location({locations, onSelect}){
    return(
        <div className='locationContainer'>
            {locations.map((location, i) => {
                const splitUrl = location.url.split('/');
               const newKey = splitUrl[splitUrl.length - 2];
               return <button className='locationButton' key={newKey} onClick={() => onSelect(newKey)}>
                    {location.name}
                </button>
            })
            }
        </div>
    )
}

export default Location;