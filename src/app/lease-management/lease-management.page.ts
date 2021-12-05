import { ChangeDetectorRef, 
         Component, 
         OnInit, 
         ViewChild }                    from '@angular/core';
import { Color, Label }                 from 'ng2-charts';
import { animate, state, style, 
         transition, trigger }          from '@angular/animations';
import { ActivatedRoute }               from '@angular/router';
import { LeaseService }                 from '../services/lease.service';
import { Lease }                        from '../interfaces/Lease';
import { MatTableDataSource }           from '@angular/material/table';
import { MatPaginator }                 from '@angular/material/paginator';
import { MatSelect }                    from '@angular/material/select';
import { MatDialog }                    from '@angular/material/dialog';
import { BalanceOptionsPage }           from '../balance-options/balance-options.page';
import { MenuService }                  from '../services/menu.service';

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
  public balance5day = [0,0,0,0,0];
  public balance5month = [0,0,0,0,0];
  public balanceWeekValue = [0,0,0,0,0,0,0];
  public currentMonth = 0;
  public lease: MatTableDataSource<Lease> = new MatTableDataSource();
  public labeldaily: String = 'Balanço dos ' + String(this.dailyViewMode + 1) + ' dias anteriores';
  public labelMonthly: String = 'Balanço dos ' + String(this.monthlyViewMode) + ' meses anteriores';
  public totalByWeek = 0;
  public totalTodayWeek = 0;
  @ViewChild(MatPaginator,  { static: true }) paginator: MatPaginator;
  @ViewChild('select') select: MatSelect;

  constructor(private route: ActivatedRoute,
              private _leaseService: LeaseService,
              private changes: ChangeDetectorRef,
              public dialog: MatDialog,
              private changeDetector: ChangeDetectorRef,
              private menuService : MenuService) { }

  ngOnInit() {
    this.initializeArrays();
    this.balanceFiveMonths()
    this.setToday();
    this.formatDate();
    this.setDaysLabelsChart();
    this.setMonthLabelsChart();
    this.setWeekLabelChart();
    this.setDaysOfWeeks();
    this.showSelectDay();
    this.changeDetector.detectChanges();
    this.balanceWeek();
    this.resize();
  }

  previusYear() {
    if(this.selectedYear > this.registerYear)
      this.selectedYear -= 1;
    this.formatDate();
    this.balanceFiveMonths();
    this.balanceWeek();
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
    this.balanceFiveMonths();
    this.balanceWeek();
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
    this.balanceWeek();
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
    this.balanceWeek();
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
    if(this.financialDaySelected > this.today || this.financialDaySelected < this.registerDate){
      this.hasValues = false;
      this.balance5day = [0,0,0,0,0]}
    else {
      this.balanceFiveDays();
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
  }

  resetData() {
    let actualMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = this.months[actualMonth];
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
    dialogRef.afterClosed().subscribe(() => {
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
    this.balanceWeek();
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
    this._leaseService.balanceFiveDays(this.financialDaySelected.toISOString()).subscribe(lease=> {
      this.balance5day=[];
      this.balance5day.push(lease.last4day);
      this.balance5day.push(lease.last3day);
      this.balance5day.push(lease.last2day);
      this.balance5day.push(lease.last1day);
      this.balance5day.push(lease.today);
    });
  }

  balanceWeek() {
    this._leaseService.balanceWeek(this.selectedMonth,this.selectedYear,this.selectedWeek).subscribe(lease=> {
      this.balanceWeekValue=[];
      this.balanceWeekValue.push(lease.day1);
      this.balanceWeekValue.push(lease.day2);
      this.balanceWeekValue.push(lease.day3);
      this.balanceWeekValue.push(lease.day4);
      this.balanceWeekValue.push(lease.day5);
      this.balanceWeekValue.push(lease.day6);
      this.balanceWeekValue.push(lease.day7);

      this.totalByWeek = lease.total;
      this.totalTodayWeek = lease.today;
    });
  }

  balanceFiveMonths() {
    this._leaseService.balanceFiveMonths(this.selectedMonth,this.selectedYear).subscribe(lease=> {
      this.balance5month = [];
      this.balance5month.push(lease.last11month);
      this.balance5month.push(lease.last10month);
      this.balance5month.push(lease.last9month);
      this.balance5month.push(lease.last8month);
      this.balance5month.push(lease.last7month);
      this.balance5month.push(lease.last6month);
      this.balance5month.push(lease.last5month);
      this.balance5month.push(lease.last4month);
      this.balance5month.push(lease.last3month);
      this.balance5month.push(lease.last2month);
      this.balance5month.push(lease.last1month);
      this.balance5month.push(lease.now);
      this.currentMonth = lease.currentMonth;
    });
  }

  resize() {
    this.menuService.isMenuOpen.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      })   
  }

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
    this.balanceFiveMonths();
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
