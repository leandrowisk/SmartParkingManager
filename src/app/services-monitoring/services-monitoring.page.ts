import { Component, 
         OnInit, ViewChild }  from '@angular/core';
import { MatPaginator }       from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute }     from '@angular/router';
import { MenuController }     from '@ionic/angular';
import { Service }            from '../interfaces/Services';
import { ServicesService }    from '../services/services.service';

@Component({
  selector: 'app-services-monitoring',
  templateUrl: './services-monitoring.page.html',
  styleUrls: ['./services-monitoring.page.scss'],
})
export class ServicesMonitoringPage implements OnInit {

  public isMenuOpen: boolean = false;
  public menuHistory: boolean = false;
  public services: MatTableDataSource<Service> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private menu: MenuController,
              private _services: ServicesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.resize();
    this.getLeases();
  }

  ngAfterViewInit() {
    this.resize();
  }

  resize() {
    if (this.menuHistory != this.isMenuOpen) {
      if (this.route.snapshot.paramMap.get('menuState')) {
        this.isMenuOpen = true;
        this.menuHistory = true;
      }
      else  {
        this.isMenuOpen = false;
        this.menuHistory = false;
      }
    }
  }

  
  getLeases() {
    this._services.getServices().subscribe(service=> {
        this.services.paginator = this.paginator;
        this.services.data = service;
    })
  }

  close() {  
    this.menu.close();
  }

  
  displayedColumns: string[] = ['usuário','descrição', 'vaga', 'período'];
}
