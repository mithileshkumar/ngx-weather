import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ICoordinates, initialCoordinates } from '../app';

@Injectable({
  providedIn: 'root'
})
export class WeatherGeolocationService {
  private key: string = environment.apiKey;
  coordinates: any;

  constructor(private http: HttpClient) { }

  getLocation(): Observable<ICoordinates> {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const updatedCoords: ICoordinates = {
            latitude: success.coords.latitude,
            longitude: success.coords.longitude,
            timestamp: success.timestamp
          }
          obs.next(updatedCoords);
          obs.complete();
        },
        (error) => {
          obs.next(initialCoordinates);
          obs.complete();
        }
      );
    });
  }

  getDetails(coords: ICoordinates) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&cnt=20&exclude=minutely&units=metric&appid=${this.key}`;
    return this.http.get(url);
  }


}
