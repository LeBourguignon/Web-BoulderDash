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
		/*
            Footer
        */

        const constFooterHTML = document.querySelector("constFooter");
        constFooterHTML.innerHTML = "";

		/*
            Credits
        */

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

		const textAnd2HTML = document.createElement("div");

        textAnd2HTML.textContent = " | Musique composée par ";
        authorsHTML.appendChild(textAnd2HTML);

		const Author3HTML = document.createElement("a");

		Author3HTML.textContent = "Mydren";
        Author3HTML.href = "https://www.youtube.com/channel/UCY1JDhGKM5MYJsNXyhRXj8w";
        authorsHTML.appendChild(Author3HTML);

        constFooterHTML.appendChild(authorsHTML);

		/*
            Volume icon
        */

		const volumeHTML = document.createElement("img");

		if (this._controller.volumeMusic === 0)
			volumeHTML.src = "/resources/img/volume-off.png";
		else
			volumeHTML.src = "/resources/img/volume-on.png";
		
		volumeHTML.addEventListener("click", () => {
			this._controller.switchVolumeMusic();
		});
		constFooterHTML.appendChild(volumeHTML);
    }
}