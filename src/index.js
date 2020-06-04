import "./styles.css";
import "./two";
import { Menu } from "./objects";

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

    const menu = new Menu();
    menu.addItem('Box','menu-item','menu-box', 10);
    menu.renderItems('menu-area');
    
    document.getElementById('menu-box').addEventListener('click', (event) => {
        console.log('box');
    });
};

window.onload = gardenPlan;
