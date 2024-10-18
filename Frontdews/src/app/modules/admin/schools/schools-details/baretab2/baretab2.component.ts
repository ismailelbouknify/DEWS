import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChartsService } from "app/core/services/charts.service";
import { SchoolService } from "app/core/services/school.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
};

@Component({
  selector: "app-baretab2",
  templateUrl: "./baretab2.component.html",
})
export class Baretab2Component implements OnInit { 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: SchoolService 
  ) { }

  ngOnInit() { 
    this.chartService.getBar2Data().subscribe((data: any) => {
      this.chartOptions = {
        series: [{
          name: "authorized_absences",
          data: data.map(obj => obj.authorized_absences)
        },
        {
          name: "unauthorized_absences",
          data: data.map(obj => obj.unauthorized_absences)
        }],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"]
          }
        },
        // stroke: {
        //   show: true,
        //   width: 1,
        //   colors: ["#fff"]
        // },
        xaxis: {
          categories: data.map(obj => obj.class)
        },
        
      };
    });
  }
}
