import { Controller } from "./controllers/controller.js";
import { ViewMainMenu } from "./views/view-mainMenu.js";
import { ViewConstFooter } from "./views/view-constFooter.js";
import { ViewGame } from "./views/view-game.js"
import { ViewLevelsManagementMenu } from "./views/view-levelsManagementMenu.js";
import { ViewLevelWin } from "./views/view-levelWin.js";
import { ViewLevelLoose } from "./views/view-levelLoose.js";
import { ViewGameWin } from "./views/view-gameWin.js";
import { ViewReturnMainMenu } from "./views/view-returnMainMenu.js";
import { ViewRestartLevel } from "./views/view-restartLevel.js";

class Application
{
    #controller;
    #viewMainMenu;
	#viewConstFooter;
    #viewGame;
    #viewLevelsManagementMenu;
    #viewLevelWin;
    #viewLevelLoose;
    #viewGameWin;
    #viewReturnMainMenu;
    #viewRestartLevel;

    constructor()
    {
        this.#controller = new Controller();
        this.#viewMainMenu = new ViewMainMenu(this.#controller);
		this.#viewConstFooter = new ViewConstFooter(this.#controller);
        this.#viewGame = new ViewGame(this.#controller);
        this.#viewLevelsManagementMenu = new ViewLevelsManagementMenu(this.#controller);
        this.#viewLevelWin = new ViewLevelWin(this.#controller);
        this.#viewLevelLoose = new ViewLevelLoose(this.#controller);
        this.#viewGameWin = new ViewGameWin(this.#controller);
        this.#viewReturnMainMenu = new ViewReturnMainMenu(this.#controller);
        this.#viewRestartLevel = new ViewRestartLevel(this.#controller);
        document.addEventListener("keydown", this.#controller.keyDown.bind(this.#controller));
    }
}

window.addEventListener("load", () => {
    const app = new Application();
})