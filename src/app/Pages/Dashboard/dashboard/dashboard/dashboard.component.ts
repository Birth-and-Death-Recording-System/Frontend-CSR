import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { faCakeCandles, faBedPulse, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { HomeComponent } from '../../../../home/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LineChartComponent } from '../../../../line-chart/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HomeComponent, FontAwesomeModule, LineChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  faCakeCandles = faCakeCandles;
  faBedPulse = faBedPulse;
  faChartSimple = faChartSimple;

  birthsCount: number = 0;
  deathsCount: number = 0;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.fetchBirths().subscribe((births: any) => {
      this.birthsCount = births.count; // Assuming 'count' is the property containing the number of births
    });

    this.fetchDeaths().subscribe((deaths: any) => {
      this.deathsCount = deaths.count; // Assuming 'count' is the property containing the number of deaths
    });
  }

  fetchBirths(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/count-births/');
  }

  fetchDeaths(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/count-deaths/');
  }
}
