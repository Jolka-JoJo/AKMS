import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRuleToLessonRequest, AddTaskToLessonRequest, AddUserToLessonRequest, LessonResponse, RemoveRuleFromLessonRequest, RemoveTaskFromLessonRequest, RemoveUserFromLessonRequest } from 'src/app/interfaces/lesson';
import { EnvironmentUrlService } from '../environment-url.service';
import { user } from 'src/app/models/task/user.module';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  url = 'https://localhost:7040/api/lesson';
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private userService:UserService) { }

  getAllLessons(userId: string): Observable<LessonResponse[]> {
    return this.http.get<LessonResponse[]>(this.url + "/all/" + userId);
  }

  getLesson(id: number, userId: string = "0"): Observable<LessonResponse> {
    console.log("ID", userId);
    return this.http.get<LessonResponse>(this.url + "/" + id + "/" + userId);
  }

  addLesson(task: FormData): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url, task);
  }

  deleteLesson(lessonId: number, userId: string): Observable<LessonResponse[]>{
    return this.http.delete<LessonResponse[]>(this.url + "/delete/" + userId + "/" + lessonId);
  }

  updateLesson(id: number, lesson: FormData): Observable<LessonResponse>{
    return this.http.put<LessonResponse>(this.url + "/" + id, lesson);
  }

  addTasksToLesson(data: AddTaskToLessonRequest): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url + "/addTask" , data);
  }

  removeTaskFromLesson(data: RemoveTaskFromLessonRequest): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url + "/removeTask" , data);
  }

  addUsersToLesson(data: AddUserToLessonRequest): Observable<any[]>{
    return this.http.post<any[]>(this.url + "/addUsers" , data);
  }

  getLessonStudents(lessonId: number): Observable<any[]>{
    return this.http.get<any[]>(this.url + "/getStudents/" + lessonId);
  }

  removeUserFromLesson(data: RemoveUserFromLessonRequest): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url + "/removeUser" , data);
  }

  addRuleToLesson(data: AddRuleToLessonRequest): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url + "/addRule" , data);
  }

  removeRuleFromLesson(data: RemoveRuleFromLessonRequest): Observable<LessonResponse[]>{
    return this.http.post<LessonResponse[]>(this.url + "/removeRule" , data);
  }

  finishedLesson(lessonId: number, userId: string){
    return this.http.post(this.url + "/finished", {userId: userId, lessonId: lessonId});
  }
}
