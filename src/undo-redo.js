let actionEvents = undefined;

function setup_actionEvents() {
    actionEvents = new ActionEvents();
}

export class ActionEvents {
    constructor() {
        this.eventline = [];        // undo redo steps
        this.location = 0;          // current position in steps
    }

    newInstruction(objBefore, objAfter) {
        const inst = new Instruction(objBefore, objAfter);
        this.eventline.push(inst);
        console.log(`actionEvents added - events stored = ${this.eventline.length}`);
        this.location++;
        return inst;
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