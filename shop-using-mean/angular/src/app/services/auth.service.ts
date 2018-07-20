import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { ConfigUtils } from '../utils/config.utils';

@Injectable()
export class AuthService {
	apiPath: string = '';
	authToken: any;
	user: any;

	constructor(private http: Http,
		private configUtils: ConfigUtils) {
		this.apiPath = configUtils.getApiURI();
	}

	registerUser(newUser){
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.apiPath + 'user/register', JSON.stringify(newUser), { headers: headers })
					.map(response => response.json());
	}

	authenticateUser(user){
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.apiPath + 'user/authenticate', JSON.stringify(user), { headers: headers })
					.map(response => response.json());	
	}

	storeUserData(token, user){
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));

		this.authToken = token;
		this.user = user;
	}

	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	loggedIn() {
	  	return tokenNotExpired();
	}

	logout(){
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
}