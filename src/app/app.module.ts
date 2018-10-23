import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { CityItemComponent } from './main/city-item/city-item.component';
import { AppRoutingModule } from './app-routing.module';
import { ExtensiveForecastComponent } from './main/extensive-forecast/extensive-forecast.component';
import { DatePipe } from './pipes/date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CityItemComponent,
    ExtensiveForecastComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
