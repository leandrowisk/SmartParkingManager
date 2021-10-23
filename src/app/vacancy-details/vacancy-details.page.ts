import { Component, OnInit } from '@angular/core';
import { MenuController }    from '@ionic/angular';
import { todayHistory }      from '../interfaces/historic';
@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.page.html',
  styleUrls: ['./vacancy-details.page.scss'],
})
export class VacancyDetailsPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
     this.close();
  }

  close() {  
    this.menu.close();
  }

  displayedColumns: string[] = ['date', 'user', 'name', 'brand', 'period', 'value'];
  diaryHistoric = todayHistory;

}
