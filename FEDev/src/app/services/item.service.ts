import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  //private baseURL = 'https://localhost:44346/';
  private baseURL = 'https://nbitembedev.azurewebsites.net/';
  private baseApiURL = 'api/item/';

  constructor(private http: HttpClient) { }

  getListItems(): Observable<any> {
    return this.http.get(this.baseURL + this.baseApiURL);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(this.baseURL + this.baseApiURL + id);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(this.baseURL + this.baseApiURL + id);
  }

  createItem(item: Item): Observable<any> {
    return this.http.post(this.baseURL + this.baseApiURL, item);
  }

  updateItem(id: number, item: Item): Observable<any> {
    return this.http.put(this.baseURL + this.baseApiURL + id, item);
  }

  getItemMinMaxPrice(): Observable<any> {
    return this.http.get(this.baseURL + this.baseApiURL + 'GetItemMinMaxPrice');
  }
}
