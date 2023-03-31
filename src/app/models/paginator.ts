import { POKEMON_DATA } from "./pokemon";

export interface PAGINATOR{
    data: POKEMON_DATA[],
    itemsPerPage: number,
    currentPage: number,
}