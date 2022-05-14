// Angular package
import { Component, OnInit } from '@angular/core';

// Internal files 
import { getIcon, getday } from '../utils/icons-path';
import { WeatherGeolocationService } from './weather-geolocation.service';

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
  coordinates: any;
  currentSelection: number = 0;

  constructor(private locationService: WeatherGeolocationService) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe((data: any) => {
      this.coordinates = {
        latitude: data.lat,
        longitude: data.lon,
        timestamp: data.timestamp
      };
      this.getMoreDetails(this.coordinates);
    });
  }

  getMoreDetails(coords: any) {
    this.locationService.getDetails(coords).subscribe((data: any) => {
      this.weeklyData = this.getWeeklyData(data);
      this.updateCurrentData(data.current);
    });
  }

  getWeeklyData(data: any) {
    const updatedWeeklyData = data.daily.map((x: any) => {
      const weeklyData = Object.create(null);
      weeklyData.date = new Date(x.dt * 1000);
      weeklyData.day = getday(weeklyData.date.getDay());
      weeklyData.max = Math.round(x.temp.max);
      weeklyData.min = Math.round(x.temp.min);
      weeklyData.weather = x.weather[0].main;
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
