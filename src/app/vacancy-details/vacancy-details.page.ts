import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { MenuController }    from '@ionic/angular';
import { todayHistory }      from '../interfaces/historic';
@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.page.html',
  styleUrls: ['./vacancy-details.page.scss'],
})
export class VacancyDetailsPage implements OnInit {
  public isMenuOpen = false;
  constructor(private menu: MenuController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.close();
    let isMenuOpen = this.route.snapshot.paramMap.get('isMenuOpen');
    if (isMenuOpen) {
      this.isMenuOpen = true;
    }
  }

  close() {  
    this.menu.close();
  }

  displayedColumns: string[] = ['date', 'user', 'name', 'brand', 'period', 'value'];
  diaryHistoric = todayHistory;

}
