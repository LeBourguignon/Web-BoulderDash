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
    //Level grid
    #grid;

    //Pointing to the block player
    #player;

    //Number of diamonds at level initialization
    #nbDiamond;

    //Number of diamonds recovered
    #collectedDiamond;

    //Number of player's moves
    #nbMove;


    //Table of sound urls for digging
    #urlsDigAudio;

    //Table of sound urls for stone slides
    #urlsStoneSlideAudio;

    /**
     * Constructor
     * @param {string[][]} map : Characters table symbolizing the map
     */
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

    /**
     * Initializes the grid to the size of its map
     * @param {string[][]} map 
     */
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

    /**
     * Loads the grid according to a map
     * @param {string[][]} map 
     */
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
        this.#updateGravityAll();
    }

    /**
     * Checks if the coordinates are in the grid
     * @param {Coordinate} coordinate : Coordinate to check
     * @returns {boolean} : A boolean where true is that the coordinate belongs to the grid
     */
    #isInGrid(coordinate)
    {
        return coordinate.x >= 0 && coordinate.x < this.#grid.length && coordinate.y >= 0 && coordinate.y < this.#grid[coordinate.x].length;
    }

    /**
     * Moves the player to the coordinate
     * @param {Coordinate} coord : Coordinate where the player is moved
     */
    #movePlayer(coord)
    {
        this.#grid[coord.x][coord.y] = this.#player;
        
        this.#grid[this.#player.coordinate.x][this.#player.coordinate.y] = new Void(this, new Coordinate({ x: this.#player.coordinate.x, y: this.#player.coordinate.y}));
        
        this.#player.coordinate.x = coord.x;
        this.#player.coordinate.y = coord.y;

        ++this.#nbMove;
    }

    /**
     * Updates all the gravity
     */
    #updateGravityAll()
    {
        for (let i = this.#grid.length - 1; i >= 0 ; --i)
        {
            for (let j = this.#grid[i].length - 1; j >= 0; --j)
            {
                var coord;
                coord = new Coordinate({ x: i, y: j});

                //Rock that falls into the void
                while (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === VOID)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.x = coord.x + DOWN.x;
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.y = coord.y + DOWN.y;

                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));

                    coord.x += DOWN.x;
                    coord.y += DOWN.y;
                    this.#grid[coord.x][coord.y].isMoving = true;
                }
                
                //Rock that crushes the player
                if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === PLAYER && this.#grid[coord.x][coord.y].isMoving)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = new Tombstone(this, new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y}));
                    this.#player = this.#grid[coord.x + DOWN.x][coord.y + DOWN.y];
                    
                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));

                    coord.x += DOWN.x;
                    coord.y += DOWN.y;
                }

                //Rock that stops falling
                if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x][coord.y].isMoving)
                {
                    this.#grid[coord.x][coord.y].isMoving = false;
                }

                //Tombstone that falls into the void
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

    /**
     * Updates of a gravity step
     * @returns {boolean} : A boolean where true is moved
     */
    updateGravityStepByStep()
    {
        let isMoving = false;
        for (let i = this.#grid.length - 1; i >= 0 ; --i)
        {
            for (let j = this.#grid[i].length - 1; j >= 0; --j)
            {
                var coord;
                coord = new Coordinate({ x: i, y: j});

                //Rock that falls into the void
                if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === VOID)
                {
                    this.#grid[coord.x][coord.y].isMoving = true;

                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.x = coord.x + DOWN.x;
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.y = coord.y + DOWN.y;

                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));

                    isMoving = true;
                }
                //Rock that crushes the player
                else if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === PLAYER && this.#grid[coord.x][coord.y].isMoving)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = new Tombstone(this, new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y}));
                    this.#player = this.#grid[coord.x + DOWN.x][coord.y + DOWN.y];
                    
                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));
                    isMoving = true;
                }
                //Rock that stops falling
                else if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x][coord.y].isMoving)
                {
                    this.#grid[coord.x][coord.y].isMoving = false;
                }
                //Tombstone that falls into the void
                else if (this.#isInGrid(new Coordinate({ x: coord.x + DOWN.x, y: coord.y + DOWN.y})) && this.#grid[coord.x][coord.y].type === TOMBSTONE && this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].type === VOID)
                {
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.x = coord.x + DOWN.x;
                    this.#grid[coord.x + DOWN.x][coord.y + DOWN.y].coordinate.y = coord.y + DOWN.y;

                    this.#grid[coord.x][coord.y] = new Void(this, new Coordinate({ x: coord.x, y: coord.y}));
                    isMoving = true;
                }
            }
        }
        return isMoving;
    }

    /**
     * Check if it is won
     * @returns {boolean} : A boolean where true is won
     */
    isWin()
    {
        return this.#nbDiamond === this.#collectedDiamond;
    }

    /**
     * check if it is lost
     * @returns {boolean} : A boolean where true is lost
     */
    isLoose()
    {
        return this.#player.type === TOMBSTONE;
    }

    /**
     * Movement in one direction
     * @param {Coordinate} direction : Direction (UP, LEFT, DOWN, RIGHT)
     */
    move(direction)
    {
        if ((direction === UP || direction === LEFT  || direction === DOWN  || direction === RIGHT) && !this.isWin() && !this.isLoose())
        {
            const coord = new Coordinate({ x: this.#player.coordinate.x + direction.x, y: this.#player.coordinate.y + direction.y});
            if (this.#isInGrid(coord))
            {
                //Move on a destructible block
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
                }
                //Moving a rock
                else if (this.#grid[coord.x][coord.y].type === ROCK && this.#grid[coord.x + direction.x][coord.y + direction.y].type === VOID && (direction === LEFT || direction === RIGHT))
                {
                    const sound = new Audio(this.#urlsStoneSlideAudio[Math.floor(Math.random() * this.#urlsStoneSlideAudio.length)]);
                    sound.play();

                    this.#grid[coord.x + direction.x][coord.y + direction.y] = this.#grid[coord.x][coord.y];
                    this.#grid[coord.x + direction.x][coord.y + direction.y].coordinate.x = coord.x + direction.x;
                    this.#grid[coord.x + direction.x][coord.y + direction.y].coordinate.y = coord.y + direction.y;

                    this.#movePlayer(coord);
                }
            }
        }
    }
}