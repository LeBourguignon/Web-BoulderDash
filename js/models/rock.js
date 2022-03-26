import { Block, ROCK } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

export class Rock extends Block
{
    constructor(level, coordinate)
    {
        super(ROCK, level, coordinate);
    }
}