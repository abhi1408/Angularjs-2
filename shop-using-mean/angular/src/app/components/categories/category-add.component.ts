import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { NotificationUtils } from '../../utils/notification.utils';
import { ConfigUtils } from '../../utils/config.utils';


@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: './category-add.component.html',
	providers: [CategoryService]
})
export class CategoryAddComponent {
	pageTitle = 'Category Add';
	apiPath: string = '';

	model = new Category('', '', true); 

	name: string;
	parent: number;
	status: boolean;

	statusList =[{"name":"Active", "value":true}, {"name":"Inactive", "value":false}];

	constructor(private categoryService: CategoryService, 
	    private router: Router,
	    private notificationUtils: NotificationUtils,
	    private configUtils: ConfigUtils) {
	    	this.apiPath = configUtils.getApiURI();
	};
  	addCategory() {
		const newCategory = {
			name: this.model.name,
			price: this.model.parent,
      		status: this.model.status,
		}
		this.categoryService.addCategory(newCategory)
        .subscribe(data => {
          this.notificationUtils.printMessage('success', 'Category added successfully.');
          this.goBack();
        });
	}

  
	goBack(){
		this.router.navigateByUrl('/categories');
	}
}
