let actionEvents = undefined;

function setup_actionEvents() {
    actionEvents = new ActionEvents();
}

export class ActionEvents {
    constructor() {
        this.eventline = [];        // undo redo steps
        this.location = 0;          // the current event
    }

    newInstruction(objBefore, objAfter) {

        // remove following events if one is changed
        this.eventline.length = this.location;

        const inst = new Instruction(objBefore, objAfter);
        this.eventline.push(inst);
        this.location++;
        console.log(`actionEvents added - events stored = ${this.eventline.length}`);
        console.log(`location = ${this.location} - length = ${this.eventline.length}`);
        return inst;
    }

    // if user performs an undo and then makes a change the rest of the 
    // timeline is lost so cut those elements from the array

    removeAfter() {
        console.log(`previous length = ${this.eventline.length}`);
        this.eventline.length = location;
        console.log(`new length = ${this.eventline.length}`);
    }

    undo() {
        if (this._stepBack()) {
            console.log('undo -- location = ' + this.location);
            return this.eventline[this.location];
        }
        return null;
    }

    _stepBack() {
        if (this.location > 0) {
            this.location -= 1;
            return true;
        }
        return false;
    }

    redo() {
        console.log('Perform redo on location = ' + this.location);
        const instruction = this.eventline[this.location];
        this._stepForward(); // set location to next step
        return instruction;
    }

    _stepForward() {
        if (this.location < this.eventline.length) {
            this.location += 1;
            return true;
        }
        return false;
    }

    createAdded(objAfter) {
        this.newInstruction(null, objAfter);
    }

    createChanged(objBefore, objAfter) {
        this.newInstruction(objBefore, objAfter);
    }

    createDeleted(objBefore) {
        this.newInstruction(objBefore, null);
    }

}

// stores object before and after change

// when adding a new object objBefore is set to null so that if undoing and
// null is found then that meand remove the object

// when undoing objBefore is used
// when redoing objAfter is used

class Instruction {
    constructor(objBefore, objAfter) {
        this.objBefore = objBefore;
        this.objAfter = objAfter;
    }
}

export {
    Instruction,
    setup_actionEvents,
    actionEvents
}