import { Component, ElementRef, OnInit, ViewChild }                      from '@angular/core';
import { ActivatedRoute, Router }                                 from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet }             from 'ng2-charts';
import { ParkingService }    from '../services/Parking.service';

@Component({
  selector: 'app-parking-monitoring',
  templateUrl: './parking-monitoring.page.html',
  styleUrls: ['./parking-monitoring.page.scss'],
})
export class ParkingMonitoringPage implements OnInit {

  doughnutChartData: MultiDataSet = [[0,0]];

  public parkingMonivorValues;

  public ratingValues;

  public vacanciesStatus = {
    "v1":0,
    "v2":0,
    "v3":0,
    "detailV1":null,
    "detailV2":null,
    "detailV3":null
 };

  public ratingPerCent = {
      bad: 0,
      medium: 0,
      satisfied: 0,
      very_bad: 0,
      very_satisfied: 0
  };

  public date: Date = new Date();
  public isMenuOpen: any = false;
  public menuHistory: boolean = false;
  @ViewChild('container') container: ElementRef;
  constructor(public router: Router,
              private parkingService: ParkingService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.parkingMonivorValues  = {
      "busy_vacancies": 0,
      "disponible_vacancies": 0,
      "vacancy_utilized": 0
    };
    this.resize();
    this.getRatingsMonitor();
    this.getParkingMonitorFeedback();
    this.getVacanciesStatus();
  }

  getParkingMonitorFeedback(){
      this.parkingService.getRatingsMonitor().subscribe(results => {
        this.ratingValues = results;
        this.setRatingPerCentValues();
      });
  }
  
  getVacanciesStatus(){
    this.parkingService.getVacanciesStatus().subscribe(results => {
      this.vacanciesStatus = results;
    });
}

  getRatingsMonitor(): void{
    this.parkingService.getParkingMonitorVacancies().subscribe(result => {
      this.parkingMonivorValues = result;
      this.setPerCentValues()
    });
  }

  setRatingPerCentValues(){
    this.ratingPerCent.bad = (this.ratingValues.bad / this.ratingValues.total ) * 100;
    this.ratingPerCent.very_bad = (this.ratingValues.very_bad / this.ratingValues.total ) * 100;
    this.ratingPerCent.medium = (this.ratingValues.medium / this.ratingValues.total ) * 100;
    this.ratingPerCent.satisfied = (this.ratingValues.satisfied / this.ratingValues.total ) * 100;
    this.ratingPerCent.very_satisfied = (this.ratingValues.very_satisfied / this.ratingValues.total ) * 100;
  }

  setPerCentValues(){
    let disponible = this.parkingMonivorValues.disponible_vacancies;
    let busy = this.parkingMonivorValues.busy_vacancies;
    let utilized = this.parkingMonivorValues.vacancy_utilized;

    let busyFinal = (busy / utilized) * 100;
    let disponibleFinal = (disponible / utilized)*100;

    this.doughnutChartData = [[busyFinal,disponibleFinal]]
  }

  resize() {
      if(this.menuHistory != this.isMenuOpen) {
        if (this.isMenuOpen) {
          this.menuHistory = true;
        }
        else {
          this.isMenuOpen = false;
          this.menuHistory = false;
        }
      }
  }

  details(id) {
    this.router.navigate(['/vacancy-details'], {queryParams:{isMenuOpen: this.isMenuOpen,idVacancie:id}});
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

  public chartColors: Color[] = [
    { 
      backgroundColor: 
      [
        '#FF0000',
        '#008000'
      ]
    }
   
  ];


}
