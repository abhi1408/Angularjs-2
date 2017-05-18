import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { NotificationUtils } from '../../utils/notification.utils';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './products-edit.component.html',
  providers: [ProductService]
})

export class ProductEditComponent  {
  pageTitle = 'Product';
  id: string = ''; 
  product = '';

	name: string;
	price: number;
  status: boolean;
	description: string;

  	constructor(private productService: ProductService, 
      private router: Router, 
      private activatedRoute: ActivatedRoute,
      private notificationUtils: NotificationUtils) {
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
      });
      this.getProduct(this.id);
    };

    getProduct(id){
      this.productService.getProduct(id)
          .subscribe(response => {
              //console.log(response);
              this.product = response;
          });
    }

  	updateProduct() {
  		var product = {
  			name: this.name,
  			price: this.price,
        status: this.status,
  			description: this.description,
  		}
  		this.productService.updateProduct(this.id, product)
          .subscribe(data => {
            this.notificationUtils.printSuccessMessage('Product updated successfully.');
            this.goBack();
          });
  	}

    goBack(){
      this.router.navigateByUrl('/products');
    }
}
