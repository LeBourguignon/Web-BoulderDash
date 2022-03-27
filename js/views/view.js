import { Observer } from "../patterns/observer";

export class View extends Observer
{
    #controller;
    _viewType;

    constructor(controller)
    {
        super();

        this.#controller = controller;
        this.#controller.addObserver(this);

        this.notify();
    }

    notify()
    {
        throw "Redefine the notify method!";
    }

    update()
    {
        throw "Redefine the update method!";
    }
}