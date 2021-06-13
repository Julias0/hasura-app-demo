import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  post<T, K>(url: string, body: K) {
    return this.httpClient.post<T>(environment.ROOT + url, body);
  }

  get<T>(url: string, options: {  params?: HttpParams }) {
    return this.httpClient.get<T>(environment.ROOT + url, options);
  }
}
