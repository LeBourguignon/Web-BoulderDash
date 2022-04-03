import { View } from "./view.js";
import { LEVELSMANAGEMENTMENU } from "./viewType.js";
import { Level } from "../models/level.js";

export class ViewLevelsManagementMenu extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = LEVELSMANAGEMENTMENU;
        this.notify();
    }

    update()
    {
        const appHTML = document.querySelector("app");
        appHTML.innerHTML = "";

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Gestion des niveaux";
        appHTML.appendChild(titleHTML);

        const levelsManagementHTML = document.createElement("div");

        const maps = this._controller.changingMaps;

        maps.forEach((map, i) => {
            const mapHTML = document.createElement("map");

            const headerHTML = document.createElement("header");

            const mapNumberHTML = document.createElement("h1");
            mapNumberHTML.textContent = "Niveau " + (i + 1);
            headerHTML.appendChild(mapNumberHTML);

            mapHTML.appendChild(headerHTML);
            
            const gameHTLM = document.createElement("game");

            const level = new Level(map);

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

            mapHTML.appendChild(gameHTLM);

            const footerHTML = document.createElement("footer");

            if (i != 0)
            {
                const buttonMF = document.createElement("button");
                buttonMF.textContent = "Avancer";
                buttonMF.addEventListener("click", () => {
                    this._controller.moveForward(i);
                });
                footerHTML.appendChild(buttonMF);
            }

            const buttonD = document.createElement("button");
            buttonD.textContent = "Supprimer";
            buttonD.addEventListener("click", () => {
                this._controller.delete(i);
            });
            footerHTML.appendChild(buttonD);

            if (i != maps.length - 1)
            {
                const buttonMB = document.createElement("button");
                buttonMB.textContent = "Reculer";
                buttonMB.addEventListener("click", () => {
                    this._controller.moveBack(i);
                });
                footerHTML.appendChild(buttonMB);
            }

            mapHTML.appendChild(footerHTML);

            levelsManagementHTML.appendChild(mapHTML);
        });

        appHTML.appendChild(levelsManagementHTML);

        const buttonHTML = document.createElement("div");

        const buttonC = document.createElement("button");
        buttonC.textContent = "Annuler";
        buttonC.addEventListener("click", () => {
            this._controller.cancelLevelsManagement();
        });
        buttonHTML.appendChild(buttonC);

        const buttonAL = document.createElement("button");
        buttonAL.textContent = "Ajouter un niveau";
        buttonAL.addEventListener("click", () => {
            this._controller.addLevel();
        });
        buttonHTML.appendChild(buttonAL);

        const buttonA = document.createElement("button");
        buttonA.textContent = "Appliquer";
        buttonA.addEventListener("click", () => {
            this._controller.applyLevelsManagement();
        });
        buttonHTML.appendChild(buttonA);

        appHTML.appendChild(buttonHTML);
    }
}