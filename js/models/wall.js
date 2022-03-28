import { Block, WALL } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Wall extends Block
{
    constructor(level, coordinate)
    {
        super(WALL, level, coordinate);
    }

    isDestructible()
    {
        return false;
    }
}