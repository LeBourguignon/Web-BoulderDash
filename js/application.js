import { Controller } from "./controllers/controller.js";
import { ViewMainMenu } from "./views/view-mainMenu.js";
import { ViewGame } from "./views/view-game.js"

class Application
{
    #controller;
    #viewMainMenu;
    #viewGame;

    constructor()
    {
        this.#controller = new Controller();
        this.#viewMainMenu = new ViewMainMenu(this.#controller);
        this.#viewGame = new ViewGame(this.#controller);
        document.addEventListener("keydown", this.#controller.keyDown.bind(this.#controller));
    }
}

window.addEventListener("load", () => {
    const app = new Application();
})