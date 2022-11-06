import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponseDto, UserForAuthenticationDto, UserForRegistrationDto } from 'src/app/interfaces/user';
import { roleTypes } from 'src/app/models/task/auth.module';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required]),
    confirm:new FormControl('', [Validators.required]),
    role:  new FormControl('', [Validators.required])
  });
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  registrationErrorMessage: string[] = [];
  loginError: string = "";

  roleTypes = roleTypes;
  successRegister = false;
  isUserAuthenticated = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  loginUser(loginFormValue: any){
    this.loginError = "";
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      Email: login.username,
      Password: login.password
    }

    this.userService.loginUser(userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
      if(res instanceof  Array){}
      localStorage.setItem("token", res.Token);
      this.userService.sendAuthStateChangeNotification(res.IsAuthSuccessful);
      this.router.navigate(['tasks']);
    },
    error: (err: HttpErrorResponse) => {
      this.loginError = "Neteisingi prisijungimo duomenys";
    }})


  }

  registerUser(registerFormValue: any, formDirective: FormGroupDirective){
    this.registrationErrorMessage = [];
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      FirstName: formValues.firstName,
      LastName: formValues.lastName,
      Email: formValues.email,
      Password: formValues.password,
      ConfirmPassword: formValues.confirm,
      Role: formValues.role
    };
    this.userService.registerUser(user)
    .subscribe({
      next: (_) => {
        this.successRegister = true;
        formDirective.resetForm();
        this.registerForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        if(!(err.error.Errors instanceof Array) && err.error.errors.ConfirmPassword){
          this.registrationErrorMessage.push(err.error.errors.ConfirmPassword[0])
        };
    }})
  }
}
