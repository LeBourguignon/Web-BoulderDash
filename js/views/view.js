import { Observer } from "../patterns/observer.js";
import { NONE } from "./viewType.js";

export class View extends Observer
{
    _controller;
    _viewType;

    constructor(controller)
    {
        super();

        this._controller = controller;
        this._controller.addObserver(this);

        this._viewType = NONE;
    }

    checkView()
    {
        return this._controller.currentScreen === this._viewType;
    }

    notify()
    {
        if (this.checkView())
            this.update();
    }

    update()
    {
        throw "Redefine the update method!";
    }
}