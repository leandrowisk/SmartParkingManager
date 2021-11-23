import { Component, 
         OnInit, ViewChild }  from '@angular/core';
import { MatPaginator }       from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute }     from '@angular/router';
import { MenuController }     from '@ionic/angular';
import { Service }            from '../interfaces/Services';
import { ServicesService }    from '../services/services.service';
import { Lease }                        from '../interfaces/Lease';
import { LeaseService } from '../services/lease.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-services-monitoring',
  templateUrl: './services-monitoring.page.html',
  styleUrls: ['./services-monitoring.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServicesMonitoringPage implements OnInit {

  public isMenuOpen: boolean = false;
  public menuHistory: boolean = false;
  public services: MatTableDataSource<Service> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: Array<Lease>;
  public lease: MatTableDataSource<Lease> = new MatTableDataSource();

  constructor(private menu: MenuController,
              private _services: ServicesService,
              private _leaseService: LeaseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.resize();
    this.getServices();
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

  
  getServices() {
    this._services.getServices().subscribe(service=> {
        this.services.paginator = this.paginator;
        this.services.data = service;
    })
  }

  getLeases() {
    this._leaseService.getLeases().subscribe(lease=> {
        this.lease.paginator = this.paginator;
        this.lease.data = lease;
        console.log(lease);
    });
  }

  close() {  
    this.menu.close();
  }

  displayedColumns: string[] = ['usuário','descrição','carro','palca'];
  leaseColumns: string[] = ['imagem','usuario', 'data',  'placa', 'periodo', 'valorTotal'];
}
