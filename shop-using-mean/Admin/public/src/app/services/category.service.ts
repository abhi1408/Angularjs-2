import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigUtils } from '../utils/config.utils';


@Injectable()

export class CategoryService {

	apiPath: string = '';

	constructor(private http: Http,
		private configUtils: ConfigUtils) {
		this.apiPath = configUtils.getApiURI();
	}

	getCategories(){
		return this.http.get(this.apiPath + 'category')
					.map(response => response.json());
	}

	getCategory(id){
		return this.http.get(this.apiPath + 'category/' + id)
					.map(response => response.json());
	}

	addCategory(newCategory) {
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.apiPath + 'category', JSON.stringify(newCategory), { headers: headers })
					.map(response => response.json());
	}

	updateCategory(id, category){
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.put(this.apiPath + 'category/' + id, JSON.stringify(category), { headers: headers })
					.map(response => response.json());
	}
	
	deleteCategory(id){
		return this.http.delete(this.apiPath + 'category/' + id)
					.map(response => response.json());
	}

}