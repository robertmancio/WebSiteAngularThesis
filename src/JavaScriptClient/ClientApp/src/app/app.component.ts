import { Component, OnInit } from '@angular/core';
import { UserClaim, AuthService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  error: any;
  userClaims: UserClaim[] = [];
  title = 'ClientApp';

  constructor(private authorize: AuthService) {
  }

  ngOnInit() {
    //this.authorize.getUserData().subscribe({
    //  next: (userClaims: UserClaim[]) => this.userClaims = userClaims, // success path
    //  error: error => this.error = error, // error path
    //});
  }

  logout() {
    if (this.userClaims) {
      window.location.href = this.userClaims.find(x => x.type == "bff:logout_url")?.value!;
    } else {
      window.location.href = "/bff/logout";
    }
  }

  login() {
    this.authorize.login();
  }
}
