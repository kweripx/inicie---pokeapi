import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonModalComponent } from '../pokemon-modal/pokemon-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];
  descriptions: any[] = [];
  selectedPokemon: any = null;
  searchTerm = '';
  displayedPokemons: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPokemons = 0;

  constructor(
    private pokeapiService: PokemonService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  async fetchPokemons() {
    try {
      await this.pokeapiService.getPokemons().subscribe((response) => {
        this.pokemons = response;
        this.totalPokemons = this.pokemons.length;
        this.displayedPokemons = this.pokemons.slice(0, this.pageSize);
      });
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  }

  async fetchDescriptions() {
    try {
      await this.pokeapiService.getDescriptions().subscribe((response) => {
        this.descriptions = response;
      })
    } catch (error) {
      console.error('Error fetching descriptions:', error);
     }
  }

  async selectPokemon(url: string) {
    try {
      this.selectedPokemon = await this.pokeapiService.getPokemonDetails(url);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  }

  async openModal(pokemon: any) {
    const dialogRef = this.dialog.open(PokemonModalComponent, {
      width: '1140px',
      height: '520px',
      data: {
        pokemon: pokemon,
        type: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
        stats: pokemon.stats,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  clearSelectedPokemon() {
    this.selectedPokemon = null;
  }

  searchPokemon() {
    const filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPokemons = filteredPokemons.length;
    this.currentPage = 1;
    this.displayedPokemons = filteredPokemons.slice(0, this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.displayedPokemons = this.pokemons.slice(
        startIndex,
        startIndex + this.pageSize
      );
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalPokemons) {
      this.currentPage++;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.displayedPokemons = this.pokemons.slice(
        startIndex,
        startIndex + this.pageSize
      );
    }
  }
}
