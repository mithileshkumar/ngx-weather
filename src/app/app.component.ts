// Angular package
import { Component, OnInit } from '@angular/core';

// Third party package
import { NgxSpinnerService } from 'ngx-spinner';

// Internal files 
import { getIcon, getday } from './utils/icons-path';
import { WeatherGeolocationService } from './services/weather-geolocation.service';
import { ICoordinates, initialCoordinates } from './app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  typeSelected: string;
  currentData: any;
  weeklyData: any;
  hourlyData: any;
  title = 'ngx-weather';
  coordinates: ICoordinates = initialCoordinates;
  currentSelection: number = 0;

  constructor(private locationService: WeatherGeolocationService,
    private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit() {
    this.spinnerService.show();
    this.locationService.getLocation().subscribe((data: ICoordinates) => {
      this.coordinates = {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp
      };
      this.getMoreDetails(this.coordinates);
    }, (err) => {
      this.spinnerService.hide();
    });
  }

  getMoreDetails(coords: ICoordinates) {
    this.locationService.getDetails(coords).subscribe((data: any) => {
      this.spinnerService.hide();
      this.weeklyData = this.getWeeklyData(data);
      this.updateCurrentData(data.current);
    }, (err) => {
      this.spinnerService.hide();
    });
  }

  getWeeklyData(data: any) {
    const updatedWeeklyData = data.daily.map((weather: any) => {
      const weeklyData = Object.create(null);
      weeklyData.date = new Date(weather.dt * 1000);
      weeklyData.day = getday(weeklyData.date.getDay());
      weeklyData.max = Math.round(weather.temp.max);
      weeklyData.min = Math.round(weather.temp.min);
      weeklyData.weather = weather.weather[0].main;
      weeklyData.icon = getIcon(weeklyData.weather);
      weeklyData.latitude = weather.lat;
      weeklyData.longitude = weather.lon;
      return weeklyData;
    });
    return updatedWeeklyData;
  }

  updateCurrentData(currData: any) {
    this.currentData = {
      temp: Math.round(currData.temp),
      icon: getIcon(currData.weather[0].main.toLowerCase()),
      pressure: currData.pressure,
      humidity: currData.humidity,
      sunrise: currData.sunrise,
      sunset: currData.sunset
    };
  }

}
