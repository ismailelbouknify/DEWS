import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ChartsService } from 'app/core/services/charts.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Router } from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TreemapComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: ChartsService 
  ) { }

  ngOnInit() {
    this.chartService.getBar1Data().subscribe((data: any) => {
      const seriesData = data.map(obj => ({
        x: obj.cd_etab,
        y: obj.success_rate * 100,
        color: this.getColor(obj.success_rate)
      }));

      this.chartOptions = {
        series: [
          {
            data: seriesData
          }
        ],
        chart: {
          height: 350,
          type: "treemap"
        },
        title: {
          text: "Success Rate by Schools"
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: ["#ffffff"]
          },
          formatter: function(val, opts) {
            return val.toLocaleString();
          },
          offsetY: -10
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: true,
            shadeIntensity: 0.5
          }
        },
        legend: {
          show: true
        }
      };
    });
  }

  getColor(successRate: number): string {
    if (successRate >= 1.8) {
      return "#10451D";
    } else if (successRate >= 1.6) {
      return "#155D27";
    } else if (successRate >= 1.4) {
      return "#1A7431";
    } else if (successRate >= 1.2) {
      return "#208B3A";
    } else if (successRate >= 1) {
      return "#25A244";
    } else if (successRate >= 0.8) {
      return "#2DC653";
    } else if (successRate >= 0.6) {
      return "#4AD66D";
    } else if (successRate >= 0.4) {
      return "#6EDE8A";
    } else if (successRate >= 0.2) {
      return "#EC8385";
    } else if (successRate >= -0.2) {
      return "#E66063";
    } else if (successRate >= -0.4) {
      return "#E35053";
    } else if (successRate >= -0.6) {
      return "#DD2C2F";
    } else if (successRate >= -0.8) {
      return "#D02224";
    } else if (successRate >= -1) {
      return "#BD1F21";
    } else if (successRate >= -1.2) {
      return "#AC1C1E";
    } else if (successRate >= -1.4) {
      return "#9C191B";
    } else if (successRate >= -1.6) {
      return "#9C191B";
    } else {
      return "#9C191B";
    }
  }
}
