import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private attackSoundsList = ['/sounds/slash-1.wav', '/sounds/slash-2.wav', '/sounds/slash-3.wav', '/sounds/slash-4.wav'];
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

  triggerAttackSound() {
    let audio = new Audio();
    audio.src = this.attackSoundsList[Math.floor(Math.random() * this.attackSoundsList.length)];
    audio.load();
    audio.play();
  }
}

//  private playRandomSoundFromList(list: string[]) {
//     let audio = new Audio();
//     audio.src = list[Math.floor(Math.random() * list.length)];
//     audio.load();
//     audio.play();
//   }

//   private playUltimateAttackSound() {
//     let audio = new Audio();
//     audio.src = '/sounds/gun-reload.wav';
//     audio.load();
//     audio.play();

//     setTimeout(() => {
//       audio.src = '/sounds/gun-shot.wav';
//       audio.load();
//       audio.play();
//     }, 800);
//   }

//   private playLeaderDefeaterSound() {
//     let audio = new Audio();
//     audio.src = '/sounds/level-3.wav';
//     audio.load();
//     audio.play();
//   }