import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonResponse } from 'src/app/interfaces/lesson';
import { EnvironmentUrlService } from '../environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  url = 'https://localhost:7040/api/lesson';
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  getAllLessons(): Observable<LessonResponse[]> {
    console.log(this.url);
    return this.http.get<LessonResponse[]>(this.url);
  }

  getLesson(id: number): Observable<LessonResponse> {
    return this.http.get<LessonResponse>(this.url + "/" + id);
  }

  addLesson(task: FormData): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url, task);
  }

  deleteLesson(id: number): Observable<LessonResponse[]>{
    return this.http.delete<LessonResponse[]>(this.url + "/" + id);
  }

  updateLesson(id: number, lesson: FormData): Observable<LessonResponse>{
    return this.http.put<LessonResponse>(this.url + "/" + id, lesson);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
