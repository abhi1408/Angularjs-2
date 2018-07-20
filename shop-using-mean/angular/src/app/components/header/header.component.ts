import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationUtils } from '../../utils/notification.utils';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router,
    private authService: AuthService,
    private notificationUtils: NotificationUtils) { }

  ngOnInit() {
    //assign isLoggedIn variable
    this.authService.loadToken();
    if(this.authService.authToken){
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }else{
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  onLogoutClick(){
      this.authService.logout();

      this.notificationUtils.printMessage('success', 'You are logged out');
      this.router.navigate(['/login']);

      return false;
  }
}