import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { AuthResponseDto, PasswordDto, RegistrationResponseDto, UserForAuthenticationDto, UserForProfileDto, UserForRegistrationDto } from 'src/app/interfaces/user';
import { user } from 'src/app/models/task/user.module';
import { EnvironmentUrlService } from '../environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:7040/api/User';
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private jwtHelper: JwtHelperService) { }
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  userId?: string;

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.baseUrl);
  }

  getAllStudents(filterIds?: string[]): Observable<user[]> {
    return this.http.post<user[]>(this.baseUrl + "/students", filterIds);
  }

  getUser(): Observable<user> {
    return this.http.get<user>(this.baseUrl + "/" + this.getUserName());
  }

  addUser(user: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.baseUrl, user);
  }

  loginUser(body: UserForAuthenticationDto){
    return this.http.post<AuthResponseDto>('https://localhost:7040/api/accounts/Login', body);
  }

  registerUser(body: UserForRegistrationDto){
    return this.http.post<RegistrationResponseDto> ('https://localhost:7040/api/accounts/Registration', body);
  }

  updateUser(user: UserForProfileDto): Observable<FormData>{
    return this.http.put<FormData>(this.baseUrl + "/profile", user);
  }

  updateUserPassword(user: PasswordDto): Observable<FormData>{
    return this.http.put<FormData>(this.baseUrl + "/password", user);
  }

  deleteUser(id: string): Observable<user[]>{
    return this.http.delete<user[]>(this.baseUrl + "/" + id);
  }

  sendAuthStateChangeNotification(isAuthenticated: boolean){
    this.authChangeSub.next(isAuthenticated);
  }

  isUserAuthenticated(): boolean{
    const token = localStorage.getItem("token");
    let auth = token!=null && !this.jwtHelper.isTokenExpired(token);
    this.sendAuthStateChangeNotification(auth)
    return auth;
  }

  public isUserTeacher (): boolean{
    const token = localStorage.getItem("token");
    if(!token) return false;
    const decodedToken = this.jwtHelper.decodeToken(token!);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role === 'Teacher';
  }

  public getUserRole(){
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token!);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    switch(role){
      case "teacher":
        return "Mokytojas";
      case "Student":
        return "Mokinys";
    }
    return "";
  }

  public getUserName(){
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token!);
    const data = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return data;
  }

  logout(){
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  createCompleteRoute(route: string, envAddress: string){
    return `${envAddress}/${route}`;
  }

}
