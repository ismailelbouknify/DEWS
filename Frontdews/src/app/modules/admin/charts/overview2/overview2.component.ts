import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import * as d3 from 'd3';

  interface LineChartData {
    date: Date;
    http_weight: number;
  }
  
@Component({
    selector     : 'app-overview',
    templateUrl  : './overview2.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['overview2.component.scss'],

    standalone   : false,
})


export class Overview2Component implements OnInit,AfterViewInit
{

    @ViewChild('chart', { static: true }) private chartContainer: ElementRef<HTMLDivElement>;

    data: LineChartData[] = [
        { date: new Date(2020, 0, 1), http_weight: 30 },
        { date: new Date(2020, 1, 1), http_weight: 80 },
        { date: new Date(2020, 2, 1), http_weight: 45 },
        { date: new Date(2020, 3, 1), http_weight: 60 },
        { date: new Date(2020, 4, 1), http_weight: 20 },
        { date: new Date(2020, 5, 1), http_weight: 70 }
      ];

    constructor()
    {
    }

    
    ngOnInit(): void
    {
  
        
    }
    ngAfterViewInit(){
        this.createChart();

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
                    // Make sure the .value is treated as a number
                    .domain([0, d3.max(this.data, d => d.http_weight as number)]);
    
        const line = d3.line<LineChartData>()
                       .x(d => x(d.date))
                       // Again, ensure .value is a number
                       .y(d => y(d.http_weight as number))
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
         .attr('stroke', 'steelblue')
         .attr('stroke-linejoin', 'round')
         .attr('stroke-linecap', 'round')
         .attr('stroke-width', 1.5)
         .attr('d', line);
      }
    
    

}