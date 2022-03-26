import { Observer } from "../patterns/observer";

export class View extends Observer
{
    #controller;

    constructor(controller)
    {
        super();

        this.#controller = controller;
        this.#controller.addObserver(this);

        this.update();
    }

    update()
    {
        
    }
}