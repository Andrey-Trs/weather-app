import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params } from '../../../../node_modules/@angular/router';
import { WeatherDataService } from '../../weather-data.service';

import { Forecast } from '../../pattern/forecast';

@Component({
  selector: 'app-extensive-forecast',
  templateUrl: './extensive-forecast.component.html',
  styleUrls: ['./extensive-forecast.component.css']
})
export class ExtensiveForecastComponent implements OnInit {

  forecast: Forecast[] = [];
  city: string;

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.city = params['id'];
      }
    );
    this.weatherService.explicitForecast.subscribe((arr) => {
      for (let i = 0; i < arr.length; i++) {
        const icon = 'http://openweathermap.org/img/w/' + arr[i].weather[0].icon + '.png';
        const d = new Date(arr[i]['dt_txt']);
        const numOfDay = d.getDay();
        const weekDay = this.days[numOfDay];
        const day = new Forecast(
          arr[i]['dt_txt'],
          arr[i].main.temp,
          icon,
          weekDay,
          arr[i].weather[0].description,
        );
        this.forecast.push(day);
      }
    });
  }

}
