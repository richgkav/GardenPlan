import "./styles.css";
import {Menu} from "./menu";
import Konva from 'konva';
import {kMan, layer, stage} from './konva-manager';

window.onload = gardenPlan;

function gardenPlan() {

// -------------------------------------------------------------------------- //
// Initialise 2d drawing library

    kMan.setup();

    console.log(kMan.returnEditor());
    console.log(kMan.editor);
  
    const menu = new Menu();

    menu.addItem('Rectangle','menu-item','menu-rect', 20);
    menu.addItem('Circle','menu-item','menu-circle', 30);
    menu.renderItems('menu-buttons');

    const elMenuBox = document.getElementById('menu-rect');
    elMenuBox.addEventListener('click', (event) => {
        menu.selectItem(elMenuBox);

        const rect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: 100,
            height: 100,
            fill: 'red',
            strokeWidth: 2,
        });

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