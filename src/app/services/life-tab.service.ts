import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class LifeTabService {

  constructor() { }

  show() {
    const myModalAlternative = new bootstrap.Modal('#lifeTabBackdrop')
    myModalAlternative.show();
  }

  hide() {
    const myModalAlternative = new bootstrap.Modal('#lifeTabBackdrop')
    myModalAlternative.hide();
  }
}
