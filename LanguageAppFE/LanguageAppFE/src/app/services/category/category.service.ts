import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'https://localhost:7040/api/category';
  constructor(private http: HttpClient) { }

  getAllCategories(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + "/" + userId);
  }
}
