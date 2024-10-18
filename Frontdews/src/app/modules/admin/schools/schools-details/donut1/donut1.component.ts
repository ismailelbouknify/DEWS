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
  selector: 'app-donut1',
  templateUrl: './donut1.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class Donut1Component implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: SchoolService 
  ) { }

  ngOnInit() {
    this.chartService.getPieChart1Data().subscribe((data: any) => {
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
        labels: data.map(obj => this.convertRateToLabel(obj.level)),
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
          palette: "palette"
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

  private convertRateToLabel(level: number): string {
    switch(level) {
      case 7:
        return '7th grade';
      case 8:
        return '8th grade';
      case 9:
        return '9th grade';
      default:
        return 'Unknown';
    }
  }
}
