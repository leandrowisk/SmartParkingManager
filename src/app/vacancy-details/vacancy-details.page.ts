import { Component, 
         OnInit, 
         ViewChild }          from '@angular/core';
import { MatPaginator }       from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute }     from '@angular/router';
import { Lease }              from '../interfaces/Lease';
import { LeaseService }       from '../services/lease.service';
import { ParkingService }     from '../services/parking.service';


@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.page.html',
  styleUrls: ['./vacancy-details.page.scss'],
})
export class VacancyDetailsPage implements OnInit {
  public isMenuOpen = false;
  public menuHistory: boolean = false;
  public leases: MatTableDataSource<Lease> = new MatTableDataSource();
  @ViewChild(MatPaginator,  { static: true }) paginator: MatPaginator;

  public vacancyDetails = {
      "name":"",
      "user":"",
      "plate":"",
      "model":"",
      "brand":"",
      "date":"",
      "value":"",
      "user_image":""
  };

  public vacancyId = 0;

  constructor(private route: ActivatedRoute,
              private _leasesService: LeaseService,
              private parkingService: ParkingService) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.vacancyId = params.idVacancie}
  );

    this.resize();
    this.getLeases();
    this.getVacancieDetail();
  }

  resize() {
    if (this.menuHistory != this.isMenuOpen) {
      if (this.route.snapshot.paramMap.get('isMenuOpen')) {
        this.isMenuOpen = true;
        this.menuHistory = true;
      }
      else {
        this.isMenuOpen = false;
        this.menuHistory = false;
      }
        
    }
  }

  getLeases() {
    this._leasesService.getLeases().subscribe(lease => {
      this.leases.paginator = this.paginator;
      this.leases.data = lease;
      console.log(this.leases.data);
    })
  }

  getVacancieDetail() {
    this.parkingService.getVacancieDetail(this.vacancyId).subscribe(response => {
      this.vacancyDetails = response;
    });
  }

  displayedColumns: string[] = ['usuario', 'data', 'placa', 'periodo', 'valor'];
}
