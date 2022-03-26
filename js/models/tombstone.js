import { Block, TOMBSTONE } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

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