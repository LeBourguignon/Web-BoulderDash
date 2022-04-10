import { Coordinate } from "./coordinate.js";
import { Level } from "./level.js";

export const WALL = 'M';
export const DIAMOND = 'D';
export const DIRT = 'T';
export const ROCK = 'R';
export const VOID = 'V';
export const PLAYER = 'P';
export const TOMBSTONE = 'E';

export class Block
{
    //Block type
    #type;

    //Level in which the block is located
    #level;

    //Block cordinate
    #coordinate;

    /**
     * Constructor
     * @param {string} type : Block type (WALL, DIAMOND, DIRT, ROCK, VOID, PLAYER, TOMBSTONE)
     * @param {Level} level : Level in which the block is located
     * @param {Coordinate} coordinate : Block cordinate
     */
    constructor(type, level, coordinate)
    {
        this.#type = type;
        this.#level = level;
        this.#coordinate = coordinate;
    }

    set coordinate(value) { this.#coordinate.x = value.x; this.#coordinate.y = value.y; }
    get coordinate() { return this.#coordinate; }

    get type() { return this.#type; }
    
    get level() { return this.#level; }

    /**
     * /!\ Abstract method - Must be redefined /!\
     * Returns whether the block can be destroyed
     * @returns {boolean} : A boolean where true is destructible
     */
    isDestructible()
    {
        throw "Redefine the isDestructible method!";
    }
}