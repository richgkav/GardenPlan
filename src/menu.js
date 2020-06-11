import {kman_layer, kman_stage, kman_clear} from './konva-man';
import {timeline} from './Timeline';

let menu = undefined;

function setup() {

    menu = new Menu();

    // idea - can use different classes here for different element  styles

    menu.addItem('Rectangle','menu-item','menu-rect', 20);
    menu.addItem('Circle','menu-item','menu-circle', 30);
    menu.addItem('Undo', 'menu-item', 'menu-undo', 40);
    menu.addItem('Redo', 'menu-item', 'menu-redo', 40);
    menu.renderItems('menu-buttons');

    // -- adding a rectangle shape -- //

    const elMenuBox = document.getElementById('menu-rect');
    elMenuBox.addEventListener('click', (event) => {
        //menu.selectItem(elMenuBox);

        const rect = new Konva.Rect({
            x: kman_stage.width() / 2,
            y: kman_stage.height() / 2,
            width: 100,
            height: 100,
            fill: 'red',
            strokeWidth: 2,
        });

        rect.offsetX(rect.width()/2);
        rect.offsetY(rect.height()/2);

        // movement and transform events - update editor values
        rect.on('dragmove', function () {
            const x = document.getElementById('edit-x');
            const y = document.getElementById('edit-y');
            x.innerText = rect.x().toFixed(2);
            y.innerText = rect.y().toFixed(2);
        })

        rect.on('transform', function () {
            const r = document.getElementById('edit-rot');
            r.innerText = rect.rotation().toFixed(2);
        });

        kman_layer.add(rect);
        kman_clear();           // unselect and unmove everything
        kman_layer.draw();
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

export {
    setup as menuSetup
}