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

        const gridHTLM = document.createElement("game");

        level.grid.forEach((line, i) => {
            const lineHTML = document.createElement("div");

            line.forEach((block, j) => {
                const blockHTML = document.createElement("div");
                blockHTML.classList.add(block.type);
                blockHTML.textContent = block.type;
                lineHTML.appendChild(blockHTML);
            });

            gridHTLM.appendChild(lineHTML);
        });

        appHTML.appendChild(gridHTLM);
    }
}