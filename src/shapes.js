// to keep track of shapes in drawing area

export class AllShapes {
    constructor() {
        this.shapes = [];
    }

    addShape(twoShape) {
        this.shapes.push(new Shape(twoShape));
    }
}

class Shape {
    constructor(twoShape) {
        this.twoShape = twoShape;
        this.id = twoShape.id;
    }
}