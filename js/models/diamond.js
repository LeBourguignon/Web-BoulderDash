import { Block, DIAMOND } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Diamond extends Block
{
    constructor(level, coordinate)
    {
        super(DIAMOND, level, coordinate);
    }

    isDestructible()
    {
        return true;
    }
}