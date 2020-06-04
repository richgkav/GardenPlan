import "./styles.css";
import "./two";
import { createMenu } from "./menu";

const gardenPlan = function() {

    const drawArea = document.getElementById('draw-area');
    const twoXdim = drawArea.offsetWidth;
    const twoYdim = drawArea.offsetHeight;

    const params = {
        width: twoXdim,
        height: twoYdim
    };

    const two = new Two(params).appendTo(drawArea);

    const circ = two.makeCircle(100, 100, 50);

    two.update();
    
    const menu = createMenu();
    menu.renderItems('menu-area');

};

window.onload = gardenPlan;
