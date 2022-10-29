import { UserService } from 'src/app/services/user/user.service';
import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isUserAuthenticated!: boolean;
  title = 'AKMS';
  constructor (private userService: UserService, private router: Router){}
  ngOnInit(): void {
  this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
      console.log("this.isUserAuthenticated", this.isUserAuthenticated)
    })
  }

  ngOnChanges(changes: SimpleChanges) {

    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
    console.log(this.isUserAuthenticated);
  }

  public logout = () => {
    this.userService.logout();
    this.router.navigate(["/"]);
  }

}
