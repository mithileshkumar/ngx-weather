// Angular package
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third party package
import { Observable } from 'rxjs';

// Internal files
import { environment } from '../../environments/environment';
import { ICoordinates, initialCoordinates } from '../app';

@Injectable({
  providedIn: 'root'
})
export class WeatherGeolocationService {

  private key: string = environment.connectCode;

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns coordinates along with timestamp if users allows access
   */
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

  /**
   * 
   * @param coords cooridantes of city
   * @returns daily, hourly and current weather details
   */
  getDetails(coords: ICoordinates) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&cnt=20&exclude=minutely&units=metric&appid=${this.key}`;
    return this.http.get(url);
  }


}
