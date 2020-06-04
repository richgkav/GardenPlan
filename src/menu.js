import {Menu, MenuItem} from './objects';

export const createMenu = function() {
    const menu = new Menu();
    const dBox = menu.addItem('Box','menu-item','menu-box', 10);

    dBox.div.addEventListener('click', (event) => {
        console.log('box');
    });

    return menu;
}
