import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface School {
  school_name: string;
  address: string;
  number_students: number;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = environment.apiUrl + 'SchoolData';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.apiUrl);
  }

  getLineChartData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_SuccessRateAllStudents');
  }

  getPieChartData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_SuccessRateAllStudents');
  }

  getPieChart1Data(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_StudentsDistrubByLevel');
  }

  getBarData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_MoyGenLevel');
  }

  getBar1Data(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_TauxReussiteByLevel');
  }

  getBar2Data(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_AbsenceClass');
  }

  getBarNega(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_SuccessRateIdAnnee');
  }

  getBarNega1(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_GenderIdAnnee');
  }

  getSemiDonut(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_TargetIstayssirData');
  }
  getSemiDonut1(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/Sc_Internat');
  }
}
