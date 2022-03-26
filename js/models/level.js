import { Coordinate } from "./coordinate";

export class Level
{
    #grille;

    constructor()
    {
        this.#grille = [];


    }

    get grille() { return this.#grille; }


}