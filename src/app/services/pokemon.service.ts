import { Pokemon } from './../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService{
  public pokemons: Pokemon[] = [];

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=151`).toPromise()
      .then(response => response.results)
      .then(results => Promise.all(results.map((result: any) => this.getPokemon(result.url))));
  }

  getPokemon(url: string) {
    return this.http.get<any>(url).toPromise();
  }

  getPokemonDetails(url:string): Promise<any> {
    const response = this.http.get<any>(url).toPromise()
    .then(response => response.data);

    return response;
  }
}
