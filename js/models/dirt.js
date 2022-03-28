import { Block, DIRT } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Dirt extends Block
{
    constructor(level, coordinate)
    {
        super(DIRT, level, coordinate);
    }

    isDestructible()
    {
        return true;
    }
}