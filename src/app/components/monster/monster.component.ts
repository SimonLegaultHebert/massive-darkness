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

  damageForm!: FormGroup;

  maxLife!: number;
  currentMobNumber!: number;
  currentLife!: number;
  defenseIcons!: string;
  actionDef!: string;
  monsterArray!: number[];

  constructor(private monsterService: MonsterService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.monster);
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
    this.damageDone(this.damageForm.get('damage')?.getRawValue())
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
      console.log(1 * numberOfKill);
      this.currentMobNumber = this.currentMobNumber - numberOfKill;
    }

    if (isMobLeaderDead) {
      console.log(1 * numberOfKill - 1);
      console.log(2);
      this.currentMobNumber = this.currentMobNumber - (numberOfKill - 1);
    }


    this.currentLife = this.currentLife - damage;
    this.damageForm.get('damage')?.setValue(0);
  }

 


  addMonster() {

  }

  deleteMonster() {
    this.monsterService.deleteMonster(this.monster.id);
  }

  private setDefenseIcons() {
    let defenseIcon = '';
    for (let i = 1; i <= this.monster.defense ; i++) {
      defenseIcon = defenseIcon + ' b';
    }
    return defenseIcon;
  }

}
