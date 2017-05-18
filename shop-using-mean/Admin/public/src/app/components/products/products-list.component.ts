import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { NotificationUtils } from '../../utils/notification.utils';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './products-list.component.html',
  providers: [ProductService]
})
export class ProductsListComponent implements OnInit {
  	pageTitle = 'Product'; 

  	products: Array<any>;

  	constructor(private productService: ProductService,
      private notificationUtils: NotificationUtils) {};

    ngOnInit(){
      this.getProducts();
    }

    deleteProduct(id){
      this.productService.deleteProduct(id)
        .subscribe(response => {
          this.notificationUtils.printSuccessMessage('Product deleted successfully.');
          this.getProducts();
        });
    }

    getProducts(){
      this.productService.getProducts()
        .subscribe(response => {
          this.products = response;
          console.log(this.products);
        });
    }

}
