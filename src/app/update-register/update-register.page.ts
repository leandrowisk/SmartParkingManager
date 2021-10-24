import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-register',
  templateUrl: './update-register.page.html',
  styleUrls: ['./update-register.page.scss'],
})
export class UpdateRegisterPage implements OnInit {
  public isMenuOpen: boolean = false;
  constructor(private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('isMenuOpen'))
      this.isMenuOpen = true;
    else
      this.isMenuOpen = false;
  }

  goBack() {
    this.location.back();
  }
}
