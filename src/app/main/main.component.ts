import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Subscription } from 'rxjs';

import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  weatherDataSubscription: Subscription;
  newIcon: Subscription;

  chosenCity = [];
  icon: string;
  num = 0;

  constructor(private weatherService: WeatherDataService) { }

  onFind(f: NgForm) {
    this.weatherService.searchWeatherData(f.value.name);
    f.reset();
  }

  ngOnInit() {
    this.weatherDataSubscription = this.weatherService.addedCities.subscribe((arr) => {
      this.chosenCity = arr;
    });
    this.weatherService.retrieveFromStorage();
  }

  ngOnDestroy() {
    this.weatherDataSubscription.unsubscribe();
    this.weatherService.arr = [];
  }

}
