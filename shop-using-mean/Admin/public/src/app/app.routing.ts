import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CategoriesListComponent } from './categories/categories-list.component';
import { CategoryAddComponent } from './categories/category-add.component';

import { ProductsListComponent } from './products/products-list.component';
import { ProductsAddComponent } from './products/products-add.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },{
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },{
    path: 'dashboard',
    component: DashboardComponent
  },{
    path: 'products',
    component: ProductsListComponent
  },{
    path: 'product/add',
    component: ProductsAddComponent
  },{
    path: 'categories',
    component: CategoriesListComponent
  },{
    path: 'category/add',
    component: CategoryAddComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModle {
  
}

export const RoutingComponents = [
  AppComponent,
  LoginComponent,
  DashboardComponent,
  CategoriesListComponent,
  CategoryAddComponent,
  ProductsListComponent,
  ProductsAddComponent
]