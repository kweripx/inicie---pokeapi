import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { MetricsPipe } from '../pipes/metrics.pipe';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    MetricsPipe,
  ]
})
export class PagesModule { }
