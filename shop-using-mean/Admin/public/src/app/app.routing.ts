import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CategoriesListComponent } from './components/categories/categories-list.component';
import { CategoryAddComponent } from './components/categories/category-add.component';

import { ProductsListComponent } from './components/products/products-list.component';
import { ProductsAddComponent } from './components/products/products-add.component';
import { ProductEditComponent } from './components/products/products-edit.component';

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
    path: 'product/edit/:id',
    component: ProductEditComponent
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
  ProductEditComponent,
  ProductsListComponent,
  ProductsAddComponent
]