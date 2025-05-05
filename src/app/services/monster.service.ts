import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monster } from '../models/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  $monsterList = new BehaviorSubject<Monster[]>([]);

  constructor() { }

  deleteMonster(id: string) {
    let monsterList = this.$monsterList.getValue();
    monsterList = this.removeObjectWithId(monsterList, id);
    this.$monsterList.next(monsterList);
  }

  addMonster(monster: Monster) {
    const currentList = this.$monsterList.getValue();
    currentList.push(monster);
    this.$monsterList.next(currentList);
  }

  private removeObjectWithId(arr: any, id: any) {
    const objWithIdIndex = arr.findIndex((obj: any) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }
}
