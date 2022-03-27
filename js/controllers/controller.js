import { Subject } from "../patterns/subject";

export class Controller extends Subject
{
    #currentScreen;

    constructor()
    {
        super();

        this.#currentScreen = 0;
    }

    set currentScreen(value) { this.#currentScreen = value; this.notify(); }
    get currentScreen() { return this.#currentScreen; }
}