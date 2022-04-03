import { View } from "./view.js";
import { RESTARTLEVEL } from "./viewType.js";

export class ViewRestartLevel extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = RESTARTLEVEL;
        this.notify();
    }

    update()
    {
        const appHTML = document.querySelector("app");

        const restartLevelHTML = document.createElement("div");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Etes-vous sûr de vouloir recommencer le niveau ?";
        restartLevelHTML.appendChild(titleHTML);

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
            this._controller.restartLevel();
        });
        buttonHTML.appendChild(buttonA);

        restartLevelHTML.appendChild(buttonHTML);

        appHTML.appendChild(restartLevelHTML);
    }
}