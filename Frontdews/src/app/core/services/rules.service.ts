// rules.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private apiUrl = 'http://127.0.0.1:8000/students1/';// Update with your endpoint URL
    avilableRulesData$: any;
    

  constructor(private http: HttpClient) { }


  getAvailableRulesData(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }
  getPredictionBaseline(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/predictions/M_1_1Baseline1/');
  }


}
