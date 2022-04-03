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
        const appHTML = document.querySelector("app");
        appHTML.innerHTML = "";

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Boulder Dash"
        appHTML.appendChild(titleHTML);

        const buttonNG = document.createElement("button");
        buttonNG.textContent = "Nouvelle partie";
        buttonNG.addEventListener("click", () => {
            this._controller.newGame();
        });
        appHTML.appendChild(buttonNG);

        const buttonRG = document.createElement("button");
        buttonRG.textContent = "Reprendre la partie";
        buttonRG.addEventListener("click", () => {
            this._controller.resumeGame();
        });
        appHTML.appendChild(buttonRG);

        const buttonLMM = document.createElement("button");
        buttonLMM.textContent = "Gestion des niveaux";
        buttonLMM.addEventListener("click", () => {
            this._controller.levelsManagement();
        });
        appHTML.appendChild(buttonLMM);
    }
}