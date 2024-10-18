import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChartsService } from "app/core/services/charts.service";
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
  selector: "app-baretab1",
  templateUrl: "./baretab1.component.html",
  styleUrls: ["./baretab1.component.css"]
})
export class Baretab1Component implements OnInit { 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: ChartsService 
  ) { }

  ngOnInit() { 
    this.chartService.getBar1Data().subscribe((data: any) => {
      this.chartOptions = {
        series: [{
          name: "success rate",
          data: data.map(obj => obj.success_rate)
        }],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: data.map(obj => obj.cd_etab)
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8633', '#FF33E4', '#33FFF0', '#33A4FF', '#A533FF', '#FF5733'] // Custom colors
      };
    });
  }
}
