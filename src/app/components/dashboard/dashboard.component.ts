import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as monstersData from '../../../../public/monsters/monsters.json'
import { Monster } from '../../models/monster';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  monstersData: any = monstersData;
  monsterList!: Monster[];
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
      players: ['', Validators.required],
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
    monster.mobs = this.playersForm.get('players')?.getRawValue();

    this.monsterService.addMonster(monster);
  }

  private createRoamingMonster() {
    const selectedRoamingMonster = this.selectedRoamingMonsterList.find((element: any) => element.name === this.roamingMonsterForm.get('name')?.getRawValue())
    this.createRoamingMonsterFromData(selectedRoamingMonster);
  }

  private createRoamingMonsterFromData(selectedRoamingMonster: any) {

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
