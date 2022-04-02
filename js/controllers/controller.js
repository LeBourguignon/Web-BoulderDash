import { Subject } from "../patterns/subject.js";
import { NONE, MAINMENU, GAME, LEVELSMANAGEMENTMENU, LEVELWIN, LEVELLOOSE, GAMEWIN } from "../views/viewType.js";
import { Level } from "../models/level.js";
import { UP, LEFT, DOWN, RIGHT } from "../models/direction.js"

export class Controller extends Subject
{
    #currentScreen;
    #level;
    #maps;
    #mapNumber;

    constructor()
    {
        super();
        this.#currentScreen = MAINMENU;
        this.#maps = [];
        this.addMap("/maps/campaign-1.txt");
        this.addMap("/maps/campaign-2.txt");
        this.addMap("/maps/campaign-3.txt");
        this.#mapNumber = 0;
        this.#level = null;
    }

    set currentScreen(value) { this.#currentScreen = value; this.notify(); }
    get currentScreen() { return this.#currentScreen; }

    get level() { return this.#level; }

    get mapNumber() { return this.#mapNumber+1; }

    addMap(address)
    {
        fetch(address).then((res) => res.text()).then((text) => {
            const tab = text.split(/\r\n/m);
            const map = [];
            tab.forEach((line, i) => {
                map.push(line.split(""));
            });
            this.#maps.push(map);
        });
    }

    newGame()
    {
        this.#mapNumber = 0;
        this.#level = new Level(this.#maps[this.#mapNumber]);
        this.currentScreen = GAME;
    }

    resumeGame()
    {
        if (this.#level === null)
            this.newGame();
        else
            this.currentScreen = GAME;
    }

    returnMainMenu()
    {
        if (this.#level.isWin())
        {
            if (this.#mapNumber + 1 === this.#maps.length)
            {
                this.#level = null;
            }
            else
            {
                ++this.#mapNumber;
                this.#level = new Level(this.#maps[this.#mapNumber]);
            }
            
        }
        else if (this.#level.isLoose())
        {
            this.#level = new Level(this.#maps[this.#mapNumber]);
        }

        this.currentScreen = MAINMENU;
    }

    restartLevel()
    {
        this.#level = new Level(this.#maps[this.#mapNumber]);
        this.currentScreen = GAME;
    }

    nextLevel()
    {
        ++this.#mapNumber;
        this.#level = new Level(this.#maps[this.#mapNumber]);
        this.currentScreen = GAME;
    }

    keyDown(event)
    {
        if (this.currentScreen === GAME)
        {
            switch (event.key)
            {
                case 'z':
                    this.#level.move(UP);
                    this.notify();
                    break;
                
                case 'q':
                    this.#level.move(LEFT);
                    this.notify();
                    break;
                    
                case 's':
                    this.#level.move(DOWN);
                    this.notify();
                    break;
                        
                case 'd':
                    this.#level.move(RIGHT);
                    this.notify();
                    break;

                default:
                    break;                      
            }

            if (this.#level.isWin())
            {
                if (this.#mapNumber + 1 === this.#maps.length)
                    this.currentScreen = GAMEWIN;
                else
                    this.currentScreen = LEVELWIN;
            }
            else if (this.#level.isLoose())
            {
                this.currentScreen = LEVELLOOSE;
            }
        }
    }
}