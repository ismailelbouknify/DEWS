import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  // Prediction endpoint
  predict1(year: number, model: string, studentId?: number): Observable<any> {
    let endpoint = '';

    // Align the year selection to match expected values
    if (year === 1) {
      // Year 1
      if (model === 'model1') {
        endpoint = 'predictions/M_1_1Baseline1/';
      } else if (model === 'model2') {
        endpoint = 'predictions/M_1_1Undrsampling1/';
      }
    } else if (year === 2) {
      // Year 2
      if (model === 'model1') {
        endpoint = 'predictions/M_1_2Baseline1/';
      } else if (model === 'model2') {
        endpoint = 'predictions/M_1_2Undrsampling1/';
      }
    }

    // If studentId is provided, append it to the endpoint
    if (studentId !== undefined) {
      endpoint += `${studentId}/`;
    }

    // Log the endpoint for debugging purposes
    console.log('Sending request to endpoint:', `${this.baseUrl}${endpoint}`);

    // Make the GET request to the correct endpoint
    return this.http.get<any>(`${this.baseUrl}${endpoint}`);
  }

  predict(year: number, model: string, studentId?: number) {
    let endpoint = '';

    if (year === 1) {
      if (model === 'model1') {
        endpoint = 'predictions/M_1_1Baseline1/';
      } else if (model === 'model2') {
        endpoint = 'predictions/M_1_1Undrsampling1/';
      }
    } else if (year === 2) {
      if (model === 'model1') {
        endpoint = 'predictions/M_1_2Baseline1/';
      } else if (model === 'model2') {
        endpoint = 'predictions/M_1_2Undrsampling1/';
      }
    }
    console.log("endpoint: ",endpoint);
    
    if (studentId !== undefined) {
      endpoint += `${studentId}/`;
    }
    
    return this.http.get<any>(`${this.baseUrl}${endpoint}`);
}

}
