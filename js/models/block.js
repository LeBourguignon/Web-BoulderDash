import { Coordinate } from "./coordinate.js";

export const WALL = 'M';
export const DIAMOND = 'D';
export const DIRT = 'T';
export const ROCK = 'R';
export const VOID = 'V';
export const PLAYER = 'P';
export const TOMBSTONE = 'E';

export class Block
{
    #type;
    #level;
    #coordinate;

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

    isDestructible()
    {
        throw "Redefine the isDestructible method!";
    }
}