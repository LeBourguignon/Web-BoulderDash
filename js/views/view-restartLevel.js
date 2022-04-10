import { View } from "./view.js";
import { RESTARTLEVEL } from "./viewType.js";

export class ViewRestartLevel extends View
{
    /**
     * constructor
     * @param {Controller} controller : Controller managing the view
     */
    constructor(controller)
    {
        super(controller);
        this._viewType = RESTARTLEVEL;
        this.notify();
    }

    /**
     * update of the view
     */
    update()
    {
		/*
            Game footer
        */

		const gameFooter = document.getElementById("gameFooter");
		gameFooter.innerHTML = "";

        const lastConfirmationHTML = document.querySelector("confirmation");
        if (lastConfirmationHTML !== null)
            lastConfirmationHTML.remove();

        const appHTML = document.querySelector("app");

		/*
            Confirmation
        */

        const restartLevelHTML = document.createElement("confirmation");

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