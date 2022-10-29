import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LesssonTask } from 'src/app/models/task/task.module';
import { EnvironmentUrlService } from '../environment-url.service';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = 'https://localhost:7040/api/task';
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  getAllTasks(): Observable<LesssonTask[]> {
    console.log(this.url);
    return this.http.get<LesssonTask[]>(this.url);
  }

  getTask(id: number): Observable<LesssonTask> {
    return this.http.get<LesssonTask>(this.url + "/" + id);
  }

  addTask(task: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.url, task);
  }

  deleteTask(id: number): Observable<LesssonTask>{
    return this.http.delete<LesssonTask>(this.url + "/" + id);
  }

  updateTask(id: number, task: FormData): Observable<FormData>{
    return this.http.put<FormData>(this.url + "/" + id, task);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
