var mod = { 
    canvas: require('./canvas/canvas.js'), 
    point: require('./point/point.js'), 
    poly: require('./poly/poly.js'), 
    block: require('./block/block.js'), 
    part: require('./part/part.js'),
    link: require('./link/link.js'),
    controller: require('./controller/controller.js'), 
    state: require('./state/state.js')
};

var draw = (canvas, polys) => {
    mod.canvas.clear(canvas);
    mod.canvas.draw(canvas, polys);
};

var loop = (state) => {
    mod.canvas.fullscreen(state.canvas);

    var update = () => {
        state.controller.process(state.parts[0]);

        var polys = state.parts.slice().reduce((acc, v) => {
            acc.push(v.block.poly);
            return acc;
        }, []);

        draw(state.canvas, polys);
    };

    window.setInterval(update, state.ms_per_update);
};

var start = () => {
    var canvas = mod.canvas.create();
    mod.canvas.events.resize.create(canvas, mod.canvas.fullscreen);

    var poly = mod.poly.create([ 
        mod.point.create(50, 50), 
        mod.point.create(100, 50),
        mod.point.create(100, 100),
        mod.point.create(50, 100)
    ]);
    var center = mod.point.create(75, 75);
    var block = mod.block.create(poly, center, 0);

    var poly_linked = mod.poly.create([
        mod.point.create(50, 50), 
        mod.point.create(100, 50),
        mod.point.create(100, 100),
        mod.point.create(50, 100)
    ]);
    mod.poly.translate(poly_linked, 100, 0);
    var center_linked = mod.point.create(175, 75);
    var block_linked = mod.block.create(poly_linked, center_linked, 0);
    var link_linked = mod.link.create(null, mod.point.create(175, 75), 0);
    var part_linked = mod.part.create(block_linked, [link_linked]);

    var link = mod.link.create(part_linked, mod.point.create(100, 75), 0);
    var part = mod.part.create(block, [link]);

    var keys = ['a', 'mouse_pressed'];
    var action = (part) => {
        mod.part.translate(part, 1, 1);
    };
    var binding = mod.controller.binding.create(keys, action);
    var handler = mod.controller.handler.create();
    var controller = mod.controller.create([binding], handler);

    var state = mod.state.create( 
        canvas, 
        [part, part_linked], 
        controller, 
        30);

    loop(state);
};

module.exports = { start: start };
