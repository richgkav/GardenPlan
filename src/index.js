import "./styles.css";
import { setup_menu } from "./menu";
import { setup_Konva } from './konva-man';
import { setup_actionEvents } from "./undo-redo";

const gardenPlan = function() {
    setup_Konva();
    setup_actionEvents();
    setup_menu();
};

export { gardenPlan }

window.onload = gardenPlan;
