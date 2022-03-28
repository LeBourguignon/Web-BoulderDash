import { Block, TOMBSTONE } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Tombstone extends Block
{
    constructor(level, coordinate)
    {
        super(TOMBSTONE, level, coordinate);
    }

    isDestructible()
    {
        return false;
    }
}