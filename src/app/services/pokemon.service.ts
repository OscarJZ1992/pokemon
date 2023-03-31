import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ROUTES } from '../models/routes';
import { DETAIL_POKEMON, POKEMON_DATA } from '../models/pokemon';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  pokemons: POKEMON_DATA[] = []
  routes: ROUTES[] = [{
    title: "Home",
    route: "Home",
  },{
    title: "Pokemon List",
    route: "PokemonList",
  }]

  constructor(private http: HttpClient) { }
  

  //Pokemons Requests

  public getRoutes(): ROUTES[]{
    return this.routes
  }
  
  public getListPokemon(url: string): Observable<any> {
      return this.http.get<POKEMON_DATA>(url).pipe(
        catchError(this.handleError)
      );
  }

  public getDetailPokemon(url: string): Observable<any> {
    return this.http.get<DETAIL_POKEMON>(url).pipe(
      catchError(this.handleError)
    );
  }

  public getTypesByPokemon(url: string){
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return "Ocurred error, try again please!"
  }

}
