import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnChanges {
  chart: ApexCharts = {} as ApexCharts;
  chartOptions: {} = {};
  @Input() stats?: any[];
  seriesData: { x: string, y: number }[] = [];

  constructor() { }

  ngOnChanges() {
    if (this.stats) {
      this.seriesData = [
        { x: 'HP', y: this.stats[0].base_stat },
        { x: 'Defense', y: this.stats[2].base_stat },
        { x: 'Speed', y: this.stats[5].base_stat },
        { x: 'Attack', y: this.stats[1].base_stat }
      ];
  }
}
  renderChart() {
    this.chartOptions = {
      series: [
        {
          name: 'Stats',
          data: this.seriesData
        }
      ],

      chart: {
        type: 'bar',
        height: 260,
        fontFamily: 'Nunito, Arial, sans-serif',
        foreColor: '#B3B4B5',
      },

      plotOptions: {
        bar: {
          columnWidth: '60%',
          distributed: true,
          borderRadius: 3,
        },
      },

      toolbar: {
        show: false,
      },

      title: {
        text: 'Status',
        style: {
          fontSize: '16px',
          fontWeight: 700,
          color: '#2F3E77',
        },
      },

      xaxis: {
        categories: ['Vida', 'Defesa', 'Velocidade', 'Ataque'],
      },

      colors: ['#C3F788', '#F7802A', '#49D0B0', '#EA686D'],

      dataLabels: {
        enabled: false,
      },

      fill: {
        type: 'solid',
      },

      legend: {
        show: false,
      },
    };

    this.chart = new ApexCharts(
      document.getElementById('chart'),
      this.chartOptions
    );
    console.log(this.chart.render())
  }
}
