import { TYPE_POKEMON } from "./typePokemon"


interface POKEMON_DATA {
    name: string,
    url: string,
    id: string,
    img: string
    selected: boolean,
    type?: TYPE_POKEMON[],
    damage_relations: DAMAGE_RELATIONS[],
    statusFight?: boolean,
    pointsFight: number,
    results?: any[]
}

interface STAT {
    name: string,
    url: string
}

interface STATS {
    base_stat: number,
    effort: number,
    stat: STAT
}

interface DAMAGE_RELATIONS {
    [index: string]: any
    double_damage_from: [STAT]
    double_damage_to: [STAT]
    half_damage_from: [STAT]
    half_damage_to: [STAT]
    no_damage_from: [STAT]
    no_damage_to: [STAT]
}

interface DETAIL_POKEMON {
    abilities: any[],
    base_experience: number,
    forms: any[],
    game_indices: any[],
    height: number,
    held_items: any[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: any[],
    name: string,
    order: number,
    past_types: any[],
    species: {},
    sprites: {},
    stats: STATS[],
    types: TYPE_POKEMON[],
    weight: number,
    img?: string
    selected?: boolean,

}

export {
    POKEMON_DATA,
    DETAIL_POKEMON,
    STATS,
    STAT,
    DAMAGE_RELATIONS
}