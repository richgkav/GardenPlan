import "./styles.css";
import * as Menu from "./menu";
import * as Kman from './konva-man';
import * as Test from './test-items';

const gardenPlan = function() {
    Kman.setup();
    Menu.setup();
    Test.setup();
};

export { gardenPlan }

window.onload = gardenPlan;
