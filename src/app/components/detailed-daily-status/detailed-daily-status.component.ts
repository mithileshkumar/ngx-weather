// Angular package
import { Component, Input, OnChanges } from '@angular/core';

// Third party package
import * as Highcharts from 'highcharts';
import  Bellcurve from 'highcharts/modules/histogram-bellcurve';
Bellcurve(Highcharts);

// Internal files
import { bellChart, lineChart } from '../../utils/chart';
import { ICurrentWeatherDetails, initialCurrentWeatherDetails } from './detailed-daily-status';
@Component({
  selector: 'app-detailed-daily-status',
  templateUrl: './detailed-daily-status.component.html',
  styleUrls: ['./detailed-daily-status.component.scss']
})
export class DetailedDailyStatusComponent implements OnChanges {
  Highcharts: typeof Highcharts = Highcharts;
  lineChartOptions: Highcharts.Options = lineChart;
  bellChartOptions: Highcharts.Options = bellChart;
  currentDetails: ICurrentWeatherDetails = {
    temp: 0,
    icon: '',
    pressure: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0
  };

  @Input('currentData') currentData: ICurrentWeatherDetails = initialCurrentWeatherDetails;

  constructor() { }

  ngOnChanges(): void {
    this.currentDetails = this.currentData;
  }

}
