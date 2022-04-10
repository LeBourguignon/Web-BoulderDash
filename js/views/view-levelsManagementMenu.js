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

        const levelsManagementHTML = document.createElement("levelsManagement")

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Gestion des niveaux";
        levelsManagementHTML.appendChild(titleHTML);

        const mapsHTML = document.createElement("maps");

        const maps = this._controller.changingMaps;

        maps.forEach((map, i) => {
            const mapHTML = document.createElement("map");

            const headerHTML = document.createElement("header");

            const mapNumberHTML = document.createElement("h1");
            mapNumberHTML.textContent = "Niveau " + (i + 1);
            headerHTML.appendChild(mapNumberHTML);

            mapHTML.appendChild(headerHTML);
            
            const levelHTLM = document.createElement("level");

            const level = new Level(map);

            level.grid.forEach((line, i) => {
                const lineHTML = document.createElement("div");

                line.forEach((block, j) => {
                    const blockHTML = document.createElement("div");
                    blockHTML.classList.add(block.type);
                    lineHTML.appendChild(blockHTML);
                });

                levelHTLM.appendChild(lineHTML);
            });

            mapHTML.appendChild(levelHTLM);

            const footerHTML = document.createElement("footer");

            if (i != 0)
            {
				const arrowLeftHTML = document.createElement("img");
				arrowLeftHTML.src = "/resources/img/arrow-left.png";
				arrowLeftHTML.addEventListener("click", () => {
                    this._controller.moveForward(i);
                });
				footerHTML.appendChild(arrowLeftHTML);
            }

            const buttonD = document.createElement("button");
            buttonD.textContent = "Supprimer";
            buttonD.addEventListener("click", () => {
                this._controller.delete(i);
            });
            footerHTML.appendChild(buttonD);

            if (i != maps.length - 1)
            {
				const arrowRightHTML = document.createElement("img");
				arrowRightHTML.src = "/resources/img/arrow-right.png";
				arrowRightHTML.addEventListener("click", () => {
                    this._controller.moveBack(i);
                });
				footerHTML.appendChild(arrowRightHTML);
            }

            mapHTML.appendChild(footerHTML);

            mapsHTML.appendChild(mapHTML);
        });

        levelsManagementHTML.appendChild(mapsHTML);

        const buttonHTML = document.createElement("div");

        const buttonC = document.createElement("button");
        buttonC.textContent = "Annuler";
        buttonC.addEventListener("click", () => {
            this._controller.cancelLevelsManagement();
        });
        buttonHTML.appendChild(buttonC);

        const inputHTML = document.createElement("input");
        inputHTML.type = "file";
        inputHTML.id = "mapForUpload";
        inputHTML.name = "mapForUpload";
        inputHTML.accept = ".txt";
        inputHTML.textContent = "Ajouter un niveau";
        inputHTML.addEventListener("change", () => {
            this._controller.addLevel();
        });
        buttonHTML.appendChild(inputHTML);

        const buttonA = document.createElement("button");
        buttonA.textContent = "Appliquer";
        buttonA.addEventListener("click", () => {
            this._controller.applyLevelsManagement();
        });
        buttonHTML.appendChild(buttonA);

        levelsManagementHTML.appendChild(buttonHTML);

        appHTML.appendChild(levelsManagementHTML);
    }
}