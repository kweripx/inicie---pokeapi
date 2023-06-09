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

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=151`)
      .pipe(
        map(response => response.results),
        mergeMap(results => forkJoin(results.map((result: any) => this.getPokemon(result.url))))
      );
  }

  getPokemonDescription(name: string): Observable<string> {
    const url = `${this.baseUrl}/pokemon-species/${name}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.flavor_text_entries[12].flavor_text)
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
