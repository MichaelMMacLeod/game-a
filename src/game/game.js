var mod = { 
    canvas: require('./canvas/canvas.js'), 
    point: require('./point/point.js'), 
    poly: require('./poly/poly.js'), 
    block: require('./block/block.js'), 
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
        state.controller.process(state.blocks[0]);

        var polys = state.blocks.slice().reduce((acc, v) => {
            acc.push(v.poly);
            return acc;
        }, []);

        draw(state.canvas, polys);
    };

    window.setInterval(update, state.ms_per_update);
};

var start = () => {
    var canvas = mod.canvas.create();
    mod.canvas.events.resize.create(canvas, mod.canvas.fullscreen);

    var poly = mod.poly.create(
        [ mod.point.create(50, 50)
            , mod.point.create(100, 50)
            , mod.point.create(100, 100)
            , mod.point.create(50, 100)
        ]);
    var center = mod.point.create(75, 75);
    var block = mod.block.create(poly, center, 0);

    var keys = ['a', 'mouse_pressed'];
    var action = (block) => {
        mod.block.rotate(block, 0.05, 300, 300);
    };
    var binding = mod.controller.binding.create(keys, action);
    var handler = mod.controller.handler.create();
    var controller = mod.controller.create([binding], handler);

    var state = mod.state.create( 
        canvas, 
        [block], 
        controller, 
        30);

    loop(state);
};

module.exports = { start: start };
