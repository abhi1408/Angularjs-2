import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModle, RoutingComponents } from './app.routing';

import { ConfigUtils } from './utils/config.utils';
import { NotificationUtils } from './utils/notification.utils';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModle
  ],
  providers: [
    ConfigUtils,
    NotificationUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
