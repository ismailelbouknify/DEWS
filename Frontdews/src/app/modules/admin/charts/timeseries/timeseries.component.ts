import { Component, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";
import { ChartsService } from 'app/core/services/charts.service';

@Component({
  selector: "app-timeseries",
  templateUrl: "./timeseries.component.html",
})
export class TimeseriesComponent implements OnInit {
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;

  constructor(private chartService: ChartsService) {}

  ngOnInit() {
    this.chartService.getLineChartData().subscribe(data => {
      this.initChartData(data);
    });
  }

  public initChartData(data): void {
    const seriesData = data.map(event => {
      return {
        name: event.event_type,
        data: event.timestamps.map(timestamp => {
          return {
            x: new Date(timestamp.timestamp).getTime(),
            y: timestamp.count
          };
        })
      };
    });

    this.series = seriesData;
    this.chart = {
      type: "line",
      stacked: false,
      height: 450,
      width: "100%",
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: "Alerts Counts Over Time",
      align: "left"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      },
      title: {
        text: "Count"
      }
    };
    this.xaxis = {
      type: "datetime"
    };
    this.tooltip = {
      shared: true,
      y: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      }
    };
  }
}
