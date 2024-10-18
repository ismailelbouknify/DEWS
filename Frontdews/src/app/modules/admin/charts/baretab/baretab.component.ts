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
};

@Component({
  selector: "app-baretab",
  templateUrl: "./baretab.component.html",
  styleUrls: ["./baretab.component.css"]
})
export class BaretabComponent implements OnInit { // Ajout de l'implémentation OnInit
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: ChartsService 
  ) { }

  ngOnInit() { // Ajout de la méthode ngOnInit
    this.chartService.getBarData().subscribe((data: any) => {
      this.chartOptions = {
        series: [{
          name: "basic",
          data: data.map(obj => obj.average)
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
          categories: data.map(obj => obj.etablissement)
        }
      };
    });
  }
}
