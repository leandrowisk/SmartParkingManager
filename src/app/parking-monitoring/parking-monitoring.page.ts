import { Component, ElementRef, 
         Injectable, OnInit, ViewChild }                          from '@angular/core';
import { ActivatedRoute, Router }                                 from '@angular/router';
import { ChartOptions, ChartType }                                from 'chart.js';
import { Color, Label, MultiDataSet }                             from 'ng2-charts';
import { MenuService }                                            from '../services/menu.service';
import { ParkingService }                                         from '../services/Parking.service';

@Component({
  selector: 'app-parking-monitoring',
  templateUrl: './parking-monitoring.page.html',
  styleUrls: ['./parking-monitoring.page.scss'],
})
@Injectable()
export class ParkingMonitoringPage implements OnInit {

  doughnutChartData: MultiDataSet = [[0,0]];

  public parkingMonivorValues = {
    "busy_vacancies": 0,
    "disponible_vacancies": 0,
    "vacancy_utilized": 0
  };

  public establishmentData: any = {"qtdRent": 0, "qtdServices": 0, "avgTime": "0:00:00", "yesterdayQtdRent": 0, "yesterdayQtdServices": 0, "yesterdayAvgTimeBigger": "false"};

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

  public activeReservarVaga = false;
  @ViewChild('container') container: ElementRef;
  constructor(public router: Router,
              private parkingService: ParkingService,
              public route: ActivatedRoute,
              public menuService:MenuService) { }

  ngOnInit() {
    this.resize();
    this.getParkingMonitorVacancies();
    this.getParkingMonitorResume ();
    this.getVacanciesStatus();
  }

  getParkingMonitorResume(){
      this.parkingService.getParkingMonitorResume().subscribe(results => {
        this.establishmentData = results;
      });
  }
  
  getVacanciesStatus(){
    this.parkingService.getVacanciesStatus().subscribe(results => {
      this.vacanciesStatus = results;
    });
}

  getParkingMonitorVacancies(): void{
    this.parkingService.getParkingMonitorVacancies().subscribe(result => {
      this.parkingMonivorValues = result;
      this.setPerCentValues();
    });
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
    this.menuService.isMenuOpen.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      })   
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
