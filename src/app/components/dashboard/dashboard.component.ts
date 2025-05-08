import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as monstersData from '../../../../public/monsters/monsters.json'
import { Monster } from '../../models/monster';

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
  playersForm!: FormGroup;

  constructor(private monsterService: MonsterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createPlayersForm();
    this.createMonsterForm();

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

  private createNewMonster() {
    let selectedMonsterLevel = this.monstersData.monstersLevel1;

    switch (this.monsterForm.get('level')?.getRawValue()) {
      case '1-2': {
        selectedMonsterLevel = this.monstersData.monstersLevel1;
        break;
      }
      case '3-4': {
        selectedMonsterLevel = this.monstersData.monstersLevel3;
        break;
      }
      case '5': {
        selectedMonsterLevel = this.monstersData.monstersLevel3;
        break;
      }
    }

    let selectedMonster = selectedMonsterLevel.find((element: any) => element.name === this.monsterForm.get('name')?.getRawValue())

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

  submitMonster() {
    if (this.monsterForm.valid && this.playersForm.valid) {
      this.createNewMonster();
    }
  }

}
