export class Coordinate
{
    //X-axis
    #x;

    //Y-axis
    #y;

    /**
     * Constructor
     * @param {Coordonnee} coordinate : Coordinate with which the instance is initialized 
     */
    constructor(coordinate)
    {
        this.#x = coordinate.x;
        this.#y = coordinate.y;
    }

    set x(value) { this.#x = value; }
    get x() { return this.#x; }
    
    set y(value) { this.#y = value; }
    get y() { return this.#y; }
}