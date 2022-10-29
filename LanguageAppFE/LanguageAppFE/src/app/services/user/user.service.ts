import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { AuthResponseDto, RegistrationResponseDto, UserForAuthenticationDto, UserForRegistrationDto } from 'src/app/interfaces/user';
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

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.baseUrl);
  }

  getUser(id: number): Observable<user> {
    return this.http.get<user>(this.baseUrl + "/" + id);
  }

  addUser(user: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.baseUrl, user);
  }

  loginUser(body: UserForAuthenticationDto){
    return this.http.post<AuthResponseDto>('https://localhost:7040/api/accounts/Login', body);
  }
  registerUser(body: UserForRegistrationDto){
    console.log(body)
    return this.http.post<RegistrationResponseDto> ('https://localhost:7040/api/accounts/Registration', body);
  }

  updateUser(id: number, user: FormData): Observable<FormData>{
    return this.http.put<FormData>(this.baseUrl + "/" + id, user);
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
    const decodedToken = this.jwtHelper.decodeToken(token!);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(role);
    return role === 'Teacher';
  }

  logout(){
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }
  createCompleteRoute(route: string, envAddress: string){
    return `${envAddress}/${route}`;
  }
}
