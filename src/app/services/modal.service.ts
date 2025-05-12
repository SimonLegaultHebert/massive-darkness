import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  $title = new BehaviorSubject<string>('');
  $text = new BehaviorSubject<string>('');

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

  changeTitle(title: string) {
    this.$title.next(title);
  }

  changeText(text: string) {
    this.$text.next(text);
  }
}
