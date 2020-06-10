import "./styles.css";
import {Menu, setup_menu} from "./menu";
import {kman_setup} from './konva-man';
import {Timeline} from './Timeline';

const gardenPlan = function() {

// -------------------------------------------------------------------------- //
// Initialise 2d drawing library

    kman_setup();
  
    const menu = new Menu();
    setup_menu(menu);
    
};

export {gardenPlan}

window.onload = gardenPlan;
