import { Mob } from "./mob";

export class Monster {
    name!: string;
    img!: string;
    drop!: number;
    health!: number;
    currentHealth!: number;
    defense!: number;
    action!: string;
    id!: string;
    mobsNumber!: number;
    mobs!: Mob[];
    lastMobIndex!: number;

    constructor() {};
}