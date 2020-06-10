import Konva from 'konva';
import {Field, Editor} from './editor';

const layer = new Konva.Layer();
let stage = undefined;
const transformer = new Konva.Transformer();

let editor = undefined;

function setup() {

    //console.log('setup called');

    const drawArea = document.getElementById('draw-area');
    const xDim = drawArea.offsetWidth-2;
    const yDim = drawArea.offsetHeight;
    editor = new Editor('edit-area');

    stage = new Konva.Stage({
        container: drawArea,
        width: xDim,
        height: yDim
    });

    stage.add(layer);
    layer.draw();
    layer.add(transformer);

    // -------------------------------------------------------------------------- //
    // Shape selecting and transformer

    stage.on('click tap', function (e) {

        // if click on empty area - remove all selections
        if (e.target === stage) {

            clearTransformer();
            editor.deleteFields();

            layer.draw();
            return;
        }

        // shift or ctrl pressed
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        let isSelected = undefined;

        if (transformer.nodes()) {
            isSelected = transformer.nodes().indexOf(e.target) >= 0;
        }

        if (!metaPressed && !isSelected) {

            // No key pressed and the node not selected then select only one

            clearTransformer();
            editor.deleteFields();

            transformer.nodes([e.target]);
            e.target.draggable(true);
            renderEditorFields(e);

        } else if (metaPressed && isSelected) {

            e.target.draggable(false);

            // Keys pressed and node already selected then remove from selection  

            const nodes = transformer.nodes().slice();  // copy array
            nodes.splice(nodes.indexOf(e.target), 1);   // remove node
            transformer.nodes(nodes);                   // set to copied array

        } else if (metaPressed && !isSelected) {

            // add the node into selection

            const nodes = transformer.nodes().concat([e.target]);
            transformer.nodes(nodes);
            e.target.draggable(true);
            editor.deleteFields();
        }

        layer.draw();
    });
}

// populates the editor div with fields from the currently selected shape
// 

function renderEditorFields(event) {
    // event.target.className is the shape name
    const fieldX = new Field('x', event.target.x(), 'edit-x');
    const fieldY = new Field('y', event.target.y(), 'edit-y');
    const fieldR = new Field('r', event.target.rotation(), 'edit-rot');
    editor.addField(fieldX);
    editor.addField(fieldY);
    editor.addField(fieldR);
    editor.renderFields();
}

// clear all shapes from the edit mode

export function clearTransformer() {
    if (transformer.nodes()){
        transformer.nodes().forEach(node => {
            node.draggable(false);
            updateXYsize(node);
        })
    }
    transformer.nodes([]);
}

// when stretched and unselected convert scale to size
function updateXYsize(node) {
    node.width(node.width() * node.scaleX());
    node.height(node.height() * node.scaleY());
    node.scaleX(1);
    node.scaleY(1);
    node.offsetX(node.width()/2);
    node.offsetY(node.height()/2);
}

export {
    layer as kman_layer,
    stage as kman_stage,
    transformer as kman_trans,
    setup as kman_setup,
    clearTransformer as kman_clear
}