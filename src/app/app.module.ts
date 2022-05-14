// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Third party modules
import { HighchartsChartModule } from 'highcharts-angular';

// Internal files
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailedDailyStatusComponent } from './detailed-daily-status/detailed-daily-status.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { WeeklyStatusComponent } from './weekly-status/weekly-status.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailedDailyStatusComponent,
    SearchbarComponent,
    WeeklyStatusComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
