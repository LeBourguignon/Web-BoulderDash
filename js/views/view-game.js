import { View } from "./view.js";
import { GAME, RESTARTLEVEL, RETURNMAINMENU } from "./viewType.js";

export class ViewGame extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = GAME;
        this.notify();
    }

    update()
    {
        const appHTML = document.querySelector("app");
        appHTML.innerHTML = "";

        const level = this._controller.level;

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
        collectedDiamondHTML.textContent = level.collectedDiamond;
        headerHTML.appendChild(collectedDiamondHTML);

        const nbDiamondHTML = document.createElement("div");
        nbDiamondHTML.classList.add("nbDiamond");
        nbDiamondHTML.textContent = level.nbDiamond;
        headerHTML.appendChild(nbDiamondHTML);

        const nbMoveHTML = document.createElement("div");
        nbMoveHTML.classList.add("nbMove");
        nbMoveHTML.textContent = level.nbMove;
        headerHTML.appendChild(nbMoveHTML);

        appHTML.appendChild(headerHTML);

        /*
            Game
        */

        const gameHTLM = document.createElement("game");

        level.grid.forEach((line, i) => {
            const lineHTML = document.createElement("div");

            line.forEach((block, j) => {
                const blockHTML = document.createElement("div");
                blockHTML.classList.add(block.type);
                blockHTML.textContent = block.type;
                lineHTML.appendChild(blockHTML);
            });

            gameHTLM.appendChild(lineHTML);
        });

        appHTML.appendChild(gameHTLM);

        /*
            Button
        */

        const footerHTML = document.createElement("footer");

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

        appHTML.appendChild(footerHTML);
    }
}