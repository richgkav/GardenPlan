import {kman_layer, kman_stage, kman_clear, kman_createId} from './konva-man';
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

        rect.id(kman_createId());           // Set the id for the shape that is visible
        //console.log('original shape');
        //console.log(rect);

        // set undo action. this is new object so objBefore === null
        const objAfter = rect.clone();
        objAfter.hide();
        objAfter.id('aft-' + rect.id());    // make id unique
        actionEvents.newInstruction(null, objAfter);

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

    const elUndoButton = document.getElementById('menu-undo');
    elUndoButton.addEventListener('click', function() {

        // need to look at the Instruction stored in the current actionEvent to check
        // the objBefore & objAfter values to indicate what needs to be done

        const instruction = actionEvents.undo();
    
        if (instruction && instruction.objBefore === null) {   // object was originally added so need to hide it
            //console.log('Perform undo on id ' + instruction.objAfter.id());

            const idToSearch = instruction.objAfter.id().substring(4); // remove the undo/redo code from id
            //console.log('looking for ' + idToSearch);

            const obj_onStage = kman_stage.findOne('#'+ idToSearch);
            console.log(instruction.objAfter.id());
            console.log(obj_onStage.id());
            instruction.objAfter = obj_onStage.clone(); // copy current stage object (for updated values)
            instruction.objAfter.id('aft-' + instruction.objAfter.id());
            obj_onStage.hide();
            //console.log(`Shape ${obj_onStage.className} with id ${obj_onStage.id()} has been hidden`)
            kman_layer.draw();
        }

    });

    const elRedoButton = document.getElementById('menu-redo');
    elRedoButton.addEventListener('click', function() {
        const instruction = actionEvents.redo();

        if (instruction) {
            //console.log(`Perform redo on id ${instruction.objAfter.id()}`);
            // copy objAfter to object on the stage

            const idToSearch = instruction.objAfter.id().substring(4);
            //console.log('redo - looking for ' + idToSearch);

            const obj_onStage = kman_stage.findOne('#'+ idToSearch);
            //console.log('redo - looking to destroy');
            obj_onStage.destroy();


            const obj_copy = instruction.objAfter.clone();          // copy the stored object ('aft-00')
            obj_copy.id(instruction.objAfter.id().substring(4));    // fix the id (remove 'aft-')

            //console.log('recreate onstage with objAfter');
            //console.log(obj_copy);
            //console.log(`xy = ${obj_copy.x()} - ${obj_copy.y()}`);
            obj_copy.show();

            obj_copy.offsetX(obj_copy.width()/2);
            obj_copy.offsetY(obj_copy.height()/2);

            kman_layer.add(obj_copy);
            kman_layer.draw();

        }

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
    setup as setup_menu
}