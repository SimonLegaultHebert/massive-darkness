import { Mob } from "./mob";
import { RoamingMonsterAttack } from "./roaming-monster-attack";
import { RoamingMonsterDefense } from "./roaming-monster-defense";

export class RoamingMonster {
    name!: string;
    img!: string;
    drop!: number;
    rareDrop!: number;
    epicDrop!: number;
    health!: number;
    currentHealth!: number;
    defense!: RoamingMonsterDefense;
    closeAttack!: RoamingMonsterAttack;
    rangeAttack!: RoamingMonsterAttack;
    action!: string;
    action2!: string;
    action3!: string;
    id!: string;
    mobs!: Mob[];
    mobsNumber!: number;
    lastMobIndex!: number;

    constructor() {};
}