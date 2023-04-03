/**
 * @autor Oscar Jimenez
 */
import { Component, OnInit } from '@angular/core';
import { HelperPokemon } from 'src/app/helper/helper';
import { POKEMON_DATA } from 'src/app/models/pokemon';
import { DAMAGES_RELATIONS } from 'src/app/utils/constants';


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
  totalPages: number[] = []
  itemsTypes: any[] = []
  searchPokemon: string = ""
  pokemonListBattle: POKEMON_DATA[] = []
  resultsBattle: any = []
  countComparateProcess: number = 0



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
    this.getTotalPages(this.listPokemon.length / this.itemsPerPage)
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
  }

  /**
   * Close battle
   */

  public cancelBattle() {
    this.showBattle = true
    this.startFight = false
    this.countComparateProcess = 0
  }

  /**
   * Fight!!!!  
   */
  public startBattle() {
    this.startFight = true
    console.log(this.pokemonListBattle);
    /**
     * Getting data from pokemonTypes services
     * Gets the details of the types of pokemon that are going to fight.
     * Also damage_releations are associated to each pokemon
     */
    this.helper.getListTypesByPokemon(this.pokemonListBattle).subscribe(results => {
      this.typesDetailPokemon = results
      this.pokemonListBattle = this.helper.getPokemonsWithDamageRelations(this.pokemonListBattle, this.typesDetailPokemon);
      this.countComparateProcess = 0
      this.resultsBattle = []
      this.comparatePokemons(this.pokemonListBattle[0], this.pokemonListBattle[1])
    })
  }



  /**
   * This function returns keys from damage_relations where the enemy pokemon types are found.
   * @param pokemonLeftTypes Types of enemy pokemon to compare with 
   * @param keysDamageOtherPokemon Array of damage properties, for example: the array double_damage_from.
   * @returns The damagae_relations keys where the enemy pokemon type was found.
   */
  private checkTypesAndGetMatch(pokemonLeftTypes: any[], keysDamageOtherPokemon: any) {
    const foundTypeComparate = []
    for (let i = 0; i < keysDamageOtherPokemon.length; i++) {
      const element = keysDamageOtherPokemon[i];
      if (pokemonLeftTypes.includes(element.name)) {
        foundTypeComparate.push(element.name);
      }
    }
    return foundTypeComparate;
  }

  /**
   * assign results to pokemon
   * @param resultsComparate assign points final depending key damage
   */
  public calculatePointsToWinOrFail(resultsComparate: any[]) {
    for (let pokemon of this.pokemonListBattle) {
      pokemon.pointsFight = 0
      if (!pokemon.results) {
        pokemon.results = resultsComparate.filter(result => result.pokemonName === pokemon.name)
      }
      const pokemonFoundResults = resultsComparate.filter(poke => poke.pokemonName === pokemon.name)
      if (pokemonFoundResults.length) {
        let pointsPokemon = 0
        for (let i = 0; i < pokemonFoundResults.length; i++) {
          switch (pokemonFoundResults[i].propertieDamageFound) {
            case "double_damage_from":
              pointsPokemon = pointsPokemon + (DAMAGES_RELATIONS["double_damage_from"])
              break
            case "double_damage_to":
              pointsPokemon = pointsPokemon + (DAMAGES_RELATIONS["double_damage_to"])
              break
            case "half_damage_from":
              pointsPokemon = pointsPokemon + (DAMAGES_RELATIONS["half_damage_from"])
              break
            case "half_damage_to":
              pointsPokemon = pointsPokemon + (DAMAGES_RELATIONS["half_damage_to"])
              break
            case "no_damage_from":
              pointsPokemon = pointsPokemon + (DAMAGES_RELATIONS["no_damage_from"])
              break
            case "no_damage_to":
              pointsPokemon = pointsPokemon + (DAMAGES_RELATIONS["no_damage_to"])
              break
          }
          pointsPokemon += pokemonFoundResults[i].propertieDamageFound === "" ? (DAMAGES_RELATIONS.double_damage_from) : pokemonFoundResults[i].propertieDamageFound === "" ? (DAMAGES_RELATIONS.double_damage_to) : pokemonFoundResults[i].propertieDamageFound === "" ? (DAMAGES_RELATIONS.half_damage_from) : pokemonFoundResults[i].propertieDamageFound === "" ? (DAMAGES_RELATIONS.half_damage_to) : pokemonFoundResults[i].propertieDamageFound === "" ? (DAMAGES_RELATIONS.no_damage_from) : pokemonFoundResults[i].propertieDamageFound === "" ? (DAMAGES_RELATIONS.no_damage_to) : 0
        }
        pokemon.pointsFight = pointsPokemon
      }
    }
    const pointsFirstPokemonBattle = this.pokemonListBattle[0].pointsFight ? this.pokemonListBattle[0].pointsFight : 0
    const pointsSecondPokemonBattle = this.pokemonListBattle[1].pointsFight ? this.pokemonListBattle[1].pointsFight : 0

    this.pokemonListBattle[0].statusFight = pointsFirstPokemonBattle > pointsSecondPokemonBattle
    this.pokemonListBattle[1].statusFight = pointsSecondPokemonBattle > pointsFirstPokemonBattle

  }

  /**
   * This function obtains the types of pokemon that the opponent has. In the pokemon on the left side it searches if it has damage_relations and verifies that its items include any of the enemy's types and returns a new object indicating in which property it was found and the type found.
   */

  public comparatePokemons(pokemonFightLeft: POKEMON_DATA, pokemonFightRight: POKEMON_DATA) {
    this.countComparateProcess++
    const typesPokemonComparate = pokemonFightRight.type?.map(({ type }) => type.name)
    for (let i = 0; i < pokemonFightLeft.damage_relations?.length; i++) {
      if (pokemonFightLeft?.damage_relations[i]) {
        let objectKeys = Object.keys(pokemonFightLeft?.damage_relations[i])
        for (let x = 0; x < objectKeys.length; x++) {
          if (this.checkTypesAndGetMatch(typesPokemonComparate ? typesPokemonComparate : [], pokemonFightLeft.damage_relations[i][objectKeys[x]]).length) {
            this.resultsBattle.push({
              pokemonName: pokemonFightLeft.name,
              idPokemon: pokemonFightLeft.id,
              typesEnemyFound: this.checkTypesAndGetMatch(typesPokemonComparate ? typesPokemonComparate : [], pokemonFightLeft.damage_relations[i][objectKeys[x]]),
              propertieDamageFound: objectKeys[x]
            })
          }
        }
      }
      if (this.countComparateProcess < this.pokemonListBattle.length) {
        this.comparatePokemons(this.pokemonListBattle[1], this.pokemonListBattle[0])
      }
    }

    this.calculatePointsToWinOrFail(this.resultsBattle)
  }

  ngOnInit() {
    this.getListPokemon(0, 151)
  }

}
