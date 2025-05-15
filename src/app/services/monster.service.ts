import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monster } from '../models/monster';
import { RoamingMonster } from '../models/roaming-monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  $monsterList = new BehaviorSubject<any[]>([]);
  $currentMonster = new BehaviorSubject<any>(null);

  constructor() { }

  deleteMonster(id: string) {
    let monsterList = this.$monsterList.getValue();
    monsterList = this.removeObjectWithId(monsterList, id);
    this.$monsterList.next(monsterList);
  }

  addMonster(monster: Monster|RoamingMonster) {
    const currentList = this.$monsterList.getValue();
    currentList.push(monster);
    this.$monsterList.next(currentList);
  }

  updateMonster(id: string, updatedMonster: Monster|RoamingMonster) {
    let monsterList = this.$monsterList.getValue();
    console.log(monsterList)
    const index = monsterList.findIndex((obj: any) => obj.id === id);
    monsterList[index] = updatedMonster;
    this.$monsterList.next(monsterList);
  }

  private removeObjectWithId(arr: any, id: any) {
    const objWithIdIndex = arr.findIndex((obj: any) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }
}
