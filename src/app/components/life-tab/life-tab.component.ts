import { Component, OnChanges, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models/monster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-life-tab',
  standalone: false,
  templateUrl: './life-tab.component.html',
  styleUrl: './life-tab.component.scss'
})
export class LifeTabComponent implements OnInit {

  currentMonster!: Monster;
  damageForm!: FormGroup;
  maxLife!: number;
  lastMobIndex!: number;
  killLog!: string;
  isUltimateAttack: boolean = false;

  constructor(
    private monsterService: MonsterService,
    private formBuilder: FormBuilder,
    private soundService: SoundService) {

  }

  ngOnInit(): void {
    this.monsterService.$currentMonster.subscribe((res) => {
      this.currentMonster = res
      this.maxLife = (this.currentMonster.mobs.length * this.currentMonster.health);
      this.createDamageForm();
      this.lastMobIndex = this.currentMonster.lastMobIndex;
      this.killLog = '';
    });
  }

  private createDamageForm() {
    this.damageForm = this.formBuilder.group({
      damage: [0, [Validators.required, Validators.max(this.currentMonster.currentHealth)]],
    })
  }

  dealDamage() {
    if (this.damageForm.valid) {
      const damageDone = this.damageForm.get('damage')?.getRawValue();
      if (damageDone === this.maxLife) {
        this.soundService.triggerUltimateAttackSound();
        this.isUltimateAttack = true;
      } else {
        this.soundService.triggerAttackSound();
      }
      this.damageDone(damageDone)
    }
  }

  damageDone(damage: number) {
    let numberOfKill = 0;
    let isLeaderDead = false;

    for (let i = 0; i < damage; ++i) {
      let mob = this.currentMonster.mobs[this.lastMobIndex];
      mob.currentLife = mob.currentLife - 1;
      this.currentMonster.mobs[this.lastMobIndex] = mob;

      if (mob.currentLife === 0) {
        if (this.lastMobIndex !== 0) {
          numberOfKill = numberOfKill + 1;
        } else {
          isLeaderDead = true;
        }
        this.lastMobIndex = this.lastMobIndex - 1;
      }
    }

    this.killLog = this.generateKillLog(numberOfKill, isLeaderDead)
    this.isUltimateAttack = false;
    this.saveMonsterChanges();
    this.damageForm.get('damage')?.setValue(0);
  }

  private generateKillLog(numberOfKill: number, isLeaderDead: boolean) {
    if (numberOfKill > 0 || isLeaderDead) {
      let exp = numberOfKill * 1
      if (isLeaderDead) {
        exp = exp + 2;
      }

      if (isLeaderDead) {
        let timeout = 300;
        if (this.isUltimateAttack) {
          timeout = 1000;
        }
        setTimeout(() => {
           this.soundService.triggerLeaderKillSound();
        }, timeout)
        return `<p>Le héro gagne ${exp} d'expérience et le reste des boulets reçoit 2 d'expérience!</p><p>Empochez cette cagnote!</p>`;
      } else {
        setTimeout(() => {
          this.soundService.triggerMobKillSound();
        }, 300)
        return `<p>Le héro gagne ${exp} d'expérience.</p>`;
      }
    }
    return ''
  }

  private saveMonsterChanges() {
    this.currentMonster.lastMobIndex = this.lastMobIndex;
    this.currentMonster.currentHealth = this.calculateCurrentHealth();
    this.currentMonster.mobsNumber = this.calculateMobNumber();
    this.monsterService.updateMonster(this.currentMonster.id, this.currentMonster);
  }

  private calculateMobNumber() {
    let number = 0;
    for (let i = 1; i < this.currentMonster.mobs.length; ++i) {
      if (this.currentMonster.mobs[i].currentLife > 0) {
        number = number + 1;
      }
    }
    return number;
  }

  private calculateCurrentHealth() {
    let number = 0;
    for (let i = 0; i < this.currentMonster.mobs.length; ++i) {
      number = number + this.currentMonster.mobs[i].currentLife;
    }
    return number;
  }

  onDamageChange() {
    this.killLog = '';
    this.soundService.triggerClickSound();
  }

}
