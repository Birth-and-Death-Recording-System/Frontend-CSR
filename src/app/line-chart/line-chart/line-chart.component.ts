import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { forkJoin, catchError, throwError } from 'rxjs';
import { DataItem } from '../../interface/authInterface';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CanvasJSAngularChartsModule,
    HttpClientModule,
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  chartOptions: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const birthRequest = this.http.get<DataItem[]>(
      'http://localhost:8000/birth-chart/'
    );
    const deathRequest = this.http.get<DataItem[]>(
      'http://localhost:8000/death-chart/'
    );

    forkJoin([birthRequest, deathRequest])
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      )
      .subscribe((results: [DataItem[], DataItem[]]) => {
        const birthData = results[0];
        const deathData = results[1];

        const filteredBirthData = birthData.filter((item) => item.count > 0);
        const filteredDeathData = deathData.filter((item) => item.count > 0);

        // Format axisX based on birthData
        const birthDataPoints = filteredBirthData.map((item) => ({
          x: new Date(item.date), // Assuming date is in ISO format
          y: item.count,
        }));

        // Format axisX based on deathData
        const deathDataPoints = filteredDeathData.map((item) => ({
          x: new Date(item.date), // Assuming date is in ISO format
          y: item.count,
        }));

        this.chartOptions = {
          animationEnabled: true,
          theme: 'light2',
          title: {
            text: 'Rate of Deaths and Births',
          },
          axisX: {
            title: 'Year',
            valueFormatString: 'MMM YYYY',
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
            },
          },
          axisY: {
            title: 'Count',
            crosshair: {
              enabled: true,
            },
          },
          toolTip: {
            shared: true,
          },
          legend: {
            cursor: 'pointer',
            verticalAlign: 'top',
            horizontalAlign: 'center',
            dockInsidePlotArea: true,
            itemclick: function (e: any) {
              if (
                typeof e.dataSeries.visible === 'undefined' ||
                e.dataSeries.visible
              ) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            },
          },
          data: [
            {
              type: 'line',
              showInLegend: true,
              name: 'Total Births',
              dataPoints: birthDataPoints,
            },
            {
              type: 'line',
              showInLegend: true,
              name: 'Total Deaths',
              dataPoints: deathDataPoints,
            },
          ],
        };
      });
  }
}
