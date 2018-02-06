var mod = {
    block: require('../block/block.js'),
    canvas: require('../canvas/canvas.js')
};

var create = (canvas, focus, width, height, zoom) => {
    return {
        canvas: canvas,
        focus: focus,
        width: width,
        height: height,
        zoom: zoom
    };
};

var draw = (camera, blocks) => {
    var c = [];

    for (let i = 0; i < blocks.length; i++) {
        var b = mod.block.copy(blocks[i]);

        mod.block.translate(
            b,
            -camera.focus.x + camera.canvas.width / 2,
            -camera.focus.y + camera.canvas.height / 2);

        c[i] = b.poly;
    }

    mod.canvas.clear(camera.canvas);
    mod.canvas.draw(camera.canvas, c);
};

module.exports = {
    create: create,
    draw: draw
};
