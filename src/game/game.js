var mod = { 
    canvas: require('./canvas/canvas.js'), 
    point: require('./point/point.js'), 
    poly: require('./poly/poly.js'), 
    block: require('./block/block.js'), 
    part: require('./part/part.js'),
    link: require('./link/link.js'),
    controller: require('./controller/controller.js'), 
    state: require('./state/state.js'),
    camera: require('./camera/camera.js')
};

var loop = (state) => {
    mod.canvas.fullscreen(state.camera.canvas);

    var update = () => {
        mod.controller.process(state.controller, state);

        var blocks = state.parts.slice().reduce((acc, v) => {
            acc.push(v.block);
            return acc;
        }, []);

        mod.camera.draw(state.camera, blocks);
    };

    window.setInterval(update, state.ms_per_update);
};

var start = () => {
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

    var poly_extra = mod.poly.create([
        mod.point.create(50, 50), 
        mod.point.create(100, 50),
        mod.point.create(100, 100),
        mod.point.create(50, 100)
    ]);
    var center_extra = mod.point.create(75, 75);
    var block_extra = mod.block.create(poly_extra, center_extra, 0);
    var part_extra = mod.part.create(block_extra, mod.point.create(0,0), []);

    mod.part.translate(part_extra, 100, 100);

    mod.poly.translate(poly_linked, 100, 0);
    var center_linked = mod.point.create(175, 75);
    var block_linked = mod.block.create(poly_linked, center_linked, 0);
    var link_linked = mod.link.create(null, mod.point.create(175, 75), 0);
    var part_linked = mod.part.create(block_linked, mod.point.create(0,0), [link_linked]);

    var link = mod.link.create(part_linked, mod.point.create(100, 75), 0);
    var part = mod.part.create(block, mod.point.create(0,0), [link]);

    var move = mod.controller.binding.create(
        ['w'],
        (state) => {
            var part = state.parts[0];

            var s = Math.sin(part.block.rotation);
            var c = Math.cos(part.block.rotation);

            mod.part.translate(part, s, c);
        });

    var rotate_clockwise = mod.controller.binding.create(
        ['a'],
        (state) => {
            mod.part.rotate(
                state.parts[0],
                0.05,
                state.parts[0].block.center.x,
                state.parts[0].block.center.y);
        });

    var rotate_counter_clockwise = mod.controller.binding.create(
        ['d'],
        (state) => {
            mod.part.rotate(
                state.parts[0],
                -0.05,
                state.parts[0].block.center.x,
                state.parts[0].block.center.y);
        });

    var controller = mod.controller.create([
        move,
        rotate_counter_clockwise,
        rotate_clockwise
    ]);

    var canvas = mod.canvas.create();
    mod.canvas.events.resize.create(canvas, mod.canvas.fullscreen);

    var camera = mod.camera.create(canvas, part.block.center, 2.0);

    var state = mod.state.create( 
        camera, 
        [part, part_linked, part_extra], 
        controller, 
        30);

    loop(state);
};

module.exports = { start: start };
