import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigUtils } from '../utils/config.utils';


@Injectable()

export class ProductService {

	apiPath: string = '';

	constructor(private http: Http,
		private configUtils: ConfigUtils) {
		this.apiPath = configUtils.getApiURI();
	}

	getProducts(){
		return this.http.get(this.apiPath + 'product')
					.map(response => response.json());
	}

	getProduct(id){
		return this.http.get(this.apiPath + 'product/' + id)
					.map(response => response.json());
	}

	addProduct(newProduct) {
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.apiPath + 'product', JSON.stringify(newProduct), { headers: headers })
					.map(response => response.json());
	}

	updateProduct(id, product){
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.put(this.apiPath + 'product/' + id, JSON.stringify(product), { headers: headers })
					.map(response => response.json());
	}
	
	deleteProduct(id){
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.delete(this.apiPath + 'product/' + id, headers)
					.map(response => response.json());
	}

}