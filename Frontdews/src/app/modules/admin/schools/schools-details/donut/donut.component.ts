import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { ChartsService } from 'app/core/services/charts.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Router } from "@angular/router";
import { SchoolService } from "app/core/services/school.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DonutComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: SchoolService 
  ) { }

  ngOnInit() {
    this.chartService.getPieChartData().subscribe((data: any) => {
      this.chartOptions = {
        series: data.map(obj => obj.count),
        chart: {
          width: 380,
          height: 350,
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
              }
            }
          }
        },
        labels: data.map(obj => this.convertRateToLabel(obj.rate)),
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        fill: {
          type: "",
          opacity: 1,
        },
        states: {
          hover: {
            filter: {
              type: "none"
            }
          }
        },
        theme: {
          palette: "palette2"
        },
        title: {
          text: "Student's Level"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  }

  private convertRateToLabel(rate: number): string {
    switch(rate) {
      case 0:
        return 'Success';
      case 1:
        return 'Failed';
      case 2:
        return 'Dropped';
      default:
        return 'Unknown';
    }
  }
}
