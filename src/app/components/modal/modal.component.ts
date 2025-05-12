import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  title!: string;
  text!: string;

  constructor(private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.modalService.$title.subscribe((res : string) => {
      this.title = res;
    })

    this.modalService.$text.subscribe((res : string) => {
      this.text = res;
    })
  }
}
