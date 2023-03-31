import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ServicesService } from '../services/pokemon.service';
import { DETAIL_POKEMON, POKEMON_DATA } from '../models/pokemon';
import { API_URL } from "../utils/constants";

@Injectable({
    providedIn: 'root'
})
export class HelperPokemon{
constructor(private services: ServicesService) {}

    types: any[] = []
    /**
     * !TODO: All params are required 
     * @param offset start query to pokemon
     * @param limit limit of pokemon
     * @returns List of pokemon
     */

    private getImageByPokemon = (idPokemon: string): string =>{
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
        return pokemones.map(({url, name}) => {
            //access to the six element (Id) pokemon
            const idPokemon = parseInt(url.split("/")[6])
            return { id: this.formatIdPokemon(idPokemon), img: this.getImageByPokemon(this.formatIdPokemon(idPokemon)),name, url, selected: false }
        })
    }

    public getDetailPokemon(pokemones: POKEMON_DATA[]){
        const requests = []
        for(let i=0; i<pokemones.length; i++){
            requests.push(this.services.getDetailPokemon(`${API_URL.LIST_POKEMON}/${pokemones[i].name}/`))
        }
        return forkJoin(requests);
    }

    public getTypesPokemon(pokemones: POKEMON_DATA[], typesPokemon: DETAIL_POKEMON[]){
        return pokemones.map((pokemon,index)=>{
            pokemon.type = typesPokemon[index].name === pokemon.name ? typesPokemon[index].types : []
            return {...pokemon}
        })
    }

    public getListTypesByPokemon(pokemones: POKEMON_DATA[]){
        const requests = []
        for(let i=0; i<pokemones.length; i++){
            requests.push(this.services.getTypesByPokemon(`${API_URL.TYPE_POKEMON}/${+pokemones[i].id}/`))
        }
        return forkJoin(requests);
        
    }   


}