import Konva from 'konva';

export const layer = new Konva.Layer();
export let stage = undefined;
export const transformer = new Konva.Transformer();

export const kMan = (function konvaManager() {

    function setup() {
        console.log('kMan setup called');
        const drawArea = document.getElementById('draw-area');
        const xDim = drawArea.offsetWidth-2;
        const yDim = drawArea.offsetHeight;

        stage = new Konva.Stage({
            container: drawArea,
            width: xDim,
            height: yDim
        });

        stage.add(layer);
        layer.draw();
        layer.add(transformer);
    
        // -------------------------------------------------------------------------- //
        // clicks should select/deselect shapes
        stage.on('click tap', function (e) {
    
            // if click on empty area - remove all selections
            if (e.target === stage) {
                transformer.nodes([]);
                layer.draw();
                return;
            }
    
            /*
            // do nothing if clicked NOT on our rectangles
            if (!e.target.hasName('rect')) {
                return;
            }
            */
    
            // do we pressed shift or ctrl?
            const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
            const isSelected = transformer.nodes().indexOf(e.target) >= 0;
    
            if (!metaPressed && !isSelected) {
                // if no key pressed and the node is not selected
                // select just one
                transformer.nodes([e.target]);
            } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected
                // we need to remove it from selection:
                const nodes = transformer.nodes().slice(); // use slice to have new copy of array
                // remove node from array
                nodes.splice(nodes.indexOf(e.target), 1);
                transformer.nodes(nodes);
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = transformer.nodes().concat([e.target]);
                transformer.nodes(nodes);
            }
            layer.draw();
        });
    }

    return {setup}

})();