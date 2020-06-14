import * as Kman from './konva-man';

let menu = undefined;

export function setup() {

    menu = new Menu();

    // idea - can use different classes here for different element  styles

    menu.addItem('Rectangle','menu-item','menu-rect', 20);
    menu.addItem('Circle','menu-item','menu-circle', 30);
    menu.renderItems('menu-buttons');

    // -- adding a rectangle shape -- //

    const elMenuBox = document.getElementById('menu-rect');
    elMenuBox.addEventListener('click', (event) => {

        const rect = new Konva.Rect({
            x: Kman.stage.width() / 2,
            y: Kman.stage.height() / 2,
            width: 100,
            height: 100,
            fill: 'white',
            strokeWidth: 0,
        });

        rect.id(Kman.createId());           // Set the id for the shape that is visible
        Kman.setOffsetCenter(rect);              // set for newly created shape
        Kman.createNodeEvents(rect);             // transform events
        Kman.layer.add(rect);
        Kman.clearTransformer();                 // unselect and unmove everything
        Kman.layer.draw();
    });

    // -- end of adding a rectangle shape -- //

    const elMenuCircle = document.getElementById('menu-circle');
    elMenuCircle.addEventListener('click', (event) => {
        menu.selectItem(elMenuCircle);   
    });
}

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
