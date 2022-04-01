import { Subject } from "../patterns/subject.js";
import { NONE, MAINMENU, GAME, LEVELSMANAGEMENTMENU } from "../views/viewType.js";
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
        this.addMap("/maps/test.txt");
        this.#mapNumber = 0;
    }

    set currentScreen(value) { this.#currentScreen = value; this.notify(); }
    get currentScreen() { return this.#currentScreen; }

    get level() { return this.#level; }

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
                console.log("Its win!");
                //win screen (next level or return menu)
            }
            else if (this.#level.isLoose())
            {
                console.log("Its loose!");
                //loose screen (retry level or return menu)
            }
        }
    }
}