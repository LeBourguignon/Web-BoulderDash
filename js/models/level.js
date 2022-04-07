import { Coordinate } from "./coordinate.js";
import { UP, LEFT, DOWN, RIGHT } from "./direction.js";

import { Wall } from "./wall.js";
import { Diamond } from "./diamond.js";
import { Dirt } from "./dirt.js";
import { Rock } from "./rock.js";
import { Void } from "./void.js";
import { Player } from "./player.js";
import { Tombstone } from "./tombstone.js";
import { DIAMOND, DIRT, PLAYER, ROCK, TOMBSTONE, VOID, WALL } from "./block.js";

export class Level
{
    #grid;
    #player;
    #nbDiamond;
    #collectedDiamond;
    #nbMove;

    #urlsDigAudio;
    #urlsStoneSlideAudio;

    constructor(map)
    {
        this.#nbDiamond = 0;
        this.#collectedDiamond = 0;
        this.#nbMove = 0;
        this.#mapLoading(map);

        this.#urlsDigAudio = [];
        this.#urlsDigAudio.push("/resources/audio/dig1v1.wav");
        this.#urlsDigAudio.push("/resources/audio/dig2v1.wav");

        this.#urlsStoneSlideAudio = [];
        this.#urlsStoneSlideAudio.push("/resources/audio/stoneSlide1v1.wav");
        this.#urlsStoneSlideAudio.push("/resources/audio/stoneSlide1v1.wav");
    }

    get grid() { return this.#grid; }
    get player() { return this.#player; }
    get nbDiamond() { return this.#nbDiamond; }
    get collectedDiamond() { return this.#collectedDiamond; }
    get nbMove() { return this.#nbMove; }

    #initGrid(map)
    {
        this.#grid = [];

        for (let i = 0; i < map.length; ++i)
        {
            let line = [];

            for (let j = 0; j < map[i].length; ++j)
            {
                line.push(null);
            }

            this.#grid.push(line);
        }
    }

    #mapLoading(map)
    {
        this.#initGrid(map);
        for (let i = 0; i < this.#grid.length; ++i)
        {
            for (let j = 0; j < this.#grid[i].length; ++j)
            {
                switch(map[i][j])
                {
                    case WALL:
                        this.#grid[i][j] = new Wall(this, new Coordinate({ x: i, y: j}));
                        break;

                    case DIAMOND:
                        this.#grid[i][j] = new Diamond(this, new Coordinate({ x: i, y: j}));
                        ++this.#nbDiamond;
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
                        this.#player = this.#grid[i][j];
                        break;

                    default:
                        this.#grid[i][j] = new Void(this, new Coordinate({ x: i, y: j}));
                        break;
                }
            }
        }
        this.#updateGravity();
    }

    #isInGrid(coordinate)
    {
        return coordinate.x >= 0 && coordinate.x < this.#grid.length && coordinate.y >= 0 && coordinate.y < this.#grid[coordinate.x].length;
    }

    #movePlayer(coord)
    {
        this.#grid[coord.x][coord.y] = this.#player;
        
        this.#grid[this.#player.coordinate.x][this.#player.coordinate.y] = new Void(this, new Coordinate({ x: this.#player.coordinate.x, y: this.#player.coordinate.y}));
        
        this.#player.coordinate.x = coord.x;
        this.#player.coordinate.y = coord.y;

        ++this.#nbMove;
    }

    #updateGravity()
    {
        for (let i = this.#grid.length - 1; i >= 0 ; --i)
        {
            for (let j = this.#grid[i].length - 1; j >= 0; --j)
            {
                var coord, isMoving;
                coord = new Coordinate({ x: i, y: j});
                isMoving = false;

                while (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === VOID)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.x = coord.x + DOWN.x;
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.y = coord.y + DOWN.y;

                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));

                    coord.x += DOWN.x;
                    coord.y += DOWN.y;
                    isMoving = true;
                }
                
                if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === PLAYER && isMoving)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = new Tombstone(this, new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y}));
                    this.#player = this.#grid[coord.x + DOWN.x][coord.y + DOWN.y];
                    
                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));

                    coord.x += DOWN.x;
                    coord.y += DOWN.y;
                }

                while (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === TOMBSTONE && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === VOID)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.x = coord.x + DOWN.x;
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.y = coord.y + DOWN.y;

                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));

                    coord.x += DOWN.x;
                    coord.y += DOWN.y;
                }
            }
        }
    }

    isWin()
    {
        return this.#nbDiamond === this.#collectedDiamond;
    }

    isLoose()
    {
        return this.#player.type === TOMBSTONE;
    }

    move(direction)
    {
        if ((direction === UP || direction === LEFT  || direction === DOWN  || direction === RIGHT) && !this.isWin() && !this.isLoose())
        {
            const coord = new Coordinate({ x: this.#player.coordinate.x + direction.x, y: this.#player.coordinate.y + direction.y});
            if (this.#isInGrid(coord))
            {
                if (this.#grid[coord.x][coord.y].isDestructible())
                {
                    switch(this.#grid[coord.x][coord.y].type)
                    {
                        case DIRT:
                            const sound = new Audio(this.#urlsDigAudio[Math.floor(Math.random() * this.#urlsDigAudio.length)]);
                            sound.play();
                            break;

                        default:
                            break;
                    }

                    if (this.#grid[coord.x][coord.y].type === DIAMOND)
                        ++this.#collectedDiamond;

                    this.#movePlayer(coord);
                    
                    this.#updateGravity();
                }
                else if (this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + direction.x][coord.y + direction.y].type === VOID && (direction === LEFT || direction === RIGHT))
                {
                    const sound = new Audio(this.#urlsStoneSlideAudio[Math.floor(Math.random() * this.#urlsStoneSlideAudio.length)]);
                    sound.play();

                    this.#grid[coord.x + direction.x][coord.y + direction.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + direction.x][coord.y + direction.y].coordinate.x = coord.x + direction.x;
                    this.#grid[coord.x + direction.x][coord.y + direction.y].coordinate.y = coord.y + direction.y;

                    this.#movePlayer(coord);

                    this.#updateGravity();
                }
            }
        }
    }
}