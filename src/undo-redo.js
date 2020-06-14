let actionEvents = undefined;

function setup_actionEvents() {
    actionEvents = new ActionEvents();
}

export class ActionEvents {
    constructor() {
        this.eventline = [];        // undo redo steps
        this.location = 0;          // the current event
    }

    newState(objBefore, objAfter) {

        // remove following events if one is changed
        this.eventline.length = this.location;

        const aState = new ActionStates(objBefore, objAfter);
        this.eventline.push(aState);
        this.location++;
        return aState;
    }

    // if user performs an undo and then makes a change the rest of the 
    // timeline is lost so cut those elements from the array

    removeAfter() {
        this.eventline.length = location;
    }

    undo() {
        if (this._stepBack()) {
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
        const actionState = this.eventline[this.location];
        this._stepForward(); // set location to next step
        return actionState;
    }

    _stepForward() {
        if (this.location < this.eventline.length) {
            this.location += 1;
            return true;
        }
        return false;
    }

    createAdded(objAfter) {
        this.newState(null, objAfter);
    }

    createChanged(objBefore, objAfter) {
        this.newState(objBefore, objAfter);
    }

    createDeleted(objBefore) {
        this.newState(objBefore, null);
    }

}

class ActionStates {
    constructor(objBefore, objAfter) {
        this.objBefore = objBefore;
        this.objAfter = objAfter;
    }
}

export {
    setup_actionEvents,
    actionEvents
}