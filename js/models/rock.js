import { Block, ROCK } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Rock extends Block
{
    //If the rock is falling
    #isMoving;

    /**
     * Constructor
     * @param {Level} level : Level in which the block is located
     * @param {Coordinate} coordinate : Block cordinate
     */
    constructor(level, coordinate)
    {
        super(ROCK, level, coordinate);
        this.#isMoving = false;
    }

    get isMoving() { return this.#isMoving; }
    set isMoving(value) { this.#isMoving = value; }

     /**
     * Returns whether the block can be destroyed
     * @returns {boolean} : A boolean where true is destructible
     */
    isDestructible()
    {
        return false;
    }
}