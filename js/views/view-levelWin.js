import { View } from "./view.js";
import { LEVELWIN } from "./viewType.js";

export class ViewLevelWin extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = LEVELWIN;
        this.notify();
    }

    update()
    {
		const gameFooter = document.getElementById("gameFooter");
		gameFooter.innerHTML = "";

        const appHTML = document.querySelector("app");

        const winHTML = document.createElement("confirmation");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Niveau " + this._controller.mapNumber + " gagné !";
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

        const buttonNL = document.createElement("button");
        buttonNL.textContent = "Niveau suivant";
        buttonNL.addEventListener("click", () => {
            this._controller.nextLevel();
        });
        buttonHTML.appendChild(buttonNL);

        winHTML.appendChild(buttonHTML);

        appHTML.appendChild(winHTML);
    }
}