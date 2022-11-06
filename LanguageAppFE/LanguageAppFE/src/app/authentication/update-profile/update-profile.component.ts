import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { PasswordDto, UserForProfileDto, UserForRegistrationDto } from 'src/app/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  profileUpdatingForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email:[''],
    role:['']
  });

  passwordUpdatingForm = this.formBuilder.group({
    password: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirm: ['', Validators.required],
  })

  user!: any;
  errors: string[] = [];
  passwordUpdated = false;
  profileUpdated = false;
  ngOnInit(): void {

    this.userService.getUser().subscribe(res => {
      this.user = res;
      this.profileUpdatingForm.controls['firstname'].setValue(this.user.FirstName);
      this.profileUpdatingForm.controls['lastname'].setValue(this.user.LastName);
      this.profileUpdatingForm.controls['role'].setValue(this.userService.getUserRole());
      this.profileUpdatingForm.controls['email'].setValue(this.user.Email);
    });

  }

  onUpdate(){
    var data:UserForProfileDto = {
      UserId: this.user.Id,
      FirstName: this.profileUpdatingForm.value.firstname!,
      LastName: this.profileUpdatingForm.value.lastname!
    };

    this.userService.updateUser(data).subscribe({
      next: (res:any) => {
      this.profileUpdated = true;
      this.user = res;
    },
    error: (err: HttpErrorResponse) => {
    }})
  }

  onPasswordUpdate(formDirective: FormGroupDirective){
    this.errors = [];
    var data:PasswordDto = {
      UserId: this.user.Id,
      Password: this.passwordUpdatingForm.value.password!,
      NewPassword: this.passwordUpdatingForm.value.newPassword!,
      ConfirmNewPassword: this.passwordUpdatingForm.value.confirm!
    };
    this.userService.updateUserPassword(data).subscribe({
      next: (res) => {
        this.passwordUpdatingForm.reset();
        formDirective.resetForm();
        this.passwordUpdated = true;
    },
    error: (err: HttpErrorResponse) => {
      if(err.error.Errors && err.error.Errors instanceof Array){
        err.error.Errors.forEach((el:any) => {
          switch(el){
            case "Username 'pastas@pastas.lt' is already taken.":
              this.errors.push("Naudotojas su tokiu elektroniniu paštu jau egzistuoja");
              break;
            case "Passwords must be at least 7 characters.":
              this.errors.push("Slaptažodį turi sudaryti bent 7 simboliai");
              break;
          }
        });
      } else
      if(!(err.error.errors instanceof Array) && err.error.errors && err.error.errors.ConfirmNewPassword){
        this.errors.push(err.error.errors.ConfirmNewPassword[0])
      }
      else if(err.error){
        this.errors.push(err.error)
      }
    }})
  }

  deleteUser(){
    this.userService.deleteUser(this.user.Id).subscribe(res => this.userService.logout());
    this.router.navigate(['/'])
  }
}
