// Angular package
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

// Internal files 
import { IWeeklyStatus, initialWeeklyWeatherDetails } from './weekly-status';

@Component({
  selector: 'app-weekly-status',
  templateUrl: './weekly-status.component.html',
  styleUrls: ['./weekly-status.component.scss']
})
export class WeeklyStatusComponent implements OnChanges {

  @Input('weeklyData') weeklyData: IWeeklyStatus[] = initialWeeklyWeatherDetails;
  @Output('updateSelectedDay') updateSelectedDay = new EventEmitter<string>();

  weeklyStatusList: IWeeklyStatus[] = initialWeeklyWeatherDetails;
  selectedDay: number = 0;
  weatherDayStyles: any;

  constructor() { }

  ngOnInit() {
    this.weatherDayStyles = {
      'weather-week__day': true,
      'weather-week__active': true,
    };
  }

  ngOnChanges(): void {
    this.weeklyStatusList = this.weeklyData;
  }

  onClickWeatherDay(id: number) {
    this.selectedDay = id;
    this.updateSelectedDay.emit(id.toString());
  }

}