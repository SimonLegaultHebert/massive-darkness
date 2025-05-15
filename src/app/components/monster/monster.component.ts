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
  defenseIcons!: string;

  constructor(
    private monsterService: MonsterService,
    private soundService: SoundService,
    private lifeTabService: LifeTabService) {
  }

  ngOnInit(): void {
    this.defenseIcons = this.setDefenseIcons();
  }

  dealDamage() {
    this.soundService.triggerClickSound();
    this.monsterService.$currentMonster.next(this.monster);
    this.lifeTabService.show();
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
