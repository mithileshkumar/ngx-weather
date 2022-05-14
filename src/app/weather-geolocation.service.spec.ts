import { TestBed } from '@angular/core/testing';

import { WeatherGeolocationService } from './weather-geolocation.service';

describe('WeatherGeolocationService', () => {
  let service: WeatherGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
