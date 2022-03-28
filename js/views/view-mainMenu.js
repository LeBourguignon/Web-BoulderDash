import { View } from "./view.js";
import { GAME, MAINMENU } from "./viewType.js";

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

        const title = document.createElement("h1");
        title.textContent = "Boulder Dash"
        appHTML.appendChild(title);

        const buttonNG = document.createElement("button");
        buttonNG.textContent = "Nouvelle partie";
        buttonNG.addEventListener("click", () => {
            this._controller.newGame();
        });
        appHTML.appendChild(buttonNG);

        const buttonRG = document.createElement("button");
        buttonRG.textContent = "Reprendre la partie";
        buttonRG.addEventListener("click", () => {

        });
        appHTML.appendChild(buttonRG);

        const buttonLMM = document.createElement("button");
        buttonLMM.textContent = "Gestion des niveaux";
        buttonLMM.addEventListener("click", () => {

        });
        appHTML.appendChild(buttonLMM);
    }
}