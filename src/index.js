import "./styles.css";
import {Menu} from "./menu";
import Konva from 'konva';
import {kMan, layer, stage, clearTransformer} from './konva-manager';
import {Editor, Field} from './editor';

window.onload = gardenPlan;

function gardenPlan() {

// -------------------------------------------------------------------------- //
// Initialise 2d drawing library

    const editor = new Editor('edit-area');
    kMan.setup(editor);

// -------------------------------------------------------------------------- //

    const state = {
        mode: 'none',
        current: null,      // current shape
    };
    
    const menu = new Menu();

    //menu.addItem('Select','menu-item','menu-select', 10);
    menu.addItem('Rectangle','menu-item','menu-rect', 20);
    menu.addItem('Circle','menu-item','menu-circle', 30);
    menu.renderItems('menu-buttons');

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
            strokeWidth: 2,
        });

        state.current = rect;
        layer.add(rect);
        kMan.clearTransformer(); // unselect and unmove everything
        layer.draw();
    });

    const elMenuCircle = document.getElementById('menu-circle');
    elMenuCircle.addEventListener('click', (event) => {
        menu.selectItem(elMenuCircle);   
    });

};

export {gardenPlan}