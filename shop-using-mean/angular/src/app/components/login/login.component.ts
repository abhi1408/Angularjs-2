import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NotificationUtils } from '../../utils/notification.utils';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
	pageTitle = 'Login';

	username: String;
	password: String;

	constructor(private router: Router,
		private validateService: ValidateService,
		private authService: AuthService,
		private notificationUtils: NotificationUtils) { }

	ngOnInit() {
		this.authService.loadToken();
		if(this.authService.authToken){
	      this.router.navigate(['/dashboard']);
	    }
	}

	

	onLoginSubmit(){
		const user = {
			username: this.username,
			password: this.password
		}
		//validate name
		if(!this.validateService.validateEmpty(user.username)){
			this.notificationUtils.printMessage('error', 'Invalid username.');
			return false;
		}
		//validate password
		if(!this.validateService.validateEmpty(user.password)){
			this.notificationUtils.printMessage('error', 'Invalid password.');
			return false;
		}

		this.authService.authenticateUser(user).subscribe(data => {
			if(data.success){
				this.authService.storeUserData(data.token, data.user);

				this.notificationUtils.printMessage('success', 'Yor are nowlogged in.');
				this.router.navigate(['/dashboard']);
			}else{
				this.notificationUtils.printMessage('error', data.message);
				this.router.navigate(['/login']);
			}
		});
	}

}
