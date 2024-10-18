import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    standalone   : false,
    selector     : 'charts',
    templateUrl  : './charts.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ChartsComponent implements OnInit {

    total_students: number;
    unique_establishments: number;
    unique_classes: number;
    unique_levels: number;
  
    constructor(private http: HttpClient) { }
  
    ngOnInit(): void {
      // Initialize the variables with default values or fetch from an API
      this.fetchData();
    }
  
    fetchData(): void {
      // Make an API call to your backend to retrieve the values
      this.http.get<any>('/api/count-all-students').subscribe(data => {
        this.total_students = data.total_students;
        this.unique_establishments = data.number_of_unique_establishments;
        this.unique_classes = data.number_of_unique_classes;
        this.unique_levels = data.unique_levels;
      }, error => {
        console.error('Error fetching data', error);
      });
    }
  
  }
