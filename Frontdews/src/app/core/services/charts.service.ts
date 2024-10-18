
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  getLineChartData(): Observable<any> {
    // Assuming your API endpoint to fetch data is '/api/line-chart-data'
    return this.http.get('http://127.0.0.1:8000/SuccessRateAllStudents');
  }
  getPieChartData(): Observable<any> {
    // Assuming your API endpoint to fetch data is '/api/line-chart-data'
    return this.http.get('http://127.0.0.1:8000/SuccessRateAllStudents');
  }
  getPieChart1Data(): Observable<any> {
    // Assuming your API endpoint to fetch data is '/api/line-chart-data'
    return this.http.get('http://127.0.0.1:8000/StudentDistributionByLevel');
  }
  getPieChart2Data(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/MoyGenClass');
  }
  getBarData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/MoyGenEtab');
  }
  getBar1Data(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/TauxReussiteByEtab');
  }
  getBar2Data(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/AbsenceEtab');
  }
  getBarNega(cd_etab?: string): Observable<any> {
    let params = new HttpParams();
    if (cd_etab) {
      params = params.append('cd_etab', cd_etab);
    }

    return this.http.get('http://127.0.0.1:8000/SuccessRateIdAnnee', { params: params });
  }
  getBarNega1(cd_etab?: string): Observable<any> {
    let params = new HttpParams();
    if (cd_etab) {
      params = params.append('cd_etab', cd_etab);
    }

    return this.http.get('http://127.0.0.1:8000/GenderIdAnnee', { params: params });
  }
  getSemiDonut(): Observable<any> {
    // Assuming your API endpoint to fetch data is '/api/line-chart-data'
    return this.http.get('http://127.0.0.1:8000/TargetIstayssirData');
  }



}
