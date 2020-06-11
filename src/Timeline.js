let timeline = undefined;

function setup() {
    timeline = new Timeline();
}

export class Timeline {
    constructor() {
        this.points = [];
        this.location = 0;
        this.index = 0;
    }

    createPoint() {
        const p = new Point();
        return p;
    }

    undo() {
        this._stepBack();
        return this.points[location].undo;
    }

    redo() {
        this._stepForward();
        return this.points[location].redo;
    }

    addPoint(point) {
        point.index = this.index;
        this.points.push(point);
        this.index++;
    }

    _stepBack() {
        if (this.location > 0) this.location -= 1;
    }

    _stepForward() {
        if (this.location < this.points.length) this.location += 1;
    }
}

class Point {
    constructor(undo, redo) {
        this.undo = undo;
        this.redo = redo;
        this.index;
    }

    setUndo(undo) {
        this.undo = undo;
    }

    setRedo(redo) {
        this.redo = redo;
    }
}

export {
    setup as timelineSetup,
    timeline
}