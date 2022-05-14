import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherGeolocationService {
  private key = 'fb1212de3f4341c33ef69a4d01e6aec9';
  coordinates: any;
  constructor(private http: HttpClient) { }


  getLocation(): Observable<any> {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        success => {
          const cod = {
            lat: success.coords.latitude,
            lon: success.coords.longitude,
            timestamp: success.timestamp

          }
          obs.next(cod);
          obs.complete();
        },
        error => {
          obs.next({ lat: 10, lon: 20, timestamp: 1652533130485 });
          obs.complete();
        }
      );
    });
  }

  getDetails(coords: any) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&cnt=20&exclude=minutely&units=metric&appid=${this.key}`;
    return this.http.get(url);
  }


}
