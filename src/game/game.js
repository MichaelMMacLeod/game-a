var mod = { 
    canvas: require('./canvas/canvas.js'), 
    point: require('./point/point.js'), 
    poly: require('./poly/poly.js'), 
    block: require('./block/block.js'), 
    part: require('./part/part.js'),
    link: require('./link/link.js'),
    controller: require('./controller/controller.js'), 
    state: require('./state/state.js'),
    camera: require('./camera/camera.js'),
    templates: require('./templates/templates.js'),
    update: require('./update/update.js'),
    player: require('./player/player.js')
};

var loop = (state) => {
    mod.canvas.fullscreen(state.camera.canvas);
    window.setInterval(mod.update.create(state), state.ms_per_update);
};

var start = () => {
    var part1 = mod.templates.part.make_square(50, 0, 0, 0);
    var part2 = mod.templates.part.make_square(25, 52, 0, 0);
    var part3 = mod.templates.part.make_square(10, 200, 200, 0);
    var part4 = mod.templates.part.make_square(25, -52, 0, 0);
    part1.links[0].part = part2;
    part1.links[2].part = part4;

    var player = mod.player.create(part1, mod.point.create(0, 0));

    var move = mod.controller.binding.create(
        ['w'],
        (state) => {
            var r = state.player.part.block.rotation;

            state.player.vector.x += 0.5 * Math.sin(r);
            state.player.vector.y += 0.5 * Math.cos(r);
        });

    var rotate_clockwise = mod.controller.binding.create(
        ['a'],
        (state) => {
            mod.part.rotate(
                state.player.part,
                0.05,
                state.player.part.block.center.x,
                state.player.part.block.center.y);
        });

    var rotate_counter_clockwise = mod.controller.binding.create(
        ['d'],
        (state) => {
            mod.part.rotate(
                state.player.part,
                -0.05,
                state.player.part.block.center.x,
                state.player.part.block.center.y);
        });

    var controller = mod.controller.create([
        move,
        rotate_counter_clockwise,
        rotate_clockwise
    ]);

    var canvas = mod.canvas.create();
    mod.canvas.events.resize.create(canvas, mod.canvas.fullscreen);

    var camera = mod.camera.create(canvas, part3.block.center, 1.0);

    var state = mod.state.create( 
        camera, 
        player,
        [part1, part2, part3, part4], 
        controller, 
        30);

    loop(state);
};

module.exports = { start: start };
