import { Pokemon } from './../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService{
  public pokemons: Pokemon[] = [];

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=151`)
      .pipe(
        map(response => response.results),
        mergeMap(results => forkJoin(results.map((result: any) => this.getPokemon(result.url))))
      );
  }

  getDescriptions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species`)
      .pipe(
        map(response => response.flavor_text_entries[0].flavor_text),
        mergeMap(entries => forkJoin(entries.map((entry: any) => this.getDescription(entry.url))))
      );
  }

  getPokemon(url: string) {
    return this.http.get<any>(url).toPromise();
  }

  getDescription(url: string) {
    return this.http.get<any>(url).toPromise();
  }

  getPokemonDetails(url:string): Promise<any> {
    const response = this.http.get<any>(url).toPromise()
    .then(response => response.data);

    return response;
  }
}
