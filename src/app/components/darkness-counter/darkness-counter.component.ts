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
      level: ['1', Validators.required],
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
    let text = '';

    switch (level) {
      case '3': {
        this.modalService.changeTitle('Oh-Oh, Spaghetti-O\'s!')
        text = `<p>Ajoutez un monstre errant dans l'aventure.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerMonsterSound();
        break;
      }
      case '4': {
        this.modalService.changeTitle('Par ici la monnaie!')
        text = `<p>Ajoutez un trésor rare dans la pochette à butin.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerLootSound();
        break;
      }
      case '5': {
        this.modalService.changeTitle('Oh-Oh, Spaghetti-O\'s!')
        text = `<p>Ajoutez un groupe de monstres dans l'aventure.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerMonsterSound();
        break;
      }
      case '6': {
        this.modalService.changeTitle('Par ici la monnaie!')
        text = `<p>Ajoutez un trésor épique dans la pochette à butins.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerLootSound();
        break;
      }
      case '7': {
        this.modalService.changeTitle('Oh-Oh, Spaghetti-O\'s!')
        text = `<p>Ajoutez un groupe de monstres dans l'aventure.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerMonsterSound();
        break;
      }
      case '8': {
        this.modalService.changeTitle('Par ici la monnaie!')
        text = `<p>Ajoutez un trésor épique dans la pochette à butins.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerLootSound();
        break;
      }
      case '9': {
        this.modalService.changeTitle('Oh-Oh, Spaghetti-O\'s!')
        text = `<p>Ajoutez un monstre errant dans l'aventure.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerMonsterSound();
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
    let text = '';

    switch (level) {
      case '2': {
        this.modalService.changeTitle('Oh-Oh, Spaghetti-O\'s!')
        text = `<p>Ajoutez un groupe de monstres dans l'aventure.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerMonsterSound();
        break;
      }
      case '4': {
        this.modalService.changeTitle('Oh-Oh, Spaghetti-O\'s!')
        text = `<p>Ajoutez un monstre errant dans l'aventure.</p>`;
        this.modalService.changeText(text);
        this.modalService.show();
        this.soundService.triggerMonsterSound();
        break;
      }
    }
  }

}