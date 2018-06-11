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

  	products: any;

  	constructor(private productService: ProductService,
      private notificationUtils: NotificationUtils) {};

    ngOnInit(){
      this.getProducts();
    }

    deleteProduct(id: any){
      var products = this.products;  
      this.productService.deleteProduct(id)
        .subscribe(data => {
          if(data.n == 1){
            for(var i = 0; i < products.length; i++){
              if(products[i]._id == id){
                products.splice(i, 1);
                this.notificationUtils.printMessage('success', 'Product deleted successfully.');
              }
            }
          }
        });
    }

    getProducts(){
      this.productService.getProducts()
        .subscribe(response => {
          this.products = response;
          //console.log(this.products);
        });
    }

}
