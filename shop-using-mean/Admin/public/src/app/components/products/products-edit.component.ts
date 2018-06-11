import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { ProductService } from '../../services/product.service';
import { NotificationUtils } from '../../utils/notification.utils';
import { ConfigUtils } from '../../utils/config.utils';
import { Product } from '../../models/product';

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

  model = new Product('', '', true, '', '');

	name: string;
  price: number;
  status: boolean;
  image: string;
  description: string;

  statusList =[{"name":"Active", "value":true}, {"name":"Inactive", "value":false}];

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
            this.model = this.product = response;
            this.status = response.status;
            this.description = response.description;
        });
  }

	updateProduct() {
		var product = {
			name: this.model.name,
			price: this.model.price,
      image: this.image1Data.image,
      status: this.model.status,
			description: this.model.description,
		}
		this.productService.updateProduct(this.id, product)
        .subscribe(data => {
          this.notificationUtils.printMessage('success', 'Product updated successfully.');
          this.goBack();
        });
	}

  goBack(){
    this.router.navigateByUrl('/products');
  }
}
