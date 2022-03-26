import { Block, VOID } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

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