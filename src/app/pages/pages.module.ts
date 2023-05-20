import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PokemonModalComponent} from './components/pokemon-modal/pokemon-modal.component';
import {ChartsComponent } from './charts/charts.component';
import { MetricsPipe } from '../pipes/metrics.pipe';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MatDialogModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    PokemonModalComponent,
    ChartsComponent,
    MetricsPipe,
  ]
})
export class PagesModule { }
