import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets }                from 'chart.js';
import { Color, Label }                 from 'ng2-charts';
import { animate, state, style, 
         transition, trigger }          from '@angular/animations';
import { MatCheckbox }                  from '@angular/material/checkbox';
import { ActivatedRoute }               from '@angular/router';
import { FormControl }                  from '@angular/forms';
import { users }                        from '../mocks/users-mock';
import {Observable, of }                from 'rxjs';
import { UserService }                  from '../services/user.service';
import { User }                         from '../interfaces/User';
import { LeaseService }                 from '../services/lease.service';
import { Lease }                        from '../interfaces/Lease';
import { MatTableDataSource }           from '@angular/material/table';
import { MatPaginator }                 from '@angular/material/paginator';

@Component({
  selector: 'app-lease-management',
  templateUrl: './lease-management.page.html',
  styleUrls: ['./lease-management.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LeaseManagementPage implements OnInit {
  public isExpanded: boolean = false;
  public isMenuOpen: any = false;
  public index: number;
  public weekDays: Array<string>;
  public months: Array<string>;
  public monthLabels: Label[];
  public weekLabels: Label[];
  public selectedMonth;
  public selectedDay;
  public pageSize = 2;
  public lenght = 2;
  public dataSource: Array<Lease>;
  public menuHistory: boolean = false;
  public lease: MatTableDataSource<Lease> = new MatTableDataSource();
  @ViewChild(MatPaginator,  { static: true }) paginator: MatPaginator;
  public balance5day = [0, 0, 0, 0, 0];
  public balance5month = [0, 0, 0, 0, 0];



  constructor(private route: ActivatedRoute,
              private _leaseService: LeaseService,
              private changes: ChangeDetectorRef,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() { 
    this.isMenuOpen = this.route.snapshot.paramMap.get('menuState');
    this.resize();
    this.initializeArrays();
    this.balanceFiveDays();
    this.balanceFiveMonths()
    this.setToday();
    this.setDaysLabelsChart(this.weekDays);
    this.setMonthLabelsChart(this.months);
    this.changeDetector.detectChanges();
  }
 
  initializeArrays() {
    let today: number = new Date().getDay();
    let month: number = new Date().getMonth();
    this.months = ['Janeiro', 'Fevereiro', 'Março', 
    'Abril', 'Maio', 'Junho' , 'Julho', 'Agosto' ,'Setembro','Outubro', 'Novembro', 'Dezembro'];
    this.weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    this.selectedDay = this.weekDays[today];
    this.selectedMonth = this.months[month];
  }

  itemClicked(index: number) {
      if (!this.isExpanded) {
        this.isExpanded = true;
      }
      else { 
        this.isExpanded = false;
      }     
  }

  balanceFiveDays() {
    this._leaseService.balanceFiveDays().subscribe(lease=> {
      this.balance5day[4] = lease.today;
      this.balance5day[3] = lease.last1day;
      this.balance5day[2] = lease.last2day;
      this.balance5day[1] = lease.last3day;
      this.balance5day[0] = lease.last4day;
    });
  }


  balanceFiveMonths() {
    this._leaseService.balanceFiveMonths().subscribe(lease=> {
      this.balance5month[4] = lease.now;
      this.balance5month[3] = lease.last1month;
      this.balance5month[2] = lease.last2month;
      this.balance5month[1] = lease.last3month;
      this.balance5month[0] = lease.last4month;
    });
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

  chartDaily: ChartDataSets[] = [
    { data: this.balance5day, label: 'Balanço ultimos 5 dias' }
  ];

  chartMontly: ChartDataSets[] = [
    { data: this.balance5month, label: 'Balanço ultimos 5 meses' }
  ]

  setToday() {
    let day = new Date().getMonth();
    switch(day) {
      case 0:
        this.selectedDay
         = 'Domingo';
        break;
        case 1:
          this.selectedDay
           = 'Segunda-feira';
          break;
          case 2:
            this.selectedDay
             = 'Terça-feira';
            break;
            case 3:
              this.selectedDay
               = 'Quarta-feira';
              break;
              case 4:
                this.selectedDay
                 = 'Quinta-feira';
                break;
                case 5:
                  this.selectedDay
                   = 'Sexta-feira';
                  break;
                  case 6:
                    this.selectedDay
                     = 'Sábado';
                    break;
    }
  }
 
  setMonthLabelsChart(months: Array<string>) {
    let actualMonth: number = new Date().getMonth() + 1;
    this.monthLabels = months.slice((actualMonth-5), actualMonth);
  }

  setDaysLabelsChart(weekDays) {
    let daySelected = weekDays.indexOf(this.selectedDay);
    let aux = [];
    let count = 0;
    let diference: number = daySelected - 5;
    if(daySelected < 5) {
      for(let index = daySelected; index >= 0; index --) {
        aux.push(weekDays[index]);
      }
      diference = 5 - aux.length;
      while(count < diference) {
        aux.push(weekDays[6 - count])
        count ++;
      }
      this.weekLabels = aux.reverse();
      this.weekLabels[4] = 'hoje';
    }
    else {
      diference = (daySelected - 5) + 1
      for (let index = diference; index < daySelected; index++) {
        aux.push(weekDays[index])
      }
      this.weekLabels = aux;
      this.weekLabels[4] = 'Hoje';
    }
  }

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'cornflowerblue',
      backgroundColor: '#dce9ed',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  
  displayedColumns: string[] = ['usuario', 'data',  'placa', 'periodo', 'valor'];
}
