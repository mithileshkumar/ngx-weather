// Angular package
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

// Third party package
import { debounceTime, Subject, Subscription } from 'rxjs';

// Internal files
import { cityStateList } from '../../utils/city-state-list';
import { getIcon } from '../../utils/icons-path';
import { SearchbarService } from './searchbar.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {

  @Output('updateCurrentCityDetails') updateCurrentCityDetails = new EventEmitter();

  cityList: any;
  inputSubscription$: Subscription[] = [];
  userInput: string = '';
  userInputSearch = '';
  userInputUpdate = new Subject<string>();

  constructor(public searchbarService: SearchbarService) { }

  ngOnInit(): void {
    const inputSubscription$ = this.userInputUpdate.pipe(
      debounceTime(400))
      .subscribe((userValue: string) => {
        this.onSearch(userValue);
      });
    this.inputSubscription$.push(inputSubscription$);
  }

  onSearch(userValue: string): void {
    this.userInput = userValue.trim().toLowerCase();
    if (this.userInput === '') {
      return;
    }
    this.cityList = cityStateList.filter((currentCity: any) => {
      return currentCity.name.toLowerCase().startsWith(this.userInput);
    });
    this.cityList.forEach((currData: any) => {
      this.searchbarService.getCityWeatherDetails(currData.name.toLowerCase()).subscribe((data) => {
        this.cityList = this.cityList.map((currentCity: any) => {
          const updatedCityList = { ...currentCity };
          //@ts-ignore
          if (data.name.toLowerCase() === currentCity.name.toLowerCase()) {
            //@ts-ignore
            updatedCityList.weather = data.weather[0].main;
            //@ts-ignore
            updatedCityList.temp = Math.round(data.main.temp);
            updatedCityList.icon = getIcon(updatedCityList.weather);
            //@ts-ignore
            updatedCityList.latitude = data.coord.lat;
            //@ts-ignore
            updatedCityList.longitude = data.coord.lon;
          }
          return updatedCityList;
        })
      });
    });

  }

  trackItem(index: number, item: any) {
    return item.id;
  }

  onClickSearch(clickEvent: any) {
    this.updateCurrentCityDetails.emit(clickEvent.currentTarget.dataset);
  }

  ngOnDestroy(): void {
    this.inputSubscription$.forEach(currentSubscription => currentSubscription.unsubscribe());
  }

}
