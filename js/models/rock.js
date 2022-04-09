import { Block, ROCK } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Rock extends Block
{
    #isMoving;

    constructor(level, coordinate)
    {
        super(ROCK, level, coordinate);
        this.#isMoving = false;
    }

    get isMoving() { return this.#isMoving; }
    set isMoving(value) { this.#isMoving = value; }

    isDestructible()
    {
        return false;
    }
}