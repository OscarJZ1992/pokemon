/**
 * @autor Oscar Jimenez
 */
import { Component, OnInit } from '@angular/core';
import { HelperPokemon } from 'src/app/helper/helper';
import { DAMAGE_RELATIONS, POKEMON_DATA } from 'src/app/models/pokemon';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  startFight: boolean = false
  typesDetailPokemon: any[] = []
  showBattle: boolean = false
  listPokemon: POKEMON_DATA[] = []
  dataWithPagination: POKEMON_DATA[] = []
  currentPage: number = 1
  itemsPerPage: number = 10
  totalPages: any[] = []
  itemsTypes: any[] = []
  searchPokemon: string = ""
  pokemonListBattle: POKEMON_DATA[] = []

  constructor(private helper: HelperPokemon) { }

  /**
   * get all pokemons
   * @param offset 
   * @param limit 
   */
  private getListPokemon = (offset: number, limit: number): void => {
    this.helper.getListPokemon(offset, limit).subscribe(data => {
      this.listPokemon = data?.results
      this.getIdsPokemon(this.listPokemon)
      this.getDetailPokemon(this.listPokemon)
    })
  }

  private getIdsPokemon = (listPokemon: POKEMON_DATA[]) => {
    this.listPokemon = this.helper.getIdByPokemon(listPokemon)
    this.getTotalPages(this.listPokemon.length / 10)
  }

  private getTotalPages(size: number) {
    for (let i = 1; i <= size; i++) {
      this.totalPages.push(i)
    }
  }

  public getItems(): POKEMON_DATA[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filterPokemonList(startIndex, endIndex);
  }

  private filterPokemonList(startIndex: number, endIndex: number) {
    return this.listPokemon.filter(item => item.name.toLowerCase().includes(this.searchPokemon?.toLowerCase() || '')).slice(startIndex, endIndex)
  }

  /**
   * getDetail by list pokemon
   * @param listPokemon 
   */
  public getDetailPokemon(listPokemon: POKEMON_DATA[]) {
    this.helper.getDetailPokemon(listPokemon).subscribe(results => {
      this.helper.getTypesPokemon(this.listPokemon, results)
    })
  }

  /**
   * Recived event from app-card child
   * @param listPokemons 
   */
  public getPokemonToBattle(listPokemons: any) {
    this.pokemonListBattle = listPokemons
    this.helper.getListTypesByPokemon(this.pokemonListBattle).subscribe(results => {
      this.typesDetailPokemon = results
    })
  }

  public cancelBattle() {
    this.showBattle = true
    this.startFight = false
  }

  /**
   * Fight!!!!
   */
  public startBattle() {
    this.startFight = true
    this.pokemonListBattle.map(pokemon => {
      const pokemonFind = this.typesDetailPokemon.find(item => item.id === +pokemon.id)
      if (pokemonFind) {
        pokemon.damage_relations = pokemonFind.damage_relations
      }
      return { ...pokemon }
    })
  }



  ngOnInit() {
    this.getListPokemon(0, 151)
  }

}
