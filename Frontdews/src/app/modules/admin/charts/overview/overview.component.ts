import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ChartsService } from 'app/core/services/charts.service';

import * as d3 from 'd3';

interface LineChartData {
  date: number;
  http_weight: number;
  event_type: string; // Corrected type of event_type to string
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['overview.component.scss'],

  standalone: false,
})

export class OverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef<HTMLDivElement>;

  data: LineChartData[] = [];

  constructor(private chartsService: ChartsService) { }

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC' // Adjust timezone if needed
  };

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.chartsService.getLineChartData().subscribe((data: any) => {
      // Assuming data is retrieved in the format { offset: string, timestamps: Date[] }
      this.data = data.map(entry => ({
        date: entry.timestamps[0],
        http_weight: entry.http_weight,
        event_type: String(entry.event_type) // Assuming http_weight corresponds to offset
      }));
      this.createChart();

      console.log("hihihi: ", (new Date(data[0].timestamps[0] * 1000)).toLocaleString("en-US", this.options).split("at")[0])
    });
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const svg = d3.select(element).append('svg')
      .attr('width', 600)
      .attr('height', 400);

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(d3.extent(this.data, d => d.date));

    const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(this.data, d => Number(d.http_weight))]); // Cast event_type to number

    const line = d3.line<LineChartData>()
      .x(d => x(d.date))
      .y(d => y(Number(d.event_type))) // Cast event_type to number
      .curve(d3.curveMonotoneX);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .select('.domain')
      .remove();

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('http_weight');

    g.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
}
