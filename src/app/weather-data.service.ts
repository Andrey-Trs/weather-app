import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TodayWeather } from './pattern/today-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  arr = [];
  todayWeather: TodayWeather;

  addedCities = new Subject<Object[]>();
  explicitForecast = new Subject<any[]>();
  newIcon = new Subject<string>();


  latitude: number;
  longtitude: number;
  api = '47f18b640b12b71a74524e70ce4768af';
  icon;
  source: string;
  keys: string[];

  constructor(private http: HttpClient) { }


  retrieveFromStorage() {
    this.keys = Object.keys(localStorage);
    this.fetchCitiesWeather(this.keys);
  }

  fetchCitiesWeather(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
      this.searchWeatherData(arr[i]);
    }
  }

  setToStorage(city) {
    localStorage.setItem(city.toLowerCase(), 'city');
  }

  removeFromStorage(city) {
    localStorage.removeItem(city.toLowerCase());
  }

  searchWeatherData(cityName: string) {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + this.api + '&units=metric')
    .subscribe((response: any) =>  {
      this.setToStorage(cityName);
      this.source = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
      this.todayWeather = new TodayWeather(
        response.name,
        this.source,
        response.main.temp,
        response.main.humidity,
        response.weather[0].description,
        response.sys.country
      );
      this.arr.unshift(this.todayWeather);
      this.addedCities.next(this.arr);
    }, (err) => {
      console.log(err);
    });
  }

  get5daysForecast(city, country) {
    country = country.toLowerCase();
    this.http
    // tslint:disable-next-line:max-line-length
    .get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&APPID=' + this.api + '&units=metric')
    .subscribe((response: any) => {
      this.splitByDays(response.list);
    }, (err) => {
      console.log(err);
    });
  }

  splitByDays(arr) {
    const reg = /\s21:00:00/g;
    const newArr = [];
    let x = true;
    let i = 0;
    newArr.push(arr[0]);
    while (x) {
        if (reg.test(arr[i]['dt_txt'])) {
            const day = arr.splice(0, i + 1);
            x = false;
        }
        i++;
    }
    const length = arr.length;
    for (let k = 4; k < arr.length; k += 8) {
        newArr.push(arr[k]);
    }
    return this.explicitForecast.next(newArr);
}

  removeElement(index, city) {
    this.arr.splice(index, 1);
    this.removeFromStorage(city);
  }



}

