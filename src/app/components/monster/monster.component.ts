import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models/monster';

@Component({
  selector: 'app-monster',
  standalone: false,
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss'
})
export class MonsterComponent implements OnInit {

  @Input() monster!: Monster;

  maxLife!: number;
  currentMobNumber!: number;
  currentLife!: number;

  constructor(private monsterService: MonsterService) {

  }

  ngOnInit(): void {
    this.maxLife = (this.monster.mobs * this.monster.health) + this.monster.health;
    this.currentLife = this.maxLife;
    this.currentMobNumber = this.monster.mobs;
  }

  damageDone(currentLife: any) {
    if (currentLife % this.monster.health === 0 && currentLife !== 0) {
      window.alert('un mob de tuer + 1 exp');
      this.currentMobNumber = this.currentMobNumber - 1;
    }

    if (currentLife === 0) {
      window.alert('le mob leader est mort + 2exp pour le groupe')
    }
  }


  addMonster() {

  }

  deleteMonster() {
    this.monsterService.deleteMonster(this.monster.id);
  }

}
