import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';

@Component({
  selector: 'app-update-register',
  templateUrl: './update-register.page.html',
  styleUrls: ['./update-register.page.scss'],
})
export class UpdateRegisterPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
