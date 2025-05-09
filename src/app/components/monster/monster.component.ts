import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models/monster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-monster',
  standalone: false,
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MonsterComponent implements OnInit {


  @Input() monster!: Monster;

  attackSoundsList = ['/sounds/slash-1.wav', '/sounds/slash-2.wav', '/sounds/slash-3.wav', '/sounds/slash-4.wav'];
  expSoundsList = ['/sounds/level-1.wav', '/sounds/level-2.wav'];
  leaderDefeatedSoundsList = ['level-3.wav'];

  damageForm!: FormGroup;
  maxLife!: number;
  currentMobNumber!: number;
  currentLife!: number;
  defenseIcons!: string;
  actionDef!: string;
  monsterArray!: number[];
  showExpModal: boolean = true;

  constructor(private monsterService: MonsterService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createDamageForm();
    this.maxLife = (this.monster.mobs * this.monster.health) + this.monster.health;
    this.currentLife = this.maxLife;
    this.currentMobNumber = this.monster.mobs;

    this.monsterArray = new Array();
    this.monsterArray.push(this.monster.health) // leader
    for (let i = 0; i < this.currentMobNumber; ++i) {
      this.monsterArray.push(this.monster.health);
    }

    this.defenseIcons = this.setDefenseIcons();
  }

  private createDamageForm() {
    this.damageForm = this.formBuilder.group({
      damage: [0, Validators.required],
    })
  }

  dealDamage() {
    const damageDone = this.damageForm.get('damage')?.getRawValue();
    if (damageDone === this.maxLife) {
      this.playUltimateAttackSound();
    } else {
      this.playRandomSoundFromList(this.attackSoundsList);
    }

    this.damageDone(damageDone)
  }

  damageDone(damage: number) {
    let numberOfKill = 0;
    for (let i = 0; i < damage; ++i) {
      this.monsterArray[this.monsterArray.length - 1] = this.monsterArray[this.monsterArray.length - 1] - 1;
      if (this.monsterArray[this.monsterArray.length - 1] === 0) {
        this.monsterArray.pop();
        numberOfKill = numberOfKill + 1;
      }
    }

    let isMobLeaderDead = this.monsterArray.length === 0;

    if (!isMobLeaderDead && numberOfKill > 0) {
      this.showExpModal1();
      this.currentMobNumber = this.currentMobNumber - numberOfKill;
    }

    if (isMobLeaderDead) {
      this.showExpModal2();
      this.currentMobNumber = this.currentMobNumber - (numberOfKill - 1);
    }

    this.currentLife = this.currentLife - damage;
    this.damageForm.get('damage')?.setValue(0);
  }

  private showExpModal1() {
    setTimeout(() => {
      this.playRandomSoundFromList(this.expSoundsList)
      this.showExpModal = true;
    }, 1000);
  }

  private showExpModal2() {
    setTimeout(() => {
      this.playLeaderDefeaterSound()
      this.showExpModal = true;
    }, 1000);
  }

  close() {
    this.showExpModal = false;
  }


  addMonster() {

  }

  deleteMonster() {
    this.monsterService.deleteMonster(this.monster.id);
  }

  private setDefenseIcons() {
    let defenseIcon = '';
    for (let i = 1; i <= this.monster.defense; i++) {
      defenseIcon = defenseIcon + ' b';
    }
    return defenseIcon;
  }

  private playRandomSoundFromList(list: string[]) {
    let audio = new Audio();
    audio.src = list[Math.floor(Math.random() * list.length)];
    audio.load();
    audio.play();
  }

  private playUltimateAttackSound() {
    let audio = new Audio();
    audio.src = '/sounds/gun-reload.wav';
    audio.load();
    audio.play();

    setTimeout(() => {
      audio.src = '/sounds/gun-shot.wav';
      audio.load();
      audio.play();
    }, 800);

    setTimeout(() => {

    }, 800);
  }

  private playLeaderDefeaterSound() {
    let audio = new Audio();
    audio.src = '/sounds/level-3.wav';
    audio.load();
    audio.play();
  }

}
