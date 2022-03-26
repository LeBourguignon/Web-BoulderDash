import { Block, WALL } from "./block";
import { Coordinate } from "./coordinate";
import { Level } from "./level";

export class Wall extends Block
{
    constructor(level, coordinate)
    {
        super(WALL, level, coordinate);
    }
}