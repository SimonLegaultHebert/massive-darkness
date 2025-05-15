import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as monstersData from '../../../../public/monsters/monsters.json'
import { Monster } from '../../models/monster';
import { SoundService } from '../../services/sound.service';
import { LifeTabService } from '../../services/life-tab.service';
import { Mob } from '../../models/mob';
import { RoamingMonster } from '../../models/roaming-monster';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  monstersData: any = monstersData;
  monsterList!: any[];
  monsterForm!: FormGroup;
  roamingMonsterForm!: FormGroup;
  playersForm!: FormGroup;

  selectedMonsterList = this.monstersData.monstersLevel1;
  selectedRoamingMonsterList = this.monstersData.roamingMonsterLevel1;

  constructor(
    private monsterService: MonsterService,
    private formBuilder: FormBuilder,
    private soundService: SoundService) { }

  ngOnInit(): void {
    this.createPlayersForm();
    this.createMonsterForm();
    this.createRoamingMonsterForm();

    this.monsterService.$monsterList.subscribe((res: any) => {
      this.monsterList = res;
    });
  }

  private createPlayersForm() {
    this.playersForm = this.formBuilder.group({
      players: ['5', Validators.required],
    })
  }

  private createMonsterForm() {
    this.monsterForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['1-2', Validators.required]
    })
  }

  private createRoamingMonsterForm() {
    this.roamingMonsterForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['1-2', Validators.required]
    })
  }

  onMonsterLevelChange() {
    switch (this.monsterForm.get('level')?.getRawValue()) {
      case '1-2': {
        this.selectedMonsterList = this.monstersData.monstersLevel1;
        break;
      }
      case '3-4': {
        this.selectedMonsterList = this.monstersData.monstersLevel3;
        break;
      }
      case '5': {
        this.selectedMonsterList = this.monstersData.monstersLevel5;
        break;
      }
    }
  }

  onRoamingMonsterLevelChange() {
    switch (this.roamingMonsterForm.get('level')?.getRawValue()) {
      case '1-2': {
        this.selectedRoamingMonsterList = this.monstersData.roamingMonsterLevel1;
        break;
      }
      case '3-4': {
        this.selectedRoamingMonsterList = this.monstersData.roamingMonsterLevel2;
        break;
      }
      case '5': {
        this.selectedRoamingMonsterList = this.monstersData.roamingMonsterLevel3;
        break;
      }
    }

  }

  private createNewMonster() {
    const selectedMonster = this.selectedMonsterList.find((element: any) => element.name === this.monsterForm.get('name')?.getRawValue())
    this.createMonsterFromData(selectedMonster);
  }

  private createMonsterFromData(selectedMonster: Monster) {
    const monster = new Monster();
    monster.name = selectedMonster.name;
    monster.img = selectedMonster.img;
    monster.defense = selectedMonster.defense;
    monster.drop = selectedMonster.drop;
    monster.health = selectedMonster.health;
    monster.action = selectedMonster.action;
    monster.id = crypto.randomUUID()
    monster.mobs = this.createMobsArray(selectedMonster);
    monster.mobsNumber = monster.mobs.length - 1;
    monster.lastMobIndex = monster.mobs.length - 1;
    monster.currentHealth = monster.mobs.length * monster.health;

    this.monsterService.addMonster(monster);
  }

  private createMobsArray(selectedMonster: Monster): Mob[] {
    let mobs = new Array();
    for (var i = 0; i < this.playersForm.get('players')?.getRawValue(); ++i) {
      mobs.push(this.createMobFromSelectedMonster(selectedMonster));
    }
    mobs.push(this.createMobFromSelectedMonster(selectedMonster));
    return mobs;
  }

  private createMobFromSelectedMonster(selectedMonster: Monster) {
    let mob = new Mob();
    mob.currentLife = selectedMonster.health;
    mob.maxLife = selectedMonster.health;
    return mob;
  }

  private createRoamingMonster() {
    const selectedRoamingMonster = this.selectedRoamingMonsterList.find((element: any) => element.name === this.roamingMonsterForm.get('name')?.getRawValue())
    this.createRoamingMonsterFromData(selectedRoamingMonster);
  }

  private createRoamingMonsterFromData(selectedRoamingMonster: any) {
    const roamingMonster = new RoamingMonster();
    roamingMonster.name = selectedRoamingMonster.name;
    roamingMonster.img = selectedRoamingMonster.img;
    roamingMonster.defense = selectedRoamingMonster.defense;
    roamingMonster.currentHealth = selectedRoamingMonster.health;
    roamingMonster.health = selectedRoamingMonster.health;
    roamingMonster.drop = selectedRoamingMonster.drop;
    roamingMonster.rareDrop = selectedRoamingMonster.rareDrop;
    roamingMonster.epicDrop = selectedRoamingMonster.epicDrop;
    roamingMonster.closeAttack = selectedRoamingMonster.closeAttack;
    roamingMonster.rangeAttack = selectedRoamingMonster.rangeAttack;
    roamingMonster.action = selectedRoamingMonster.action;
    roamingMonster.action2 = selectedRoamingMonster.action2;
    roamingMonster.mobs = [this.createMobFromSelectedMonster(selectedRoamingMonster)];
    roamingMonster.mobsNumber = 0;

    this.monsterService.addMonster(roamingMonster);
  }

  submitMonster() {
    this.soundService.triggerClickSound();
    if (this.monsterForm.valid && this.playersForm.valid) {
      this.createNewMonster();
    }
  }

  submitRoamingMonster() {
    this.soundService.triggerClickSound();
    if (this.roamingMonsterForm.valid && this.playersForm.valid) {
      this.createRoamingMonster();
    }
  }

}
