import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { NotificationUtils } from '../../utils/notification.utils';
import { ConfigUtils } from '../../utils/config.utils';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './category-edit.component.html',
  providers: [CategoryService]
})

export class CategoryEditComponent  {
  pageTitle = 'Category';
  id: string = ''; 
  category = '';

  apiPath: string = '';

  model = new Category('', '', true);

	name: string;
  parent: number;
  status: boolean;

  statusList =[{"name":"Active", "value":true}, {"name":"Inactive", "value":false}];

	constructor(private categoryService: CategoryService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private notificationUtils: NotificationUtils,
    private configUtils: ConfigUtils) {
    this.apiPath = configUtils.getApiURI();

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getCategory(this.id);
  };

  getCategory(id){
    this.categoryService.getCategory(id)
        .subscribe(response => {
            //console.log(response);
            this.model = this.category = response;
            this.status = response.status;
        });
  }

	updateCategory() {
		var category = {
			name: this.model.name,
			parent: this.model.parent,
      status: this.model.status,
		}
		this.categoryService.updateCategory(this.id, category)
        .subscribe(data => {
          this.notificationUtils.printMessage('success', 'Category updated successfully.');
          this.goBack();
        });
	}

  goBack(){
    this.router.navigateByUrl('/categories');
  }
}
