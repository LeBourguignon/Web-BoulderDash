import { View } from "./view.js";
import { LEVELSMANAGEMENTMENU, MAINMENU } from "./viewType.js";

export class ViewMainMenu extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = MAINMENU;
        this.notify();
    }

    update()
    {
        const appHTML = document.querySelector("app");
        appHTML.innerHTML = "";

        const mainMenuHTML = document.createElement("mainMenu");

        const titleHTML = document.createElement("h1");
        titleHTML.textContent = "Boulder Dash"
        mainMenuHTML.appendChild(titleHTML);

        const buttonNG = document.createElement("button");
        buttonNG.textContent = "Nouvelle partie";
        buttonNG.addEventListener("click", () => {
            this._controller.newGame();
        });
        mainMenuHTML.appendChild(buttonNG);

        const buttonRG = document.createElement("button");
        buttonRG.textContent = "Reprendre la partie";
        buttonRG.addEventListener("click", () => {
            this._controller.resumeGame();
        });
        mainMenuHTML.appendChild(buttonRG);

        const buttonLMM = document.createElement("button");
        buttonLMM.textContent = "Gestion des niveaux";
        buttonLMM.addEventListener("click", () => {
            this._controller.levelsManagement();
        });
        mainMenuHTML.appendChild(buttonLMM);

        const footerHTML = document.createElement("footer");

        const pFooterHTML = document.createElement("div");
        pFooterHTML.textContent = "Créé par";
        footerHTML.appendChild(pFooterHTML);

        const Author1HTML = document.createElement("a");

        Author1HTML.textContent = "Baptiste ANDRES";
        Author1HTML.href = "https://github.com/LeBourguignon";
        footerHTML.appendChild(Author1HTML);

        const textAndHTML = document.createElement("div");

        textAndHTML.textContent = "et";
        footerHTML.appendChild(textAndHTML);

        const Author2HTML = document.createElement("a");

        Author2HTML.textContent = "Tom ROTH";
        Author2HTML.href = "https://github.com/tom-rh";
        footerHTML.appendChild(Author2HTML);

        mainMenuHTML.appendChild(footerHTML);

        appHTML.appendChild(mainMenuHTML);
    }
}