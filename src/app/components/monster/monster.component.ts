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

  constructor(private monsterService: MonsterService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createDamageForm();
    this.maxLife = (this.monster.mobs * this.monster.health) + this.monster.health;
    this.currentLife = this.maxLife;
    this.currentMobNumber = this.monster.mobs;
    this.defenseIcons = this.setDefenseIcons();
  }

  private createDamageForm() {
    this.damageForm = this.formBuilder.group({
      damage: [0, Validators.required],
    })
  }

  dealDamage() {
    console.log(this.damageForm.get('damage')?.getRawValue())
    this.damageForm.get('damage')?.setValue(0);
  }

  // damageDone(currentLife: any) {
  //   if (currentLife % this.monster.health === 0 && currentLife !== 0) {
  //     window.alert('un mob de tuer + 1 exp');
  //     this.currentMobNumber = this.currentMobNumber - 1;
  //   }

  //   if (currentLife === 0) {
  //     window.alert('le mob leader est mort + 2exp pour le groupe')
  //   }
  // }


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
