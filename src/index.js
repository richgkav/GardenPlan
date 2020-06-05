import "./styles.css";
import "./two";
import { Menu } from "./menu";
import { AllShapes } from "./shapes";

const gardenPlan = function() {

// -------------------------------------------------------------------------- //
    const drawArea = document.getElementById('draw-area');
    const twoXdim = drawArea.offsetWidth;
    const twoYdim = drawArea.offsetHeight;

    const params = {
        width: twoXdim,
        height: twoYdim
    };

    const two = new Two(params).appendTo(drawArea);

    const circ0 = two.makeCircle(100, 100, 50);
    const circ1 = two.makeCircle(200, 100, 50);

    two.update();

    const allShapes = new AllShapes();
    allShapes.addShape(circ0);
    allShapes.addShape(circ1);

    console.log(allShapes);
// -------------------------------------------------------------------------- //

    const menu = new Menu();

    menu.addItem('Select','menu-item','menu-select', 10);
    menu.addItem('Box','menu-item','menu-box', 20);
    menu.addItem('Circle','menu-item','menu-circle', 30);
    menu.renderItems('menu-area');
 
    const elMenuSel = document.getElementById('menu-select');
    elMenuSel.addEventListener('click', (event) => {
        menu.selectItem(elMenuSel);   
    });

    const elMenuBox = document.getElementById('menu-box');
    elMenuBox.addEventListener('click', (event) => {
        menu.selectItem(elMenuBox);   
    });

    const elMenuCircle = document.getElementById('menu-circle');
    elMenuCircle.addEventListener('click', (event) => {
        menu.selectItem(elMenuCircle);   
    });


};

window.onload = gardenPlan;
