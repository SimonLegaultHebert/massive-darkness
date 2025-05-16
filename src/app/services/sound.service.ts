import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private attackSoundsList = ['/sounds/slash-1.wav', '/sounds/slash-2.wav', '/sounds/slash-3.wav', '/sounds/slash-4.wav'];
  private lootSoundsList = ['/sounds/loot-1.wav', '/sounds/loot-2.wav', '/sounds/loot-3.wav', '/sounds/loot-4.wav'];
  private monsterSoundList = ['/sounds/monster-1.wav', '/sounds/monster-2.wav', '/sounds/monster-3.wav', '/sounds/monster-4.wav', '/sounds/monster-5.wav'];
  private expSoundsList = ['/sounds/level-1.wav', '/sounds/level-2.wav'];
  private leaderDefeatedSoundsList = ['/sounds/level-3.wav'];
  private clickSound = '/sounds/click.wav';
  private summonSound = '/sounds/summon.wav';
  private monsterEatingSoundsList = ['/sounds/monster-eating-1.wav', '/sounds/monster-eating-2.wav', '/sounds/monster-eating-3.wav'];

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

  triggerMobKillSound() {
    let audio = new Audio();
    audio.src = this.expSoundsList[Math.floor(Math.random() * this.expSoundsList.length)];
    audio.load();
    audio.play();
  }

  triggerMonsterEatingSound() {
    let audio = new Audio();
    audio.src = this.monsterEatingSoundsList[Math.floor(Math.random() * this.monsterEatingSoundsList.length)];
    audio.load();
    audio.play();
  }

  triggerLeaderKillSound() {
    let audio = new Audio();
    audio.src = this.leaderDefeatedSoundsList[0];
    audio.load();
    audio.play();
  }

  triggerSummonSound() {
    let audio = new Audio();
    audio.src = this.summonSound;
    audio.load();
    audio.play();
  }

  triggerUltimateAttackSound() {
    let audio = new Audio();
    audio.src = '/sounds/gun-reload.wav';
    audio.load();
    audio.play();

    setTimeout(() => {
      audio.src = '/sounds/gun-shot.wav';
      audio.load();
      audio.play();
    }, 800);
  }
}

