import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ChartsService } from 'app/core/services/charts.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexTooltip
} from "ng-apexcharts";
import { Router } from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-barnega',
  templateUrl: './barnega.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BarnegaComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router: Router,
    private chartService: ChartsService 
  ) { }

  ngOnInit() {
    const cd_etab = "your_cd_etab";  // Replace with your actual cd_etab value
    this.chartService.getBarNega().subscribe((data: any) => {
      const seriesData = data.map(obj => ({
        x: this.formatYear(obj.id_annee),
        y: obj.success_rate.reduce((acc, item) => {
          if (item.status === 0) {
            acc.success = item.count;
          } else if (item.status === 1 || item.status === 2) {
            acc.dropped = item.count;
          }
          return acc;
        }, { success: 0, dropped: 0 })
      }));

      this.chartOptions = {
        series: [
          {
            name: "Success",
            data: seriesData.map(item => item.y.success)
          },
          {
            name: "Dropped",
            data: seriesData.map(item => -item.y.dropped)  // Negative values for dropped
          }
        ],
        chart: {
          type: "bar",
          height: 350,
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: seriesData.map(item => item.x),
          title: {
            text: 'ID Annee'
          }
        },
        yaxis: {
          title: {
            text: 'Counts'
          },
          labels: {
            formatter: function (val) {
              if (typeof val === 'number') {
                return Math.abs(val).toLocaleString();
              }
              return val;
            }
          }
        },
        title: {
          text: "Success and Drop Rates by Year"
        },
        grid: {
          show: true
        },
        tooltip: {
          y: {
            formatter: function (val) {
              if (typeof val === 'number') {
                return Math.abs(val).toLocaleString();
              }
              return val;
            }
          }
        }
      };
    });
  }

  formatYear(idAnnee: number): string {
    const yearMap = {
      8: '2015/2016',
      9: '2016/2017',
      10: '2017/2018',
      11: '2018/2019',
      12: '2019/2020'
    };
    return yearMap[idAnnee] || idAnnee.toString();
  }
}
