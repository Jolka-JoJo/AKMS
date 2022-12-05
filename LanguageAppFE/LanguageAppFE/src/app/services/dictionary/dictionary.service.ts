import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dictionary } from 'src/app/interfaces/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url = 'https://localhost:7040/api/dictionary';
  constructor(private http: HttpClient) { }

  getAllWordsPhrases(userId: string, filter: number[]): Observable<any[]> {
    return this.http.post<any[]>(this.url + "/all/" + userId, filter);
  }

  getWordPhrase(id: number): Observable<dictionary> {
    return this.http.get<dictionary>(this.url + "/" + id);
  }

  addWordPhrase(data: dictionary): Observable<dictionary[]>{
    return this.http.post<dictionary[]>(this.url, data);
  }

  deleteWordPhrase(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  updateWordPhrase(data: dictionary, id: number): Observable<dictionary[]>{
    return this.http.put<dictionary[]>(this.url + "/" + id, data);
  }
}
