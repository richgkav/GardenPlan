import Konva from 'konva';
import {Field, Editor} from './editor';

export const layer = new Konva.Layer();
export let stage = undefined;
export const transformer = new Konva.Transformer();

export const kMan = (function konvaManager() {

    let editor = undefined;

    // not possible to return variables ???

    function returnEditor() {
        return editor;
    }

    function setup() {

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
                transformer.nodes([e.target]);
                e.target.draggable(true);

                // >> setup editor with values from this shape <<
                const fieldX = new Field('x', e.target.x());
                const fieldY = new Field('y', e.target.y());
                editor.addField(fieldX);
                editor.addField(fieldY);
                editor.renderFields();

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
            }

            layer.draw();
        });
    }

    function clearTransformer() {
        if (transformer.nodes()){
            transformer.nodes().forEach(node => {
                node.draggable(false);
                updateXYsize(node);
            })
        }
        transformer.nodes([]);
    }

    function updateXYsize(node) {
        node.width(node.width() * node.scaleX());
        node.height(node.height() * node.scaleY());
        node.scaleX(1);
        node.scaleY(1);
    }

    return {
        setup,
        clearTransformer,
        returnEditor,
        editor
    }

})();
