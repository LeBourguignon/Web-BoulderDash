import { Observer } from "./observer";

export class Subject
{
    //Observer Vector
    #observers;

    /**
     * Constructor
     */
    constructor()
    {
        this.#observers = [];
    }

    /**
     * Add an observer
     * @param {Observer} observer : Observe added
     */
    addObserver(observer)
    {
        this.#observers.push(observer);
    }

    /**
     * Notifies all observers
     */
    notify()
    {
        this.#observers.forEach((observer) => {
            observer.notify();
        });
    }
}