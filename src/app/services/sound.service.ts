import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private ttackSoundsList = ['/sounds/slash-1.wav', '/sounds/slash-2.wav', '/sounds/slash-3.wav', '/sounds/slash-4.wav'];
  private expSoundsList = ['/sounds/level-1.wav', '/sounds/level-2.wav'];
  private leaderDefeatedSoundsList = ['level-3.wav'];
  private clickSound = '/sounds/click.wav';

  constructor() { }

  triggerClickSound() {
    let audio = new Audio();
    audio.src = this.clickSound;
    audio.load();
    audio.play();
  }
}
