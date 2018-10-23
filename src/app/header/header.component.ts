import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WeatherDataService } from '../weather-data.service';
import { show } from '../animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [ show ]
})
export class HeaderComponent implements OnInit {

  constructor(private weatherService: WeatherDataService) { }

  ngOnInit() {
  }

  onFind(f: NgForm) {
    this.weatherService.searchWeatherData(f.value.name);
    f.reset();
  }

}
