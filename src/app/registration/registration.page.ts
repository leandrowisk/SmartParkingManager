import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public isMenuOpen: boolean = false;
  public menuHistory: boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   this.resize();
  }
  
  resize() {
    if (this.menuHistory != this.isMenuOpen) {
      if (this.route.snapshot.paramMap.get('menuState')){
        this.isMenuOpen = true;
        this.menuHistory = true;
      } 
      else {
        this.isMenuOpen = false;
        this.menuHistory = false;
      }
    }
  }

  updateRegister() {
    this.router.navigate(['/update-register', {isMenuOpen: this.isMenuOpen}])
  }
}
