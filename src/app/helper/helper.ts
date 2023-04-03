import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ServicesService } from '../services/pokemon.service';
import { DETAIL_POKEMON, POKEMON_DATA } from '../models/pokemon';
import { API_URL } from "../utils/constants";

@Injectable({
    providedIn: 'root'
})
export class HelperPokemon {
    constructor(private services: ServicesService) { }

    types: any[] = []
    /**
     * !TODO: All params are required 
     * @param offset start query to pokemon
     * @param limit limit of pokemon
     * @returns List of pokemon
     */

    private getImageByPokemon = (idPokemon: string): string => {
        return `../../assets/images/pokemons/151_pokemon/${idPokemon}.png`
    }

    /**
     * Removed aditional zeros on number
     * Eg. 001 => 1
     * @param idPokemon 
     * @returns 
     */
    private formatIdPokemon = (idPokemon: number): string => {
        return idPokemon < 100 && idPokemon > 0 ? idPokemon.toString().padStart(3, "0") : idPokemon.toString();
    }

    public getListPokemon = (offset: number, limit: number) => {
        return this.services.getListPokemon(`${API_URL.LIST_POKEMON}/?offset=${offset}&limit=${limit}`)
    }

    /**
     * @param pokemones pokemon list without id format
     * @returns pokemon list formated with id and img
     */
    public getIdByPokemon = (pokemones: POKEMON_DATA[]) => {
        return pokemones.map(({ url, name }) => {
            //access to the six element (Id) pokemon
            const idPokemon = parseInt(url.split("/")[6])
            return { id: this.formatIdPokemon(idPokemon), img: this.getImageByPokemon(this.formatIdPokemon(idPokemon)), name, url, selected: false, damage_relations: [], statusFight: false, pointsFight: 0 }
        })
    }

    public getDetailPokemon(pokemones: POKEMON_DATA[]) {
        const requests = []
        for (let i = 0; i < pokemones.length; i++) {
            requests.push(this.services.getDetailPokemon(`${API_URL.LIST_POKEMON}/${pokemones[i].name}/`))
        }
        return forkJoin(requests);
    }

    /**
     * Function to associate to the pokemon list each of its types.
     * @param pokemones 
     * @param pokemonDetail The pokemon detail brings the types to which it is related.
     * @returns 
     */
    public getTypesPokemon(pokemones: POKEMON_DATA[], pokemonDetail: DETAIL_POKEMON[]) {
        return pokemones.map((pokemon, index) => {
            pokemon.type = pokemonDetail[index].name === pokemon.name ? pokemonDetail[index].types : []
            return { ...pokemon }
        })
    }

    /**
     * Obtains the names of the pokemon types and consults the type details.
     * @param pokemones 
     * @returns 
     */
    public getListTypesByPokemon(pokemones: POKEMON_DATA[]) {
        const requests = []
        for (let i = 0; i < pokemones.length; i++) {
            const typesListPokemon = Object.assign([], pokemones[i].type)
            for (let j = 0; j < typesListPokemon.length; j++) {
                requests.push(this.services.getTypesByPokemon(`${API_URL.TYPE_POKEMON}/${typesListPokemon[j]["type"]["name"]}/`))
            }
        }
        return forkJoin(requests);

    }

    /**
     * Receive pokemons list battle and listPokemonTypes,
     * Also damage_releations are associated to each pokemon
     */
    public getPokemonsWithDamageRelations(listPokemonsBattle: POKEMON_DATA[], listPokemonTypes: any[]) {
        let temporalTypes: any[] = []
        for (let i = 0; i < listPokemonsBattle.length; i++) {
            if (!listPokemonsBattle[i].damage_relations.length) {
                for (let x = 0; x < listPokemonTypes.length; x++) {
                    if (listPokemonsBattle[i]["type"]?.find(poke => poke.type.name === listPokemonTypes[x].name)) {
                        /**
                         * This following validation allows me to verify if two pokemon of the same type are already processed, 
                         * so as not to duplicate the type information of the processed pokemon.
                         */
                        if (!listPokemonsBattle[i].damage_relations?.length || !temporalTypes.find(poke => listPokemonsBattle[i].name === poke.pokemonName && poke.typesProcessed == listPokemonTypes[x].name)) {
                            listPokemonsBattle[i].damage_relations?.push(listPokemonTypes[x].damage_relations)
                            temporalTypes.push({
                                pokemonName: listPokemonsBattle[i].name,
                                typesProcessed: listPokemonTypes[x].name
                            })
                        }
                    }
                }
            } else {
                continue
            }
        }
        return listPokemonsBattle;
    }



}