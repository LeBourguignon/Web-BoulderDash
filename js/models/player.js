import { Block, PLAYER } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Player extends Block
{
    constructor(level, coordinate)
    {
        super(PLAYER, level, coordinate);
    }

    isDestructible()
    {
        return false;
    }
}