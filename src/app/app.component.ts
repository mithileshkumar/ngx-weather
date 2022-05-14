// Angular package
import { Component, OnInit } from '@angular/core';

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
  weeklyData: any;
  hourlyData: any;
  title = 'ngx-weather';
  coordinates: ICoordinates = initialCoordinates;
  currentSelection: number = 0;

  constructor(private locationService: WeatherGeolocationService) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe((data: ICoordinates) => {
      this.coordinates = {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp
      };
      this.getMoreDetails(this.coordinates);
    });
  }

  getMoreDetails(coords: ICoordinates) {
    this.locationService.getDetails(coords).subscribe((data: any) => {
      this.weeklyData = this.getWeeklyData(data);
      this.updateCurrentData(data.current);
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
