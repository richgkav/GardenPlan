import {clearChildElements} from './tools';

export class Editor {
    constructor(element) {
        this.fields = [];
        this.element = document.getElementById(element);     // ref to parent DOM element
    }

    addField() {
        for (let i = 0; i != arguments.length; i++) {
            arguments[i].element = this.element;
            this.fields.push(arguments[i]);
        }

        this.fields.forEach(el => {
            console.log(el.element)
        });
    }

    // renders the edit fields under the DOM parent element
    renderFields() {
        this.fields.forEach(field => {
            this.element.appendChild(field.createDiv());
        });
    }

    deleteFields() {
        clearChildElements(this.element);
        this.fields = [];
    }

    // when a shape is selected it is stored in transformer.nodes() the node is 
    // passed in this method
    createShapeEditor(node) {

    }

}

export class Field {
    constructor(title, property) {
        this.title = title;         // field name (shape property name)
        this.property = property;   // ref to shape property this maps to
        this.element = undefined;   // ref to the parent DOM element
    }

    createDiv() {
        const edItemdiv = document.createElement('div');
        edItemdiv.classList.add('edit-item');
        this.element.appendChild(edItemdiv);

        // edit field inner divs
        const itmTitDiv = document.createElement('div');
        itmTitDiv.innerText = this.title;
        edItemdiv.appendChild(itmTitDiv);
        const itmPropdiv = document.createElement('div');
        itmPropdiv.innerText = this.property; // needs to display shape field value
        edItemdiv.appendChild(itmPropdiv);
        return edItemdiv;
    }
}