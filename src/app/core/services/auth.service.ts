import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { }

  signIn(email: string, password: string): Observable<{ token: string }> {
    return this.apiService.post<{ token: string }, {email: string, password: string}>('/auth/sign_in', {
      email,
      password
    }).pipe(
      tap(res => {
        localStorage.setItem('authToken', res.token);
      })
    );
  }

  signUp(name:string ,email: string, password: string): Observable<{ token: string }> {
    return this.apiService.post<{ token: string }, {name: string, email: string, password: string}>('/auth/sign_up', {
      name,
      email,
      password
    });
  }
}
