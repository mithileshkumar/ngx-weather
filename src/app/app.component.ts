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
  currentData: any;
  coordinates: ICoordinates = initialCoordinates;
  currentSelection: number = 0;
  title = 'ngx-weather';
  typeSelected: string = '';
  updatedSeriesData = [];
  weatherDataStore = [];
  weeklyData: any;

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
      this.weatherDataStore = data;
      this.spinnerService.hide();
      this.weeklyData = this.getWeeklyData(data, coords);
      this.updatedSeriesData = data.hourly.map((hourlyData: any) => {
        return [hourlyData.dt, hourlyData.temp];
      });
      this.updateCurrentData(data.current);
    }, (err) => {
      this.spinnerService.hide();
    });
  }

  getWeeklyData(data: any, coords: ICoordinates) {
    const updatedWeeklyData = data.daily.map((weather: any) => {
      const weeklyData = Object.create(null);
      weeklyData.date = new Date(weather.dt * 1000);
      weeklyData.day = getday(weeklyData.date.getDay());
      weeklyData.max = Math.round(weather.temp.max);
      weeklyData.min = Math.round(weather.temp.min);
      weeklyData.weather = weather.weather[0].main;
      weeklyData.icon = getIcon(weeklyData.weather);
      weeklyData.latitude = coords.latitude;
      weeklyData.longitude = coords.longitude;
      return weeklyData;
    });
    return updatedWeeklyData;
  }

  onUpdateDayData(id: string) {
    //@ts-ignore
    const currentDayDetails = this.weatherDataStore.daily.filter((currentData, index) => {
      return index.toString() === id;
    });
    this.currentData = {
      temp: Math.round(currentDayDetails[0].temp.day),
      icon: getIcon(currentDayDetails[0].weather[0].main.toLowerCase()),
      pressure: currentDayDetails[0].pressure,
      humidity: currentDayDetails[0].humidity,
      sunrise: currentDayDetails[0].sunrise,
      sunset: currentDayDetails[0].sunset
    };
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
