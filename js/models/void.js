import { Block, VOID } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Void extends Block
{
    constructor(level, coordinate)
    {
        super(VOID, level, coordinate);
    }

    isDestructible()
    {
        return true;
    }
}