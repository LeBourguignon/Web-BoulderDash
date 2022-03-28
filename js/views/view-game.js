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
    }
}