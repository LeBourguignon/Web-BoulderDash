import { View } from "./view.js";
import { LEVELLOOSE } from "./viewType.js";

export class ViewLevelLoose extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = LEVELLOOSE;
        this.notify();
    }

    update()
    {
        const appHTML = document.querySelector("app");

        const looseHTML = document.createElement("div");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Niveau " + this._controller.mapNumber + " perdu !";
        looseHTML.appendChild(titleHTML);

        const buttonHTML = document.createElement("div");

        const buttonRMM = document.createElement("button");
        buttonRMM.textContent = "Retour au menu principal";
        buttonRMM.addEventListener("click", () => {
            this._controller.returnMainMenu();
        });
        buttonHTML.appendChild(buttonRMM);

        const buttonRL = document.createElement("button");
        buttonRL.textContent = "Recommencer le niveau";
        buttonRL.addEventListener("click", () => {
            this._controller.restartLevel();
        });
        buttonHTML.appendChild(buttonRL);

        looseHTML.appendChild(buttonHTML);

        appHTML.appendChild(looseHTML);
    }
}