import {clearChildElements} from './tools';

// An editor gets created and the fields added when an object is selected.
// when the object is uselected it is deleted

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

}

export class Field {
    constructor(title, property, divId) {
        this.title = title;         // field name (shape property name)
        this.property = property;   // ref to shape property this maps to
        this.element = undefined;   // ref to the parent DOM element
        this.divId = divId;
    }

    createDiv() {
        const edItemdiv = document.createElement('div');
        edItemdiv.classList.add('edit-item');
        this.element.appendChild(edItemdiv);

        // edit field inner divs
        const itmTitDiv = document.createElement('div');
        itmTitDiv.innerText = this.title;
        itmTitDiv.classList.add('edit-title');
        edItemdiv.appendChild(itmTitDiv);
        const itmPropDiv = document.createElement('div');
        const prop = this.property;
        if (isNaN(prop)){
            itmPropDiv.innerText = prop;
        }
        else {
            itmPropDiv.innerText = prop.toFixed(2);
        }
        itmPropDiv.id = this.divId;
        itmPropDiv.classList.add('edit-prop');
        edItemdiv.appendChild(itmPropDiv);
        edItemdiv.addEventListener('click', () => {
            console.log(itmTitDiv.innerText);
        });
        return edItemdiv;
    }
}
