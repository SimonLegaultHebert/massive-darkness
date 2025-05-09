import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoundService } from '../../services/sound.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-darkness-counter',
  standalone: false,
  templateUrl: './darkness-counter.component.html',
  styleUrl: './darkness-counter.component.scss'
})
export class DarknessCounterComponent implements OnInit {

  @ViewChild('staticBackdrop') modalRef = {} as ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private soundService: SoundService,
    private modalService: ModalService) {}
 
  firstDarknessForm!: FormGroup;
  secondDarknessForm!: FormGroup;

  ngOnInit(): void {
    this.createfirstDarknessForm();
    this.createSecondDarknessForm();
  }

  private createfirstDarknessForm() {
    this.firstDarknessForm = this.formBuilder.group({
      level: ['', Validators.required],
    })
  }

  private createSecondDarknessForm() {
    this.secondDarknessForm = this.formBuilder.group({
      level: ['', Validators.required],
    })
  }

  radioChangeFirstDarkness() {
    this.soundService.triggerClickSound();
    this.actionOnFirstDarknessLevel();
  }

  private actionOnFirstDarknessLevel() {
    const level = this.firstDarknessForm.get('level')?.getRawValue();

    switch (level) {
      case '3': {
        this.modalService.show();
        break;
      }
      case '4': {
        this.modalService.show();
        break;
      }
      case '5': {
        this.modalService.show();
        break;
      }
      case '6': {
        this.modalService.show();
        break;
      }
      case '7': {
        this.modalService.show();
        break;
      }
      case '8': {
        this.modalService.show();
        break;
      }
      case '9': {
        this.modalService.show();
        break;
      }
    }
  }

  radioChangeSecondDarkness() {
    this.soundService.triggerClickSound();
    this.actionOnSecondDarknessLevel();
  }

  private actionOnSecondDarknessLevel() {
    const level = this.secondDarknessForm.get('level')?.getRawValue();

    switch (level) {
      case '2': {
        this.modalService.show();
        break;
      }
      case '4': {
        this.modalService.show();
        break;
      }
    }
  }

}