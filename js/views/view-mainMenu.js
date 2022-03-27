import { View } from "./view";
import { MAINMENU } from "./viewType";

export class ViewMainMenu extends View
{
    constructor(controller)
    {
        super(controller);
        this._viewType = MAINMENU;
    }
}