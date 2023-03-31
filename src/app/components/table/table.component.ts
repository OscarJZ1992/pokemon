import { DETAIL_POKEMON } from 'src/app/models/pokemon';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-stats',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  headers: any[] = [];
  body: any[] = []
  pokemonSelected: DETAIL_POKEMON = {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: "",
    moves: [],
    name: "",
    order: 0,
    past_types: [],
    species: "",
    sprites: "",
    stats: [],
    types: [],
    weight: 0,
  }

  @Input("dataHeaders") set getHeaders(headers: any){ this.headers = headers } 
  @Input("dataBody") set getBody(body: any){  this.body = body; }
  @Input("pokemonSelected") set getPokemon(pokemon: DETAIL_POKEMON){  this.pokemonSelected = pokemon; }
  
  
}
