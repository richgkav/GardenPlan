import * as Kman from './konva-man';

import { actionEvents } from './undo-redo';

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

//    let storeObjBefore = undefined;

    const elMenuBox = document.getElementById('menu-rect');
    elMenuBox.addEventListener('click', (event) => {
        //menu.selectItem(elMenuBox);

        const rect = new Konva.Rect({
            x: Kman.stage.width() / 2,
            y: Kman.stage.height() / 2,
            width: 100,
            height: 100,
            fill: 'white',
            strokeWidth: 0,
        });

        rect.id(Kman.createId());           // Set the id for the shape that is visible
        setOffsetCenter(rect);              // set for newly created shape

        const objAfter = rect.clone();
        Kman.setAfterID(objAfter);
        actionEvents.createAdded(objAfter); // set undo states
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

    // ------------------------ UNDO ------------------------ //

    const elUndoButton = document.getElementById('menu-undo');
    elUndoButton.addEventListener('click', function() {

        Kman.clearTransformer();
        // need to look at the Instruction stored in the current actionEvent to check
        // the objBefore & objAfter values to indicate what needs to be done

        const instruction = actionEvents.undo();        // get the instruction 
    
        // Undo for object that was ADDED (new)

        if (instruction && instruction.objBefore === null) {
            const idToSearch = instruction.objAfter.id().substring(4);
            const obj_onStage = Kman.stage.findOne('#'+ idToSearch);
            instruction.objAfter = obj_onStage.clone(); // copy current stage object (for updated values)
            Kman.setAfterID(instruction.objAfter);
            obj_onStage.hide();
            Kman.layer.draw();
        }

        // Undo for object that was CHANGED OR DELETED

        if (instruction && instruction.objBefore !== null) {
            const idToSearch = instruction.objBefore.id().substring(4);     // the id of the layer shape
            const obj_onStage = Kman.stage.findOne('#'+ idToSearch);
            obj_onStage.destroy();
            const obj_befClone = instruction.objBefore.clone();
            obj_befClone.id(idToSearch);                                    // correct the id
            Kman.layer.add(obj_befClone);
            Kman.layer.draw();
        }

    });

    // ------------------------ REDO ------------------------ //
    // only need to copy objAfter to layer in all cases

    const elRedoButton = document.getElementById('menu-redo');
    elRedoButton.addEventListener('click', function() {
        const instruction = actionEvents.redo();

        if (instruction) {
            const idToSearch = instruction.objAfter.id().substring(4);
            const obj_onStage = Kman.stage.findOne('#'+ idToSearch);
            obj_onStage.destroy();
            const obj_copy = instruction.objAfter.clone();          // copy the stored object ('aft-00')
            obj_copy.id(idToSearch);
            Kman.createNodeEvents(obj_copy);
            obj_copy.show();
            Kman.layer.add(obj_copy);
            Kman.layer.draw();
        }
    });

}

function setOffsetCenter(node) {
    node.offsetX(node.width()/2);
    node.offsetY(node.height()/2);
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

export {
    setup as setup_menu
}