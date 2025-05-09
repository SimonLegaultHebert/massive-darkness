import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ModalService {



  constructor() { 
   
  }

  show() {
    const myModalAlternative = new bootstrap.Modal('#staticBackdrop')
    myModalAlternative.show();
  }

  hide() {
    const myModalAlternative = new bootstrap.Modal('#staticBackdrop')
    myModalAlternative.hide();
  }
}
