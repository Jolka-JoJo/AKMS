import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LesssonTask, userTasksDTO } from 'src/app/models/task/task.module';
import { EnvironmentUrlService } from '../environment-url.service';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = 'https://localhost:7040/api/task';
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  getAllTasks(filterData: userTasksDTO): Observable<any[]> {
    return this.http.post<any[]>(this.url + "/tasks", filterData);
  }

  getTask(id: number): Observable<LesssonTask> {
    return this.http.get<LesssonTask>(this.url + "/" + id);
  }

  addTask(task: FormData): Observable<LesssonTask[]>{
    return this.http.post<LesssonTask[]>(this.url, task);
  }

  deleteTask(taskId: number, userId: string): Observable<LesssonTask[]>{
    return this.http.delete<LesssonTask[]>(this.url + "/delete/" + userId + "/" + taskId);
  }

  updateTask(id: number, task: FormData): Observable<LesssonTask>{
    return this.http.put<LesssonTask>(this.url + "/" + id, task);
  }

  addUserToTask(data: userTasksDTO): Observable<LesssonTask>{
    return this.http.post<LesssonTask>(this.url + "/addUser", data);
  }

  removeUserFromTask(taskId: number, userId: string): Observable<LesssonTask>{
    return this.http.delete<LesssonTask>(this.url + "/removeUser/" + userId + "/"+ taskId);
  }

  updateLearnedLessons(taskId: number, userId: string){
    return this.http.put(this.url + "/learned/" + userId + "/"+ taskId, null);
  }
}
