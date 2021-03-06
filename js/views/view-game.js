import { View } from "./view.js";
import { GAME, RESTARTLEVEL, RETURNMAINMENU } from "./viewType.js";

export class ViewGame extends View
{
    /**
     * constructor
     * @param {Controller} controller : Controller managing the view
     */
    constructor(controller)
    {
        super(controller);
        this._viewType = GAME;
        this.notify();
    }

    /**
     * update of the view
     */
    update()
    {
		/*
            Game
        */

        const appHTML = document.querySelector("app");
        appHTML.innerHTML = "";

        const level = this._controller.level;

        const gameHTML = document.createElement("game");

        /*
            Header
        */

        const headerHTML = document.createElement("header");

        const levelNumber = document.createElement("div");
        levelNumber.classList.add("levelNumber");
        levelNumber.textContent = "Niveau " + this._controller.mapNumber;
        headerHTML.appendChild(levelNumber);
        
        const collectedDiamondHTML = document.createElement("div");
        collectedDiamondHTML.classList.add("collectedDiamond");
        collectedDiamondHTML.textContent = "| Nombre de diamants ramassés : "+ level.collectedDiamond + " |";
        headerHTML.appendChild(collectedDiamondHTML);

        const nbDiamondHTML = document.createElement("div");
        nbDiamondHTML.classList.add("nbDiamond");
        nbDiamondHTML.textContent = "| Nombre de diamants : " + level.nbDiamond + " |";
        headerHTML.appendChild(nbDiamondHTML);

        const nbMoveHTML = document.createElement("div");
        nbMoveHTML.classList.add("nbMove");
        nbMoveHTML.textContent = "| Nombre de mouvements : " + level.nbMove + " |";
        headerHTML.appendChild(nbMoveHTML);

        gameHTML.appendChild(headerHTML);

        /*
            Game
        */

        const levelHTLM = document.createElement("level");

        level.grid.forEach((line, i) => {
            const lineHTML = document.createElement("div");

            line.forEach((block, j) => {
                const blockHTML = document.createElement("div");
                blockHTML.classList.add(block.type);
                lineHTML.appendChild(blockHTML);
            });

            levelHTLM.appendChild(lineHTML);
        });

        gameHTML.appendChild(levelHTLM);

        /*
            Footer
        */

        const footerHTML = document.createElement("footer");
		footerHTML.id = "gameFooter";

        const buttonRMM = document.createElement("button");
        buttonRMM.textContent = "Retour au menu principal";
        buttonRMM.addEventListener("click", () => {
            if (this.checkView())
                this._controller.currentScreen = RETURNMAINMENU;
        });
        footerHTML.appendChild(buttonRMM);

        const buttonRL = document.createElement("button");
        buttonRL.textContent = "Recommencer le niveau";
        buttonRL.addEventListener("click", () => {
            if (this.checkView())
                this._controller.currentScreen = RESTARTLEVEL;
        });
        footerHTML.appendChild(buttonRL);

        gameHTML.appendChild(footerHTML);

        appHTML.appendChild(gameHTML);
    }
}