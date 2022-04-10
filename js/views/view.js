import { Observer } from "../patterns/observer.js";
import { NONE } from "./viewType.js";

export class View extends Observer
{
    //Controller managing the view
    _controller;

    //View type
    _viewType;

    /**
     * constructor
     * @param {Controller} controller : Controller managing the view
     */
    constructor(controller)
    {
        super();

        this._controller = controller;
        this._controller.addObserver(this);

        this._viewType = NONE;
    }

    /**
     * Checks that the view is the one displayed by the controller
     * @returns {boolean}
     */
    checkView()
    {
        return this._controller.currentScreen === this._viewType;
    }

    /**
     * Notify the view
     */
    notify()
    {
        if (this.checkView())
            this.update();
    }

    /**
     * update of the view
     */
    update()
    {
        throw "Redefine the update method!";
    }
}