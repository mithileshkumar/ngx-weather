// Angular package
import { Component, Input, OnChanges } from '@angular/core';

// Internal files 
import { IWeeklyStatus, initialWeeklyWeatherDetails } from './weekly-status';

@Component({
  selector: 'app-weekly-status',
  templateUrl: './weekly-status.component.html',
  styleUrls: ['./weekly-status.component.scss']
})
export class WeeklyStatusComponent implements OnChanges {

  @Input('weeklyData') weeklyData: IWeeklyStatus[] = initialWeeklyWeatherDetails;

  weeklyStatusList: IWeeklyStatus[] = initialWeeklyWeatherDetails;

  constructor() { }

  ngOnChanges(): void {
    this.weeklyStatusList = this.weeklyData;
  }

}