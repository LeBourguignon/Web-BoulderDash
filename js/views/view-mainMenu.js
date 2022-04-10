import { View } from "./view.js";
import { LEVELSMANAGEMENTMENU, MAINMENU } from "./viewType.js";

export class ViewMainMenu extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = MAINMENU;
        this.notify();
    }

    update()
    {
		/*
            Main menu
        */

        const appHTML = document.querySelector("app");
        appHTML.innerHTML = "";

        const mainMenuHTML = document.createElement("mainMenu");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Boulder Dash"
        mainMenuHTML.appendChild(titleHTML);

        const buttonNG = document.createElement("button");
        buttonNG.textContent = "Nouvelle partie";
        buttonNG.addEventListener("click", () => {
            this._controller.newGame();
        });
        mainMenuHTML.appendChild(buttonNG);

        const buttonRG = document.createElement("button");
        buttonRG.textContent = "Reprendre la partie";
        buttonRG.addEventListener("click", () => {
            this._controller.resumeGame();
        });
        mainMenuHTML.appendChild(buttonRG);

        const buttonLMM = document.createElement("button");
        buttonLMM.textContent = "Gestion des niveaux";
        buttonLMM.addEventListener("click", () => {
            this._controller.levelsManagement();
        });
        mainMenuHTML.appendChild(buttonLMM);

        appHTML.appendChild(mainMenuHTML);
    }
}