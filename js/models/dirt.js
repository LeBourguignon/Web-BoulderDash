import { Block, DIRT } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Dirt extends Block
{
    /**
     * Constructor
     * @param {Level} level : Level in which the block is located
     * @param {Coordinate} coordinate : Block cordinate
     */
    constructor(level, coordinate)
    {
        super(DIRT, level, coordinate);
    }

    /**
     * Returns whether the block can be destroyed
     * @returns {boolean} : A boolean where true is destructible
     */
    isDestructible()
    {
        return true;
    }
}