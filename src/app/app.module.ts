// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner'; // TODO: use own implementation instead of package

// Third party modules
import { HighchartsChartModule } from 'highcharts-angular';

// Internal files
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailedDailyStatusComponent } from './components/detailed-daily-status/detailed-daily-status.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { WeeklyStatusComponent } from './components/weekly-status/weekly-status.component';

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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
