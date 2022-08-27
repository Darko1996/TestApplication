import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsDetailsService {
  private static readonly ROOT_ENDPOINT = '/news';

  constructor(private http: HttpClient) { }

  getNewsDetail(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${NewsDetailsService.ROOT_ENDPOINT}/${id}`);
  }
}
