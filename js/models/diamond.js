import { Block, DIAMOND } from "./block.js";
import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export class Diamond extends Block
{
    /**
     * Constructor
     * @param {Level} level : Level in which the block is located
     * @param {Coordinate} coordinate : Block cordinate
     */
    constructor(level, coordinate)
    {
        super(DIAMOND, level, coordinate);
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