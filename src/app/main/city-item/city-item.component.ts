import { Component, OnInit, Input} from '@angular/core';

import { WeatherDataService } from '../../weather-data.service';
import { TodayWeather } from '../../pattern/today-weather';
import { toggle} from '../../animations';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.css'],
  animations: [ toggle ]
})
export class CityItemComponent implements OnInit {
  @Input() city: TodayWeather;
  @Input() i: number;
  @Input() icon: string;
  @Input() num: string;

  degrees = 'C';

  get tempName() {
    return this.degrees === 'C' ? 'base' : 'right';
  }

  gradients = ['linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)',
               'linear-gradient(to right, #8e9eab, #eef2f3)',
               'linear-gradient(to right, #e0eafc, #cfdef3)',
               'linear-gradient(to right, #bdc3c7, #2c3e50)',
               'linear-gradient(to right, #be93c5, #7bc6cc)'];

  myStyles() {
    if (this.city.description === 'clear sky') {
      return {'background': this.gradients[0] };
    }
    if (this.city.description === 'scattered clouds') {
      return {'background': this.gradients[1] };
    }
    if (this.city.description === 'haze') {
      return {'background': this.gradients[2] };
    }
    if (this.city.description === 'broken clouds'
      || this.city.description === 'overcast clouds'
      ||  this.city.description === 'light rain'
      || this.city.description === 'shower rain') {
      return {'background': this.gradients[3] };
    }
    if (this.city.description === 'few clouds') {
      return {'background': this.gradients[4] };
    }
  }

  constructor( private weatherService: WeatherDataService) { }

  onDelete() {
    this.weatherService.removeElement(this.i, this.city.city);
  }

  changeMeasurment() {
    this.degrees === 'C' ? this.changeToFarenheit() : this.changeToCelsius();
  }

  changeToFarenheit() {
    const fahrenheit = this.city.temperature * 9 / 5 + 32;
    this.city.temperature = Math.round (fahrenheit * 100) / 100;
    this.degrees = 'F';
  }

  changeToCelsius() {
    const celsius = (this.city.temperature - 32) * 5 / 9;
    this.city.temperature =  Math.round (celsius * 100) / 100;
    this.degrees = 'C';
  }

  showExplicitForecast() {
    this.weatherService.get5daysForecast(this.city.city, this.city.country);
  }

  ngOnInit() {
  }

}
