import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monster } from '../models/monster';
import { RoamingMonster } from '../models/roaming-monster';
import { Mob } from '../models/mob';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  $monsterList = new BehaviorSubject<any[]>([]);
  $currentMonster = new BehaviorSubject<any>(null);

  constructor(private modalService: ModalService) { }

  deleteMonster(id: string) {
    let monsterList = this.$monsterList.getValue();
    monsterList = this.removeObjectWithId(monsterList, id);
    this.$monsterList.next(monsterList);
  }

  addMonster(monster: Monster | RoamingMonster) {
    const currentList = this.$monsterList.getValue();
    currentList.push(monster);
    this.$monsterList.next(currentList);
  }

  updateMonster(id: string, updatedMonster: Monster | RoamingMonster) {
    let monsterList = this.$monsterList.getValue();
    const index = monsterList.findIndex((obj: any) => obj.id === id);
    monsterList[index] = updatedMonster;
    this.$monsterList.next(monsterList);
  }

  addOneMobToEachPack() {
    let monsterList = this.$monsterList.getValue();
    let updatedList = [];
   
    for (let monster of monsterList) {
      if (monster instanceof Monster) {   
        monster.mobs.splice(1, 0, this.createMobFromSelectedMonster(monster));
        monster.mobsNumber = monster.mobsNumber + 1;
        monster.lastMobIndex = monster.lastMobIndex + 1;
        monster.currentHealth = monster.currentHealth + monster.health
        updatedList.push(monster);
      }
    }

    if(updatedList.length > 0) {
      this.modalService.changeTitle('Les renforts arrivent!')
      let text = '';
      for (let monster of updatedList){
        text = text + `<p>Le groupe ${monster.name} passe à ${monster.mobsNumber} monstres.</p>`;
      }
      this.modalService.changeText(text);
      this.modalService.show();
    }
    this.$monsterList.next(monsterList);
  }

  private createMobFromSelectedMonster(selectedMonster: any) {
    let mob = new Mob();
    mob.currentLife = selectedMonster.health;
    mob.maxLife = selectedMonster.health;
    return mob;
  }

  private removeObjectWithId(arr: any, id: any) {
    const objWithIdIndex = arr.findIndex((obj: any) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }
}
