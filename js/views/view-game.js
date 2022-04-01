import { View } from "./view.js";
import { GAME } from "./viewType.js";

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

        const headerHTML = document.createElement("header");
        
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
    }
}