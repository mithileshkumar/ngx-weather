import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  private key = environment.connectCode;

  constructor(private http: HttpClient) { }

   // fetch data using name
   getCityWeatherDetails(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.key}`;
    return this.http.get(url);
  }

}