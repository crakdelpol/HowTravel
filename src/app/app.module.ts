import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchformComponent } from './searchform/searchform.component';
import { FormsModule } from '@angular/forms';
import {TravelService} from './travel.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TravelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
