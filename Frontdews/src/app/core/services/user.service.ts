import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/models/user';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({providedIn: 'root'})
export class UserService
{

    private baseUrl = environment.baseUrl+"/api/user/";
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    constructor(private _httpClient: HttpClient){
    }

    public create(user) {

        return this._httpClient.post<any>(this.baseUrl+"create", user);
    }


    public getList() {
        return this._httpClient.get<any>(this.baseUrl+"users");
    }

    set user(value: User)
    {
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }


    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) =>
            {
                this._user.next(response);
            }),
        );
    }

}

