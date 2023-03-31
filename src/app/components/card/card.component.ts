import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DETAIL_POKEMON, POKEMON_DATA, STATS } from './../../models/pokemon';
import { TABLE } from './../../models/table';
import { HelperPokemon } from 'src/app/helper/helper';
import { forwardFill } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  
  headers: TABLE[] = [{
    name: "base"
  },{
    name: "effort"
  },{
    name: "name"
  },{
    name: "url"
  }]

  statsPokemon: STATS[] = []


  detailPokemon: DETAIL_POKEMON = {
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

  pokemonSearch: string = ""
  pokemonSelected: POKEMON_DATA = {
    name: "",
    url: "",
    id: "",
    img: "",
    selected: false
  }
  showModal: boolean = false
  pokemonsSelected: POKEMON_DATA[] = []
  listPokemons: POKEMON_DATA[] = [{
      name: "",
      url: "",
      id: "",
      img: "",
      selected: false,
      type: []
    }
  ]
  pokemonHovered: POKEMON_DATA = {
    name: "",
    url: "",
    id: "",
    img: "",
    selected: false,
    type: []
  }

  @Input("listPokemon") set getListPokemon(list: POKEMON_DATA[]){
    this.listPokemons = list
  }

  @Input("filterPokemonSearch") set getPokemonSearch(search: string){
    this.pokemonSearch = search
  }

  @Output() pokemonListBattle = new EventEmitter<any>()

  constructor(private helper: HelperPokemon){}

  public hoverPokemon(pokemon: POKEMON_DATA){
    this.pokemonHovered = pokemon
  }

  public openModal(value: boolean){
    if(this.pokemonsSelected.length< 1){
      this.showModal = value
    }else{
      this.closeModal(false)
    }

  }

  public closeModal(showModal: any){
    this.showModal = showModal
  }

  public getDetailPokemon(pokemon: POKEMON_DATA){
    this.pokemonSelected = pokemon
    this.helper.getDetailPokemon([this.pokemonSelected]).subscribe(result =>{
      this.detailPokemon = {...result[0], img: this.pokemonSelected.img}
    })
    
  }

  public getPokemonSelected(pokemon: POKEMON_DATA){
    const pokemonIsAlready = this.pokemonsSelected.find(poke => poke.id === pokemon.id)
    if(this.pokemonsSelected.length<2 && !pokemonIsAlready){
      pokemon.selected = !pokemon.selected
      this.pokemonsSelected.push(pokemon)
      if(this.pokemonsSelected.length === 2){
        this.pokemonListBattle.emit(this.pokemonsSelected)
      }
    }else{
      pokemon.selected = false
      const index = this.pokemonsSelected.findIndex(poke => poke.id === pokemon.id);
      if(index !== -1){
        this.pokemonsSelected.splice(index, 1)
      };
    }
  }


}
