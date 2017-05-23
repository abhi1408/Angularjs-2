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
  
  froalaEditorOptions: any; 

	constructor(private productService: ProductService, 
    private router: Router,
    private notificationUtils: NotificationUtils,
    private configUtils: ConfigUtils) {
    this.apiPath = configUtils.getApiURI();
    this.froalaEditorOptions = configUtils.editorGlobalSettings();
    this.cropperSettings1 = configUtils.imageCropperGlobalSettings();
    
    this.image1Data = {};
  };

  cropped(bounds:Bounds) {
    jQuery('.cropper-canvas').show();
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
