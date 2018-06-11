import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NotificationUtils } from '../../utils/notification.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	name: String;
	email: String;
	username: String;
	password: String;

	constructor(private router: Router,
		private validateService: ValidateService,
		private authService: AuthService,
		private notificationUtils: NotificationUtils) { }

	ngOnInit() {
	}

	onRegisterSubmit(){
		const user = {
			name: this.name,
			email: this.email,
			username: this.username,			
			password: this.password
		}

		//validate name
		if(!this.validateService.validateEmpty(user.name)){
			this.notificationUtils.printMessage('error', 'Invalid name.');
			return false;
		}

		//validate email
		if(!this.validateService.validateEmail(user.email)){
			this.notificationUtils.printMessage('error', 'Invalid email.');
			return false;
		}
		
		//validate username
		if(!this.validateService.validateEmpty(user.username)){
			this.notificationUtils.printMessage('error', 'Invalid username.');
			return false;
		}

		//validate password
		if(!this.validateService.validateEmpty(user.password)){
			this.notificationUtils.printMessage('error', 'Invalid password.');
			return false;
		}

		//Register User
		this.authService.registerUser(user).subscribe(data => {
			if(data._id){
				this.notificationUtils.printMessage('success', 'Your are now registered and can login.');
				this.router.navigate(['/login']);
			}else{
				this.notificationUtils.printMessage('error', 'Somthing went wrong.');
				this.router.navigate(['/register']);
			}
		});

	}

}
