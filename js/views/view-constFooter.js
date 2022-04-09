import { Observer } from "../patterns/observer.js";

export class ViewConstFooter extends Observer
{
	_controller;

    constructor(controller)
    {
		super();
		this._controller = controller;
		this._controller.addObserver(this);
        this.notify();
    }

	notify()
	{
		this.update();
	}

    update()
    {
        const constFooterHTML = document.querySelector("constFooter");
        constFooterHTML.innerHTML = "";

        const authorsHTML = document.createElement("div");

        const textHTML = document.createElement("div");
        textHTML.textContent = "Créé par";
        authorsHTML.appendChild(textHTML);

        const Author1HTML = document.createElement("a");

        Author1HTML.textContent = "Baptiste ANDRES";
        Author1HTML.href = "https://github.com/LeBourguignon";
        authorsHTML.appendChild(Author1HTML);

        const textAndHTML = document.createElement("div");

        textAndHTML.textContent = "et";
        authorsHTML.appendChild(textAndHTML);

        const Author2HTML = document.createElement("a");

        Author2HTML.textContent = "Tom ROTH";
        Author2HTML.href = "https://github.com/tom-rh";
        authorsHTML.appendChild(Author2HTML);

        constFooterHTML.appendChild(authorsHTML);

		const volumeHTML = document.createElement("img");

		volumeHTML.src = "/resources/img/volume-on.png";
		constFooterHTML.appendChild(volumeHTML);
    }
}