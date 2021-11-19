import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public isMenuOpen: boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   this.resize();
  }
  
  resize() {
    if (this.route.snapshot.paramMap.get('menuState'))
      this.isMenuOpen = true;
    else 
      this.isMenuOpen = false;
  }

  updateRegister() {
    this.router.navigate(['/update-register', {isMenuOpen: this.isMenuOpen}])
  }
}
