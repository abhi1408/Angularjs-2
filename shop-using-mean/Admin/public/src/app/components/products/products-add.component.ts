import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './products-add.component.html',
  providers: [ProductService]
})

export class ProductsAddComponent {
  pageTitle = 'Products Add';
  	 
  products: Array<any>;
	name: string;
	price: number;
	status: boolean;

  	constructor(private productService: ProductService) {
  		/*productService.getProducts()
  			.subscribe(response => {
  				this.products = response;
  			});*/
  	};

  	addProduct() {
  		var product = {
  			name: this.name,
  			price: this.price,
  			status: this.status,
  		}
  		this.productService.addProduct(product)
          .subscribe(data => {
              console.log('Success', data);
          });

  	}
}
