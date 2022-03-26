import { Block, DIRT } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

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