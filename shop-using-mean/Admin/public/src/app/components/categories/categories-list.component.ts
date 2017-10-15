import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { NotificationUtils } from '../../utils/notification.utils';


@Component({
  selector: 'app-root',
  templateUrl: './categories-list.component.html',
  providers: [CategoryService]
})
export class CategoriesListComponent implements OnInit {
  	pageTitle = 'Categories List';

  	categories : any;

  	constructor(private categoryService: CategoryService,
      private notificationUtils: NotificationUtils) {};

	ngOnInit(){
	  	this.getCategories();
	}

	getCategories(){
    this.categoryService.getCategories()
      .subscribe(response => {
        this.categories = response;
        //console.log(this.categories);
      });
  }

  deleteCategory(id: any){
    var categories = this.categories;  
    this.categoryService.deleteCategory(id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < categories.length; i++){
            if(categories[i]._id == id){
              categories.splice(i, 1);
              this.notificationUtils.printSuccessMessage('Category deleted successfully.');
            }
          }
        }
      });
  }

}
