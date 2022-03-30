import { Subject } from "../patterns/subject.js";
import { NONE, MAINMENU, GAME, LEVELSMANAGEMENTMENU } from "../views/viewType.js";
import { Level } from "../models/level.js";

export class Controller extends Subject
{
    #currentScreen;
    #level;
    #maps;

    constructor()
    {
        super();
        this.#currentScreen = MAINMENU;
        this.#maps = [];
        this.addMap("/maps/test.txt");
    }

    set currentScreen(value) { this.#currentScreen = value; this.notify(); }
    get currentScreen() { return this.#currentScreen; }

    set level(value) { this.#level = value; }
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
        console.log(this.#maps[0]);
        this.#level = new Level(this.#maps[0]);
        console.log(this.#level);
        this.currentScreen = GAME;
    }
}