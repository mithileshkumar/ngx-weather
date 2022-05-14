// Angular package
import { Component, Input, OnChanges } from '@angular/core';

// Third party package
import * as Highcharts from 'highcharts';

// Internal files
import { ICurrentWeatherDetails, initialCurrentWeatherDetails } from './detailed-daily-status';
@Component({
  selector: 'app-detailed-daily-status',
  templateUrl: './detailed-daily-status.component.html',
  styleUrls: ['./detailed-daily-status.component.scss']
})
export class DetailedDailyStatusComponent implements OnChanges {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      height: 200
    },
    credits: {
      enabled: false
    },
    series: [{
      marker: {
        fillColor: '#FFFFFF',
        lineWidth: 2,
        lineColor: '#7CB5EC'
      },
      showInLegend: false,
      data: [1, 2, 3],
      type: 'line'
    }],
    title: {
      text: ''
    },
    yAxis: [{
      visible: false
    }]
  };
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
