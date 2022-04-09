import { View } from "./view.js";
import { RETURNMAINMENU } from "./viewType.js";

export class ViewReturnMainMenu extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = RETURNMAINMENU;
        this.notify();
    }

    update()
    {
        const appHTML = document.querySelector("app");

        const returnMainMenuHTML = document.createElement("confirmation");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Etes-vous sûr de vouloir retourner au menu principal ?";
        returnMainMenuHTML.appendChild(titleHTML);

        const buttonHTML = document.createElement("div");

        const buttonC = document.createElement("button");
        buttonC.textContent = "Annuler";
        buttonC.addEventListener("click", () => {
            this._controller.resumeGame();
        });
        buttonHTML.appendChild(buttonC);

        const buttonA = document.createElement("button");
        buttonA.textContent = "Continuer";
        buttonA.addEventListener("click", () => {
            this._controller.returnMainMenu();
        });
        buttonHTML.appendChild(buttonA);

        returnMainMenuHTML.appendChild(buttonHTML);

        appHTML.appendChild(returnMainMenuHTML);
    }
}