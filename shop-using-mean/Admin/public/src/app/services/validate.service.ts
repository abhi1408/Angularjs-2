import { Injectable } from '@angular/core';

@Injectable()

export class ValidateService {

	constructor() {}

	validateEmpty(fieldsObj){
		if(fieldsObj){
			return true;
		}else{
			return false;
		}
	}

	validateEmail(email){
		const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
		return reg.test(email);
	}
}