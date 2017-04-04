import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { NotificationUtils } from '../../utils/notification.utils';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './products-add.component.html',
  providers: [ProductService]
})

export class ProductsAddComponent {
  pageTitle = 'Product';
  	 
	name: string;
	price: number;
	status: boolean;

  	constructor(private productService: ProductService, 
      private router: Router,
      private notificationUtils: NotificationUtils) {};

  	addProduct() {
  		var product = {
  			name: this.name,
  			price: this.price,
  			status: this.status,
  		}
  		this.productService.addProduct(product)
          .subscribe(data => {
            this.notificationUtils.printSuccessMessage('Product added successfully.');
            this.goBack();
          });
  	}

    goBack(){
      this.router.navigateByUrl('/products');
    }
}
