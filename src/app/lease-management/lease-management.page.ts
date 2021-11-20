import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets }                from 'chart.js';
import { Color, Label }                 from 'ng2-charts';
import { animate, state, style, 
         transition, trigger }          from '@angular/animations';
import { MatCheckbox }                  from '@angular/material/checkbox';
import { ActivatedRoute }               from '@angular/router';
import { FormControl }                  from '@angular/forms';
import { users }                         from '../mocks/users-mock';
import { leases }                        from '../mocks/leases-mock';
import {Observable, of }                from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';
import { LeaseService } from '../services/lease.service';
import { Lease } from '../interfaces/Lease';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  public isMenuOpen: boolean = false;
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
  public lease: MatTableDataSource<Lease> = new MatTableDataSource();
  @ViewChild(MatPaginator,  { static: true }) paginator: MatPaginator;
  

  constructor(private route: ActivatedRoute,
              private _leaseService: LeaseService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  
    this.resize();
    this.initializeArrays();
    this.getLeases();
    this.setToday();
    this.setDaysLabelsChart(this.weekDays);
    this.setMonthLabelsChart(this.months);
    this.changeDetector.detectChanges();
   
  }

 
  initializeArrays() {
    this.months = ['Janeiro', 'Fevereiro', 'Março', 
    'Abril', 'Maio', 'Junho' , 'Julho', 'Agosto' ,'Setembro','Outubro', 'Novembro', 'Dezembro'];
    this.weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  }

  itemClicked(index: number) {
      if (!this.isExpanded) {
        this.isExpanded = true;
      }
      else { 
        this.isExpanded = false;
      }     
  }

  getLeases() {
    this._leaseService.getLeases().subscribe(lease=> {
        this.lease.paginator = this.paginator;
        this.lease.data = lease;
    })
  }

  resize() {
    if (this.route.snapshot.paramMap.get('menuState'))
      this.isMenuOpen = true;
    else 
      this.isMenuOpen = false;
  }

  chartDaily: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Balanço ultimos 5 dias' }
  ];

  chartMontly: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Balanço ultimos 5 meses' }
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
    let today: number = new Date().getDay();
    this.weekLabels = weekDays.slice(3);
    this.weekLabels[4] = 'Hoje';
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
  
  displayedColumns: string[] = ['usuário', 'data',  'placa', 'período', 'valor'];
}
