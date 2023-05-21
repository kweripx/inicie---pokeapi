import { Component, OnInit, ViewChild, AfterViewInit, ElementRef  } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonModalComponent } from '../pokemon-modal/pokemon-modal.component';
import { ChartsComponent} from '../../charts/charts.component';
import SwiperCore, { Autoplay, Grid, Navigation } from 'swiper';

SwiperCore.use([Autoplay, Navigation, Grid]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  pokemons: any[] = [];
  descriptions: any[] = [];
  selectedPokemon: any = null;
  searchTerm = '';
  displayedPokemons: any[] = [];
  mobileDisplayedPokemons: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPokemons = 0;
  @ViewChild(ChartsComponent, { static: false }) chartsComponent!: ChartsComponent;
  @ViewChild('swiper-container', { static: false }) swiperContainer?: ElementRef;
  swiper!: SwiperCore;

  constructor(
    private pokeapiService: PokemonService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.fetchPokemons();

    if (this.swiperContainer) {
      this.swiper = new SwiperCore(this.swiperContainer.nativeElement, {
        slidesPerView: 3,
        spaceBetween: 0,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
      });
    }
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

  async selectPokemon(url: string) {
    try {
      this.selectedPokemon = await this.pokeapiService.getPokemonDetails(url);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  }

  async openModal(pokemon: any) {
    const dialogRef = this.dialog.open(PokemonModalComponent, {
      width: '740px',
      height: '670px',
      data: {
        pokemon: pokemon,
        type: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
        stats: pokemon.stats,
      },
    });

    this.pokeapiService.getPokemonDescription(pokemon.species.name).subscribe(
      (description: string) => {
        dialogRef.componentInstance.description = description;
      },
      (error) => {
        console.error('Error fetching Pokémon description:', error);
      }
    );

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
