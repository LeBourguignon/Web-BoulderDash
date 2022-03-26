import { Block, DIAMOND } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

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