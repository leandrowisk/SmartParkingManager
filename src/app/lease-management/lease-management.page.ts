import { ChangeDetectorRef, 
         Component, 
         OnInit, 
         ViewChild }                    from '@angular/core';
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
import { MatSelect, MatSelectChange }   from '@angular/material/select';
import { MatDialog, MatDialogConfig }   from '@angular/material/dialog';
import { BalanceOptionsPage }           from '../balance-options/balance-options.page';

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
  public dailyLabels: Label[];
  public weekLabels: Label[];
  public selectedMonth: string;
  public selectedDay;
  public pageSize = 2;
  public lenght = 2;
  public dataSource: Array<Lease>;
  public menuHistory: boolean = false;
  public selectedYear: number;
  public registerYear: number = 2021;
  public semanalMonth: number;
  public numberWeeksOfMonth: Array<string>;
  public actualWeek: string;
  public daysOfMonth: number;
  public financialDaySelected: Date = new Date();
  public today: Date = new Date;
  public weekToSend: string;
  public formatedDate: string;
  public selectedWeek: string  = '1ª Semana';
  public dayOfYear: string;
  public dailyViewMode: number = 4;
  public monthlyViewMode: number = 12;
  public registerDate: Date = new Date(2021,10,3);
  public hasValues: boolean;
  public dailyLabelDescription: string = '';
  public monthlyLabelDescription: string = '';
  public loading: boolean = false;
  public lease: MatTableDataSource<Lease> = new MatTableDataSource();
  @ViewChild(MatPaginator,  { static: true }) paginator: MatPaginator;
<<<<<<< Updated upstream
  public balance5day = [0, 0, 0, 0, 0];
  public balance5month = [0, 0, 0, 0, 0];


=======
  @ViewChild('select') select: MatSelect;
>>>>>>> Stashed changes

  constructor(private route: ActivatedRoute,
              private _leaseService: LeaseService,
              private changes: ChangeDetectorRef,
              public dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.initializeArrays();
    this.balanceFiveDays();
    this.balanceFiveMonths()
    this.setToday();
    this.formatDate();
    this.getDailyViewMode();
    this.getMonthlyViewMode();
    this.setDaysLabelsChart();
    this.setMonthLabelsChart();
    this.setWeekLabelChart();
    this.setDaysOfWeeks();
    this.showSelectDay();
    this.changeDetector.detectChanges();
  }

  previusYear() {
    if(this.selectedYear > this.registerYear)
      this.selectedYear -= 1;
    this.formatDate();
    }

  showSelectDay() {
    let daySelected = this.financialDaySelected.toISOString();
    let dateString;
    let year = Number(daySelected.slice(0,4));
    let month = Number(daySelected.slice(5,7)) - 1;
    let day = Number(daySelected.slice(8,10));
    this.dayOfYear = String(day) + '/' +  String(month + 1) + '/' +  String(year)
    dateString = new Date(year, month, day).toString();
    this.setSelectedDay(dateString);
    this.getDailyValues();
  }

  setSelectedDay(selectedDate: string) {
    let dayOfWeek = selectedDate.slice(0,3)
    switch(dayOfWeek) {
      case 'Sun':
        this.selectedDay = 'Domingo';
        break;
        case 'Mon':
          this.selectedDay = 'Segunda-feira';
          break;
          case 'Tue':
            this.selectedDay = 'Terça-feira';
            break;
            case 'Wed':
              this.selectedDay = 'Quarta-feira';
              break;
              case 'Thu':
                this.selectedDay = 'Quinta-feira';
                break;
                case 'Fri':
                  this.selectedDay = 'Sexta-feira';
                  break;
                  case 'Sat':
                    this.selectedDay = 'Sábado';
                    break;
    }
    this.setDaysLabelsChart();
  }

  nextYear() {
    this.selectedYear += 1;
    this.formatDate();
  }

  previusMonth() {
    let index = this.months.indexOf(this.selectedMonth);
    if (index < 1 ) {
      this.selectedYear -= 1;
      index = 12 
    } 
    this.selectedMonth = this.months[index - 1];
    this.setDaysOfWeeks();
    this.getNumberWeeksOfMonth();
    this.formatDate();
  }

  nextMonth() {
    let nextMonthIndex = this.months.indexOf(this.selectedMonth) + 1;
    if (nextMonthIndex > 11) {
      this.selectedYear += 1;
      this.selectedMonth = this.months[0];
    }  
    else 
      this.selectedMonth = this.months[nextMonthIndex];
    this.setDaysOfWeeks();
    this.getNumberWeeksOfMonth();
    this.formatDate();
  }

  scroll() {
    let container = document.getElementById("container");
    setTimeout(() =>{
      container.scrollTop = container.scrollHeight;
    },0.5) 
  }
 
  initializeArrays() {
    let today: number = new Date().getDay();
    let month: number = new Date().getMonth();
<<<<<<< Updated upstream
    this.months = ['Janeiro', 'Fevereiro', 'Março', 
    'Abril', 'Maio', 'Junho' , 'Julho', 'Agosto' ,'Setembro','Outubro', 'Novembro', 'Dezembro'];
    this.weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    this.selectedDay = this.weekDays[today];
    this.selectedMonth = this.months[month];
=======
    this.selectedYear = new Date().getFullYear();
    this.semanalMonth = new Date().getMonth();
    this.financialDaySelected.toISOString();
    this.months = ['Janeiro', 'Fevereiro', 'Março', 
    'Abril', 'Maio', 'Junho' , 'Julho', 'Agosto' ,'Setembro','Outubro', 'Novembro', 'Dezembro'];
    this.weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    this.selectedDay = this.weekDays[today];
    this.selectedMonth = this.months[month];
  }

  getDailyValues() {
    if(this.financialDaySelected > this.today || this.financialDaySelected < this.registerDate)
      this.hasValues = false;
    else {
      this.chartDaily['data'] = [];
      // this._financialService.getDailyValues().subscribe(values => {
              //  this.loading = true;
            // this.chartDaily['data'].push(values)
      // });
      this.loading = false;
      this.hasValues = true;
    }
  }

  getWeekValues() {
    let year;
    let month;
    let day;
    let dateToSend: Date;
    year = this.weekToSend.slice(0, 4);
    month = this.weekToSend.slice(5, 7);
    day = this.weekToSend.slice(8 , 10);
    if (day < 10) {
      day = this.weekToSend.slice(9 , 10);
    }
    dateToSend = new Date(year, month - 1, day)
    if (dateToSend > this.today || dateToSend < this.registerDate)
      this.hasValues = false;
    else {
      console.log(this.weekToSend)
      // this.weekToSend => Data para fazer o get
      this.chartWeekly['data'] = [];
      // this._financialService.getDailyValues().subscribe(values => {
              //  this.loading = true;
            // this.chartWeekly['data'].push(values)
      // });
      this.loading = false;
      this.hasValues = true;
    }
  }

  resetData() {
    let actualMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = this.months[actualMonth];
  }

  getMonthlyValues() {
    let selectedMonth = this.months.indexOf(this.selectedMonth) + 1;
    let month = new Date(this.selectedYear, selectedMonth, 1);
    if(month > this.today || month < this.registerDate)
      this.hasValues = false;
    else {
        this.chartMontly['data'] = [];
        // this._financialService.getDailyValues().subscribe(values => {
              //  this.loading = true;
            // this.chartMontly['data'].push(values)
         // });
    }
  }

  getRegisterDate() {
    // this.registerDate = data do cadastro
  }

  changeViewChart(viewType: string): void {
    let viewMode;
    if (viewType == 'daily')
      viewMode = this.dailyViewMode;
    else
      viewMode = this.monthlyViewMode
    const dialogRef = this.dialog.open(BalanceOptionsPage, {
      width: '420px',
      data: { viewType: viewType,
              viewMode: viewMode},
    });
    dialogRef.afterClosed().subscribe(viewType => {
      console.log('result', viewType)
      if (viewType.data == 'daily') {
        this.getDailyValues()
      }
      else {
        this.getMonthlyValues();
      }
      // aqui é feito o get novamente ao fechar o modal
    });
  }

  getNumberWeeksOfMonth() {
    this.numberWeeksOfMonth = [];
    let monthWeeks = this.daysOfMonth / 7;
    if (monthWeeks > 4)
      for (let week = 1; week <= 5; week ++)
        this.numberWeeksOfMonth.push(week + 'ª' + ' Semana')
    else
      for (let week = 1; week <= 4; week ++)
        this.numberWeeksOfMonth.push(week + 'ª' + ' Semana')
  }

  formatDate() {
    this.getSelectedWeekBalance();
    this.weekToSend = '';
    for (let index = 0; index < this.formatedDate.length; index ++) {
      if (this.formatedDate[index] == '-')
        this.weekToSend += this.formatedDate[index].replace('-', '/')
      else
        this.weekToSend += this.formatedDate[index];
    }
    this.getWeekValues();
    this.setWeekLabelChart();
    this.getWeekBalance(); 
  }

  getWeekBalance() {
    // enviar this.weekToSend para retornar os 6 dias anteriores ao enviado.
  }

  getSelectedWeekBalance() {
    let selectedWeek: Date;
    switch(this.selectedWeek) {
      case '1ª Semana':
        selectedWeek = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), 7);
        this.formatedDate = selectedWeek.toISOString().slice(0, 10);
        break;
        case '2ª Semana':
          selectedWeek = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), 14);
          this.formatedDate = selectedWeek.toISOString().slice(0, 10);
          break;
            case '3ª Semana':
              selectedWeek = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), 21);
              this.formatedDate = selectedWeek.toISOString().slice(0, 10);
            break;
              case '4ª Semana':
                selectedWeek = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), 28);
                this.formatedDate = selectedWeek.toISOString().slice(0, 10);
              break;
                case '5ª Semana':
                  selectedWeek = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), this.daysOfMonth);
                  this.formatedDate = selectedWeek.toISOString().slice(0, 10);
                break;
    }
  }

  setDaysOfWeeks() {
    switch (this.selectedMonth) {
      case 'Abril': 
        this.daysOfMonth = 30; 
        break
      case 'Junho':
        this.daysOfMonth = 30; 
        break;
      case 'Setembro':
        this.daysOfMonth = 30;
        break;
      case 'Novembro':
        this.daysOfMonth = 30
        break;
      case 'Fevereiro':
        this.daysOfMonth = 28;
        break;
      default:
        this.daysOfMonth = 31
        break;
    }
    this.getNumberWeeksOfMonth();
>>>>>>> Stashed changes
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
    this.route.snapshot.paramMap.get('menuState');
  }

  getDailyViewMode() {
    // obter o modo de visualização do gráfico diário e jogar na váriavel dailyViewMode
  }

  getMonthlyViewMode() {
    // obter o modo de visualização do gráfico mensal e jogar na variavel monthlyViewMode
  }


  chartDaily: ChartDataSets[] = [
<<<<<<< Updated upstream
    { data: this.balance5day, label: 'Balanço ultimos 5 dias' }
  ];

  chartMontly: ChartDataSets[] = [
    { data: this.balance5month, label: 'Balanço ultimos 5 meses' }
=======
    { data: [85, 72, 78, 75, 77, 75, 100], label: 'Balanço dos ' + String(this.dailyViewMode + 1) + ' dias anteriores'}
  ];

  chartWeekly: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75, 100], label: 'Balanço Semanal'}
  ];

  chartMontly: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75, 45,45,86,10,74,12], label: 'Balanço dos ' + String(this.monthlyViewMode) + ' meses anteriores'}
>>>>>>> Stashed changes
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
 
  setMonthLabelsChart() {
    let aux = [];
    let count = 0;
    let selectedMonth = this.months.indexOf(this.selectedMonth) + 1;
    let diference: number = selectedMonth - this.monthlyViewMode;
    if(selectedMonth < this.monthlyViewMode) {
      for(let index = selectedMonth - 1; index >= 0; index --) {
        aux.push(this.months[index]);
      }
      diference = this.monthlyViewMode - aux.length;
      while(count < diference) {
        aux.push(this.months[11 - count])
        count ++;
      }
      this.monthLabels = aux.reverse();
    }
    else
      this.monthLabels = this.months.slice((selectedMonth - this.monthlyViewMode), selectedMonth);
  }

<<<<<<< Updated upstream
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
=======
  setDaysLabelsChart() {
    let today = new Date().toString();
    let daySelected = this.weekDays.indexOf(this.selectedDay);
    let aux = [];
    let count = 0;
    let diference: number = daySelected - this.dailyViewMode;
    let lastElementOfArray = 6;
    
    if(daySelected <= this.dailyViewMode) {
      for(let index = daySelected; index >= 0; index --) {
        aux.push(this.weekDays[index]);
      }
      diference = this.dailyViewMode - aux.length;
      while(count <= diference) {
        aux.push(this.weekDays[ lastElementOfArray - count])
        count ++;
      }
      this.dailyLabels = aux.reverse();
    }
    else {
      diference = (daySelected - this.dailyViewMode) + 1
      for (let index = daySelected; index >= daySelected - this.dailyViewMode; index --) {
        aux.push(this.weekDays[index])      
      }
      this.dailyLabels = aux.reverse();
    }
    if(today == this.financialDaySelected.toString()) 
      this.dailyLabels[this.dailyLabels.length - 1] = 'Hoje';
  }

  monthSelectedChange() {
    this.setMonthLabelsChart();
  }

  setWeekLabelChart() {
    let week: number;
    let daysOfWeek = [];
    if (this.weekToSend) {
      week = Number(this.weekToSend.slice(8, 10));
      for (let index = week; index > week - 7; index--) {
        if (index < 10)
          daysOfWeek.push('0' + String(index) + '/' + (this.months.indexOf(this.selectedMonth) + 1))
        else
          daysOfWeek.push(String(index) + '/' + (this.months.indexOf(this.selectedMonth) + 1))  
    }
    this.weekLabels = daysOfWeek.reverse();
  }
>>>>>>> Stashed changes
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
