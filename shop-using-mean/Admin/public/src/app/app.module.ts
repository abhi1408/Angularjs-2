import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2PaginationModule } from 'ng2-pagination';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { ImageUploadModule } from 'angular2-image-upload';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';


import { AppComponent } from './app.component';
import { AppRoutingModle, RoutingComponents } from './app.routing';

import { ConfigUtils } from './utils/config.utils';
import { NotificationUtils } from './utils/notification.utils';

import 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    ImageUploadModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    AppRoutingModle
  ],
  providers: [
    ConfigUtils,
    NotificationUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
