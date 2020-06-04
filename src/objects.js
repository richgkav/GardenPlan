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
        const rendElmt = document.getElementById(idToRenderTo);
        this.items.forEach(element => {
            rendElmt.appendChild(element.createDiv());
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
    }

    createDiv() {
        const div = document.createElement('div');
        div.innerText = this.title;
        if (this.cssClassName !== ""){
            div.classList.add(this.cssClassName);
        }
        if (this.id !== ""){
            div.id = this.id;
        }
        return div;
    }
}
