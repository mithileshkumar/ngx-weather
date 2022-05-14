// Angular package
import { Component } from '@angular/core';

// Internal files
import { cityStateList } from '../../utils/city-state-list';
import { getIcon } from '../../utils/icons-path';
import { SearchbarService } from './searchbar.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  cityList: any;
  userInput: string = '';

  constructor(public searchbarService: SearchbarService) { }

  onSearch(inputEvent: any): void {
    this.userInput = inputEvent.target.value.trim().toLowerCase();
    this.cityList = cityStateList.filter((currentCity: any) => {
      return currentCity.name.toLowerCase().startsWith(this.userInput);
    });
    this.cityList.forEach((currData: any) => {
      this.searchbarService.getSearchedDetails(currData.name.toLowerCase()).subscribe((data) => {
        this.cityList = this.cityList.map((currentCity: any) => {
          const updatedCityList = { ...currentCity };
          //@ts-ignore
          if (data.name.toLowerCase() === currentCity.name.toLowerCase()) {
            //@ts-ignore
            updatedCityList.weather = data.weather[0].main;
            //@ts-ignore
            updatedCityList.temp = Math.round(data.main.temp);
            updatedCityList.icon = getIcon(updatedCityList.weather)
          }
          return updatedCityList;
        })
      });
    });

  }

  trackItem(index: number, item: any) {
    return item.id;
  }

}
