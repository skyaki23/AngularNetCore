import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseURL = 'https://localhost:44346/';
  private baseApiURL = 'api/item/';

  constructor(private http: HttpClient) { }

  getListItems(): Observable<any> {
    return this.http.get(this.baseURL + this.baseApiURL);
  }
}
