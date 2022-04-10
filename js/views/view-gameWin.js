import { View } from "./view.js";
import { GAMEWIN } from "./viewType.js";

export class ViewGameWin extends View
{
    /**
     * constructor
     * @param {Controller} controller : Controller managing the view
     */
    constructor(controller)
    {
        super(controller);
        this._viewType = GAMEWIN;
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

        const winHTML = document.createElement("confirmation");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Félitations, tu as gagné la partie !";
        winHTML.appendChild(titleHTML);

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

        winHTML.appendChild(buttonHTML);

        appHTML.appendChild(winHTML);
    }
}