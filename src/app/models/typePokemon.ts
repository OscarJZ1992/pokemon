interface TYPE_POKEMON_DETAIL {
    url: string,
    name: string,
}

interface TYPE_POKEMON {
    slot: number,
    type: TYPE_POKEMON_DETAIL
}

export { TYPE_POKEMON_DETAIL, TYPE_POKEMON }