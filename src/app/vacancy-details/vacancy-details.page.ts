import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.page.html',
  styleUrls: ['./vacancy-details.page.scss'],
})
export class VacancyDetailsPage implements OnInit {
  public isMenuOpen = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.resize();
  }

  resize() {
    if (this.route.snapshot.paramMap.get('isMenuOpen'))
      this.isMenuOpen = true;
    else
      this.isMenuOpen = false;
  }

  displayedColumns: string[] = ['data', 'usuário', 'nome', 'marca', 'periodo', 'valor'];

}
