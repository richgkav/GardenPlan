import "./styles.css";
import { menuSetup } from "./menu";
import { kmanSetup } from './konva-man';
import { timelineSetup } from "./Timeline";

const gardenPlan = function() {
    kmanSetup();
    timelineSetup();
    menuSetup();
};

export {gardenPlan}

window.onload = gardenPlan;
