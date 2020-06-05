import "./styles.css";
import { Menu } from "./menu";
import { AllShapes } from "./shapes";
import Konva from 'konva';

const gardenPlan = function() {

// -------------------------------------------------------------------------- //
// Initialise 2d drawing library

    const drawArea = document.getElementById('draw-area');
    const xDim = drawArea.offsetWidth-2;
    const yDim = drawArea.offsetHeight;

    var stage = new Konva.Stage({
        container: drawArea,   // id of container <div>
        width: xDim,
        height: yDim
    });
      
    // then create a layer
    var layer = new Konva.Layer();

    // add the layer to the stage
    stage.add(layer);
/*
      // create our shape
    var circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
    });
    
    // add the shape to the layer
    layer.add(circle);
    // draw the image
*/
    layer.draw();

    const state = {
        mode: 'none',
        current: null,      // current shape
    };

    var tr = new Konva.Transformer();
    layer.add(tr);

    // -------------------------------------------------------------------------- //
    // clicks should select/deselect shapes
    stage.on('click tap', function (e) {

        // if click on empty area - remove all selections
        if (e.target === stage) {
            tr.nodes([]);
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
        const isSelected = tr.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            tr.nodes([e.target]);
        } else if (metaPressed && isSelected) {
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            const nodes = tr.nodes().slice(); // use slice to have new copy of array
            // remove node from array
            nodes.splice(nodes.indexOf(e.target), 1);
            tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
            // add the node into selection
            const nodes = tr.nodes().concat([e.target]);
            tr.nodes(nodes);
        }
        layer.draw();

    });

// -------------------------------------------------------------------------- //
// Initialise shape manager (library <> shape manager <> app) 

    // const allShapes = new AllShapes();
    //allShapes.addShape(circ0);
    //allShapes.addShape(circ1);

    //console.log(allShapes);
// -------------------------------------------------------------------------- //
    const menu = new Menu();

    menu.addItem('Select','menu-item','menu-select', 10);
    menu.addItem('Rectangle','menu-item','menu-rect', 20);
    menu.addItem('Circle','menu-item','menu-circle', 30);
    menu.renderItems('menu-buttons');
 
    const elMenuSel = document.getElementById('menu-select');
    elMenuSel.addEventListener('click', (event) => {
        menu.selectItem(elMenuSel);

    });

    const elMenuBox = document.getElementById('menu-rect');
    elMenuBox.addEventListener('click', (event) => {
        menu.selectItem(elMenuBox);
        state.mode = 'rect';
        const rect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: 100,
            height: 100,
            fill: 'red',
            stroke: 'blue',
            strokeWidth: 2,
            draggable: true
        });

        state.current = rect;
        layer.add(rect);

        // add the new shape the the transformer
        tr.nodes([rect]);

        layer.draw();
    });

    const elMenuCircle = document.getElementById('menu-circle');
    elMenuCircle.addEventListener('click', (event) => {
        menu.selectItem(elMenuCircle);   
    });


};

window.onload = gardenPlan;
