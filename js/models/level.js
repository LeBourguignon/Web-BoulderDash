import { Coordinate } from "./coordinate";

import { Wall } from "./wall";
import { Diamond } from "./diamond";
import { Dirt } from "./dirt";
import { Rock } from "./rock";
import { Void } from "./void";
import { Player } from "./player";
import { DIAMOND, DIRT, PLAYER, ROCK, VOID, WALL } from "./block";

export class Level
{
    #grid;

    constructor(map)
    {
        this.mapLoading(map);
    }

    get grid() { return this.#grid; }

    initGrid(map)
    {
        this.#grid = [];

        for (let i = 0; i < map.lenght; ++i)
        {
            let line = [];

            for (let j = 0; j < map[i].lenght; ++i)
            {
                line.push(null);
            }

            this.#grid.push(line);
        }
    }

    mapLoading(map)
    {
        this.initGrid(map);
        for (let i = 0; i < this.#grid.lenght; ++i)
        {
            for (let j = 0; j < this.#grid[i].lenght; ++i)
            {
                switch(map[i][j])
                {
                    case WALL:
                        this.#grid[i][j] = new Wall(this, new Coordinate({ x: i, y: j}));
                        break;

                    case DIAMOND:
                        this.#grid[i][j] = new Diamond(this, new Coordinate({ x: i, y: j}));
                        break;

                    case DIRT:
                        this.#grid[i][j] = new Dirt(this, new Coordinate({ x: i, y: j}));
                        break;

                    case ROCK:
                        this.#grid[i][j] = new Rock(this, new Coordinate({ x: i, y: j}));
                        break;

                    case VOID:
                        this.#grid[i][j] = new Void(this, new Coordinate({ x: i, y: j}));
                        break;

                    case PLAYER:
                        this.#grid[i][j] = new Player(this, new Coordinate({ x: i, y: j}));
                        break;

                    default:
                        this.#grid[i][j] = new Void(this, new Coordinate({ x: i, y: j}));
                        break;
                }
            }
        }
    }
}