import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
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
  selector: 'app-semidonut1',
  templateUrl: './semidonut1.component.html',
  styleUrls: ["./semidonut1.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SemiDonut1Component implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private schoolService: SchoolService 
  ) { }

  ngOnInit() {
    this.schoolService.getSemiDonut1().subscribe((data: any) => {
      this.chartOptions = {
        series: data.map(obj => obj.count),
        legend: {
          position: "bottom",
          show: false
        },
        chart: {
          width: 480,
          height: 450,
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
            startAngle: -90,
            endAngle: 90,
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
        labels: data.map(obj => this.convertRateToLabel(obj.Internat_i1)),
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        fill: {
          type: "gradient",
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
          text: "Student's Financial Aid Status"
        },
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200
        //       },
              
        //     }
        //   }
        // ]
      };
    });
  }

  private convertRateToLabel(rate: number): string {
    switch(rate) {
      case 1:
        return 'have a boarding school';
      case 0:
        return 'Do Not have a boarding school';
      default:
        return 'Unknown';
    }
  }
}
