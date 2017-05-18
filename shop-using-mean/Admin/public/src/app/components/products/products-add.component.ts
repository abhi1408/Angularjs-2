import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { ProductService } from '../../services/product.service';
import { NotificationUtils } from '../../utils/notification.utils';
import { ConfigUtils } from '../../utils/config.utils';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './products-add.component.html',
  providers: [ProductService]
})

export class ProductsAddComponent {
  pageTitle = 'Product';

  apiPath: string = '';

	name: string;
	price: number;
	status: boolean;
  image: string;
  description: string;

  
  image1Data:any;
  cropperSettings1:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;
  

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

	constructor(private productService: ProductService, 
    private router: Router,
    private notificationUtils: NotificationUtils,
    private configUtils: ConfigUtils) {
    this.apiPath = configUtils.getApiURI();

    /*image crop settings*/
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 100;
    this.cropperSettings1.height = 100;

    this.cropperSettings1.croppedWidth = 500;
    this.cropperSettings1.croppedHeight = 500;

    this.cropperSettings1.canvasWidth = 465;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 200;
    this.cropperSettings1.minHeight = 200;
    
    this.cropperSettings1.cropperClass = 'cropper-canvas';

    this.image1Data = {};
  };

  cropped(bounds:Bounds) {
    this.croppedHeight = bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

	addProduct() {
		var product = {
			name: this.name,
			price: this.price,
      status: this.status,
      image: this.image1Data.image,
			description: this.description,
		}
    //console.log(this.image1Data.image);
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
