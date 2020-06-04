import { createMenu } from "./menu";

export class Menu {
    
    constructor(){
        this.items = [];
    }

    addItem(title, cssClass, id, order) {
        const item = new MenuItem(title, cssClass, id, order);
        this.items.push(item);
        return item;
    }

    renderItems(idToRenderTo) {
        const div = document.getElementById(idToRenderTo);
        this.items.forEach(element => {
            div.appendChild(element.div);
        });
    }
}

class MenuItem {

    constructor(title, cssClassName, id, order) {
        this.title = title;
        this.cssClassName = cssClassName;
        this.id = id;
        this.selected = false;
        this.order = order;
        this.div = this.createDiv();
    }

    createDiv() {
        this.div = document.createElement('div');
        this.div.innerText = this.title;
        if (this.cssClassName !== ""){
            this.div.classList.add(this.cssClassName);
        }
        if (this.id !== ""){
            this.div.id = this.id;
        }
        return this.div;
    }
}
