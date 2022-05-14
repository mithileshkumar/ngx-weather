import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  private key = 'fb1212de3f4341c33ef69a4d01e6aec9';

  constructor(private http: HttpClient) { }

  getSearchedDetails(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.key}`;
    return this.http.get(url);
  }

}