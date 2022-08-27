import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {convertToQueries} from "../utils/utils";
import {News} from "../models/news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private static readonly ROOT_ENDPOINT = '/news';

  _subject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  emitNews(text: string) {
    this._subject.next(text);
  }

  onNewsChange(): Observable<string> {
    return this._subject.asObservable();
  }

  getNews(text: string, pageSize?: number, offset?: number): Observable<News[]> {
    const options = { params: new HttpParams() }
    options.params = convertToQueries(options.params, {place:text, pageSize, offset });
    return this.http.get<News[]>(`${environment.apiUrl}${NewsService.ROOT_ENDPOINT}`, options);
  }
}
