import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApexNonAxisChartSeries, ApexResponsive,ApexChart} from 'ng-apexcharts';
import { ChartsService } from 'app/core/services/charts.service';



export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: any;
    responsive: ApexResponsive[];
  };
@Component({
    selector     : 'app-pie2',
    templateUrl  : './pie2.component.html',
    standalone   : false,
    encapsulation: ViewEncapsulation.None,
})
  
  
export class Pie2Component implements OnInit {
  public chartOptions: ChartOptions[];

  constructor(
    private _router: Router,
    private chartService: ChartsService // Inject ChartsService
  ) { }

  ngOnInit() {
    this.chartService.getPieChart2Data().subscribe((data: any) => {
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


        