import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private attackSoundsList = ['/sounds/slash-1.wav', '/sounds/slash-2.wav', '/sounds/slash-3.wav', '/sounds/slash-4.wav'];
  private lootSoundsList = ['/sounds/loot-1.wav', '/sounds/loot-2.wav', '/sounds/loot-3.wav', '/sounds/loot-4.wav'];
  private monsterSoundList = ['/sounds/monster-1.wav', '/sounds/monster-2.wav', '/sounds/monster-3.wav', '/sounds/monster-4.wav', '/sounds/monster-5.wav'];
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

  triggerLootSound() {
    let audio = new Audio();
    audio.src = this.lootSoundsList[Math.floor(Math.random() * this.lootSoundsList.length)];
    audio.load();
    audio.play();
  }

  triggerMonsterSound() {
    let audio = new Audio();
    audio.src = this.monsterSoundList[Math.floor(Math.random() * this.monsterSoundList.length)];
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