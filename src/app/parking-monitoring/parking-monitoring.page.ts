import { Component, OnInit }                      from '@angular/core';
import { Router }                                 from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet }             from 'ng2-charts';

@Component({
  selector: 'app-parking-monitoring',
  templateUrl: './parking-monitoring.page.html',
  styleUrls: ['./parking-monitoring.page.scss'],
})
export class ParkingMonitoringPage implements OnInit {
  
  public date: Date = new Date();
  public isMenuOpen: boolean = false;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  details() {
    this.router.navigate(['/vacancy-details', {isMenuOpen: this.isMenuOpen}])
  }

  chartOptions: ChartOptions = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: 'white',
        fontSize: 10,
      },
    },
  }

  parkingCapacity: Label[] = ['Ocupado', 'Livre'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: MultiDataSet = [
    [50,50]
  ];

  
  public chartColors: Color[] = [
    { 
      backgroundColor: 
      [
        '#008000',
        '#FF0000'

      ]
    }
   
  ];


}
