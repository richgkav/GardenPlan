import "./styles.css";
import { setup_menu } from "./menu";
import * as Kman from './konva-man';
import { setup_actionEvents } from "./undo-redo";

const gardenPlan = function() {
    Kman.setup();
    setup_actionEvents();
    setup_menu();
};

export { gardenPlan }

window.onload = gardenPlan;
