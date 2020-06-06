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

    getItem(id) {
        for (let i = 0; i != this.items.length; i++) {
            if (this.items[i].id === id) {
                return this.items[i];
            }
        }
        return false;
    }

    // selects passed id and unselects everything else

    selectItem(element) {
        for (let i = 0; i != this.items.length; i++) {
            this.items[i].selected = false;
            document.getElementById(this.items[i].id).classList.remove('menu-item-selected');
            
            if (this.items[i].id === element.id) {
                this.items[i].selected = true;
                element.classList.add('menu-item-selected');
            }
        }
    }

    createMenu() {

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
