import * as Kman from './konva-man';

export function setup() {
    const rec1 = new Konva.Rect({
        x: 100,
        y: Kman.stage.height() / 2,
        width: 100,
        height: 100,
        fill: 'white',
    });

    const rec2 = new Konva.Rect({
        x: 300,
        y: Kman.stage.height() / 2,
        width: 100,
        height: 100,
        fill: 'red',
    });

    const rec3 = new Konva.Rect({
        x: 500,
        y: Kman.stage.height() / 2,
        width: 100,
        height: 100,
        fill: 'green',
    });

    moreSettingUp(rec1);
    moreSettingUp(rec2);
    moreSettingUp(rec3);

    Kman.layer.draw();
}

function moreSettingUp(node) {
    node.id(Kman.createId());
    Kman.setOffsetCenter(node);
    Kman.createNodeEvents(node);
    Kman.layer.add(node);
}
