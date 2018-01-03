import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchformComponent } from './searchform/searchform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TravelService} from './travel.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_FORMATS, MatInputModule, MatSelectModule, NativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    SearchformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    NativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    TravelService,
    {provide: MAT_DATE_FORMATS, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {



}
