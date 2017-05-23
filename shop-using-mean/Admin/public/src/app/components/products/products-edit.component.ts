import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { ProductService } from '../../services/product.service';
import { NotificationUtils } from '../../utils/notification.utils';
import { ConfigUtils } from '../../utils/config.utils';

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

  froalaEditorOptions: Object;

	constructor(private productService: ProductService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private notificationUtils: NotificationUtils,
    private configUtils: ConfigUtils) {
    this.apiPath = configUtils.getApiURI();
    this.froalaEditorOptions = configUtils.editorGlobalSettings();
    this.cropperSettings1 = configUtils.imageCropperGlobalSettings();

    this.image1Data = {};

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProduct(this.id);
  };

  cropped(bounds:Bounds) {
    jQuery('.cropper-canvas').show();
    this.croppedHeight = bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  getProduct(id){
    this.productService.getProduct(id)
        .subscribe(response => {
            //console.log(response);
            this.product = response;
            this.description = response.description;
        });
  }

	updateProduct() {
		var product = {
			name: this.name,
			price: this.price,
      image: this.image1Data.image,
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
