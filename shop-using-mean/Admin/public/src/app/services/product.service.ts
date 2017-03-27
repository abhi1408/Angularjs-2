import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class ProductService {

	constructor(private http: Http) {}

	getProducts(){
		console.log('get products');
	}

	addProduct(product) {
		var headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:8000/api/product', JSON.stringify(product), { headers: headers })
					.map(response => response.json());
	}

}