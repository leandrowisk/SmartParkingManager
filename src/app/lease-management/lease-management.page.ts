import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController }               from '@ionic/angular';
import { todayHistory }                 from '../interfaces/historic';
import { ChartDataSets }                from 'chart.js';
import { Color, Label }                 from 'ng2-charts';
import { animate, state, style, 
         transition, trigger }          from '@angular/animations';
import { MatCheckbox }                  from '@angular/material/checkbox';


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
  @ViewChild('checkbox') check: MatCheckbox;

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  itemClicked() {
    if (!this.isExpanded)
      this.isExpanded = true;
    else
      this.isExpanded = false;
  }

  chartDaily: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Balanço ultimos 5 dias' }
  ];

  chartMontly: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Balanço ultimos 5 meses' }
  ]

  weekLabels: Label[] = ['terça', 'quarta', 'quinta', 'sexta', 'sábado', 'Hoje'];
  monthLabels: Label[] = ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  
  displayedColumns: string[] = ['date', 'user', 'name', 'brand', 'period', 'value'];
  diaryHistoric = todayHistory;
}
