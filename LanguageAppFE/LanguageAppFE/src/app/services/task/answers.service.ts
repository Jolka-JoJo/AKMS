import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/task/answer.module';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  baseUrl = 'https://localhost:7040/api/Answers';
  constructor(private http: HttpClient) { }

  getAllAnswers(taskId: number): Observable<Answer[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("lessonTaskId",taskId);
    return this.http.get<Answer[]>(this.baseUrl + "/" + taskId);
  }

  getAnswer(taskId: number, id: number): Observable<Answer> {
    return this.http.get<Answer>(this.baseUrl + "/" + taskId + "/" + id);
  }

  addAnswer(answer: FormData): Observable<FormData>{
    console.log("here", this.baseUrl);
    return  this.http.post<FormData>(this.baseUrl, answer);
  }

  deleteAnswer(id: number): Observable<Answer>{
    return this.http.delete<Answer>(this.baseUrl + "/" + id);
  }

  updateAnswer(id: any, answer: FormData): Observable<Answer[]>{
    return this.http.put<Answer[]>(this.baseUrl + "/" + id, answer);
  }
}
