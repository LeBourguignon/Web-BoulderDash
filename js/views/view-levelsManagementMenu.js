import { View } from "./view.js";
import { LEVELSMANAGEMENTMENU } from "./viewType.js";

export class ViewGame extends View
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

        
    }
}