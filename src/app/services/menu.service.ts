import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  public isMenuOpen: BehaviorSubject <boolean> = new BehaviorSubject <boolean> (false);

  constructor() { }


  menuOpened() {
      this.isMenuOpen.next(true);
  }

  menuClosed() {
      this.isMenuOpen.next(false);
  }

}