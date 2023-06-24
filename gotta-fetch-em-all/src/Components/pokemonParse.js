function pokemonParse(pokemon, level){

    const hpIv = Math.floor(Math.random() * 15);
    const attackIv = Math.floor(Math.random() * 15);
    const defenseIv = Math.floor(Math.random() * 15);
    const speedIv = Math.floor(Math.random() * 15);

    const hpValue = Math.floor((((Number(pokemon.stats[0].base_stat) + hpIv) * 2 * level) / 100) + level + 10);
    const attackValue =  Math.floor((((Number(pokemon.stats[1].base_stat) + attackIv) * 2 * level) / 100) + 5);
    const defenseValue = Math.floor((((Number(pokemon.stats[2].base_stat) + defenseIv) * 2 * level) / 100) + 5);
    const speedValue = Math.floor((((Number(pokemon.stats[5].base_stat) + speedIv) * 2 * level) / 100) + 5);

    const experience = Math.pow(level, 3);


    const pokemonData = {
        name: pokemon.name,
        level: level,
        experience: experience,
        base_experience: Number(pokemon.base_experience),
        id: pokemon.id,
        sprites: {
            back_default: pokemon.sprites.back_default,
            front_default: pokemon.sprites.front_default
        },
        stats: [{
            base_stat: Number(pokemon.stats[0].base_stat),
            stat: {
                name: 'hp',
                value: hpValue,
                iv: hpIv
                }
            },
            {
            base_stat: Number(pokemon.stats[1].base_stat),
            stat: {
                name: "attack",
                value: attackValue,
                iv: attackIv
                }
            },
            {
            base_stat: Number(pokemon.stats[2].base_stat),
            stat: {
                name: "defense",
                value: defenseValue,
                iv: defenseIv
                }
            },
            {
            base_stat: Number(pokemon.stats[5].base_stat),
            stat: {
                name: "speed",
                value: speedValue,
                iv: speedIv
                }
            }
        ],
        types: pokemon.types
    }
    return pokemonData;
  }

  export default pokemonParse;