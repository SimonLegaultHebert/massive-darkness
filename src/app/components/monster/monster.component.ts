import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models/monster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoundService } from '../../services/sound.service';
import { LifeTabService } from '../../services/life-tab.service';

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
  currentMobNumber!: number;
  currentLife!: number;
  defenseIcons!: string;
  actionDef!: string;
  monsterArray!: number[];

  constructor(
    private monsterService: MonsterService,
    private formBuilder: FormBuilder,
    private soundService: SoundService,
    private lifeTabService: LifeTabService) {
  }

  ngOnInit(): void {
    this.createDamageForm()
    this.defenseIcons = this.setDefenseIcons();
  }

  private createDamageForm() {
    this.damageForm = this.formBuilder.group({
      damage: [0, [Validators.required, Validators.max(12)]],
    })
  }

  dealDamage() {
    this.monsterService.$currentMonster.next(this.monster);
    this.lifeTabService.show();
    this.soundService.triggerAttackSound();
  }

  deleteMonster() {
    this.soundService.triggerClickSound();
    this.monsterService.deleteMonster(this.monster.id);
  }

  private setDefenseIcons() {
    let defenseIcon = '';
    for (let i = 1; i <= this.monster.defense; i++) {
      defenseIcon = defenseIcon + ' b';
    }
    return defenseIcon;
  }

  onDamageChange() {
    this.soundService.triggerClickSound();
  }

}
