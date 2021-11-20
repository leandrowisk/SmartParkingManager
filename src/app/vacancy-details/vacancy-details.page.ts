import { Component, 
         OnInit, 
         ViewChild }          from '@angular/core';
import { MatPaginator }       from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute }     from '@angular/router';
import { Lease }              from '../interfaces/Lease';
import { LeaseService }       from '../services/lease.service';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.page.html',
  styleUrls: ['./vacancy-details.page.scss'],
})
export class VacancyDetailsPage implements OnInit {
  public isMenuOpen = false;
  public leases: MatTableDataSource<Lease> = new MatTableDataSource();
  @ViewChild(MatPaginator,  { static: true }) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private _leasesService: LeaseService) { }

  ngOnInit() {
    this.resize();
    this.getLeases();
  }

  resize() {
    if (this.route.snapshot.paramMap.get('isMenuOpen'))
      this.isMenuOpen = true;
    else
      this.isMenuOpen = false;
  }

  getLeases() {
    this._leasesService.getLeases().subscribe(lease =>{7
      console.log('paginator', this.leases.paginator)
      this.leases.paginator = this.paginator;
      this.leases.data = lease;
    })
  }

  displayedColumns: string[] = ['usuário', 'data', 'placa', 'período', 'valor'];
}
