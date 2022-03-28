import { Block, ROCK } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Rock extends Block
{
    constructor(level, coordinate)
    {
        super(ROCK, level, coordinate);
    }

    isDestructible()
    {
        return false;
    }
}