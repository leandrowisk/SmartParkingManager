import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-register',
  templateUrl: './update-register.page.html',
  styleUrls: ['./update-register.page.scss'],
})
export class UpdateRegisterPage implements OnInit {
  public isMenuOpen: boolean = false;
  public imageUrl: string ;
  public fantasyName: string = 'ParkingSolutions';
  public vacanciesNumber: number = 4;
  public email: string = "parkin_solutions@gmail.com";
  public cnpj: string = '07.527.986/0045-24';
  public address: string = 'Rua das Árvores';
  public dailyValue: number = 80;
  public hourValue: number = 35;
  public monthlyVacanciesNumber: number = 2;
  public socialReason: string = 'ParkingSolutions';
  public monthlyValue: number = 120;

  constructor(private location: Location,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.resize();
  }

  removePhoto() {
    this.imageUrl = '';
  }

  getParking() {
    //  this.fantasyName = '';
    //  this.vacanciesNumber =,
    //  this.email = '';
    //  this.hourValue = '';
    //  this.address = '';
    //  this.dailyValue = '';
    //  this.cnpj = '';
    //  this.dailyValue = '';
    //  this.monthlyVacanciesNumber;
    //  this.socialReason;
    //  this.monthlyValue

  }

  resize() {
    if (this.route.snapshot.paramMap.get('isMenuOpen'))
      this.isMenuOpen = true;
    else
      this.isMenuOpen = false;
  }

  imageSelected(event) {
    // this.imageUrl = image.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}


  goBack() {
    this.location.back();
  }
}
