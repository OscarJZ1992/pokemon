const BASE_URL = "https://pokeapi.co/api/v2"
const API_URL = {
    LIST_POKEMON: `${BASE_URL}/pokemon`,
    TYPE_POKEMON: `${BASE_URL}/type`,
}

const DAMAGES_RELATIONS = {
    double_damage_from: -70,
    double_damage_to: +70,
    half_damage_from: -30,
    half_damage_to: +30,
    no_damage_from: 0,
    no_damage_to: 0
}

export { API_URL, DAMAGES_RELATIONS } 