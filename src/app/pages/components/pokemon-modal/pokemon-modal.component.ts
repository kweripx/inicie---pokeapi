import { Component, OnInit, Inject, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ChartsComponent } from '../../charts/charts.component';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.scss']
})
export class PokemonModalComponent implements OnInit, AfterViewInit  {
  @Input() description: string;
  @Input() stats: any[];
  @ViewChild(ChartsComponent) chartsComponent!: ChartsComponent;

  constructor(public dialogRef: MatDialogRef<PokemonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.description = data.description;
      this.stats = this.data.stats;
    }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.chartsComponent) {
      this.chartsComponent.stats = this.data.stats;
      this.chartsComponent.renderChart();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
