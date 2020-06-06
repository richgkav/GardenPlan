import "./styles.css";
import {Menu} from "./menu";
import Konva from 'konva';
import {kMan, layer, stage, transformer} from './konva-manager';

window.onload = gardenPlan;

function gardenPlan() {

// -------------------------------------------------------------------------- //
// Initialise 2d drawing library

    console.log('index called');
    kMan.setup();

    console.log(`stage = ${stage}`); // undefined


// -------------------------------------------------------------------------- //
// Initialise shape manager (library <> shape manager <> app) 

    // const allShapes = new AllShapes();
    //allShapes.addShape(circ0);
    //allShapes.addShape(circ1);

    //console.log(allShapes);
// -------------------------------------------------------------------------- //

    const state = {
        mode: 'none',
        current: null,      // current shape
    };


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
        transformer.nodes([rect]);

        layer.draw();
    });

    const elMenuCircle = document.getElementById('menu-circle');
    elMenuCircle.addEventListener('click', (event) => {
        menu.selectItem(elMenuCircle);   
    });


};
