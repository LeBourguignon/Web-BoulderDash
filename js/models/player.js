import { Block, PLAYER } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

export class Player extends Block
{
    constructor(level, coordinate)
    {
        super(PLAYER, level, coordinate);
    }
}