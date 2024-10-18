import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ChartsService } from 'app/core/services/charts.service';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PieComponent implements OnInit {
  public chartOptions: ChartOptions[];
  public chartOptions2: ChartOptions[]; // Corrected the declaration

  constructor(
    private _router: Router,
    private chartService: ChartsService // Inject ChartsService
  ) { }

  ngOnInit() {
    this.chartService.getPieChartData().subscribe((data: any) => {
      // Assuming data structure: { series: [], labels: [] }
      this.chartOptions = [
        {
          series: data.map(obj => obj.value),
          chart: {
            width: 380,
            type: 'pie'
          },
          labels: data.map(obj => obj.label),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }
          ]
        }
      ];
      console.log(data);


    });
  }
}
