import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ClusterService
{

    private baseUrl = environment.baseUrl+"/api/cluster/";


    constructor(private _httpClient: HttpClient){
    }

    public create(user) {

        return this._httpClient.post<any>(this.baseUrl+"create", user);
    }
    
    public getAll() {

        return this._httpClient.get<any>(this.baseUrl+"all");
    }
    
    public getById(id) {

        return this._httpClient.get<any>(this.baseUrl+id);
    }
    

}


