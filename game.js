'use strict';

var main = {};

main.canvas = {};
main.canvas.events = {};
main.point = {};
main.poly = {};
main.block = {};
main.controller = {};
main.controller.binding = {};
main.controller.handler = {};
main.state = {};
main.game = {};
main.game.events = {}; 
main.game.events.keyhandler = {};
main.game.events.mousehandler = {};

/////////////////////////////////////////////////
// @point
/////////////////////////////////////////////////

main.point.create = (x, y) => {
    return { 
        x: x, 
        y: y 
    };
};

main.point.translate = (point, dx, dy) => {
    point.x += dx;
    point.y += dy;
};

main.point.move_to = (point, x, y) => {
    point.x = x;
    point.y = y;
};

main.point.rotate = (point, angle, x, y) => {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    main.point.translate(point, -x, -y);

    var rx = point.x * cos - point.y * sin;
    var ry = point.x * sin + point.y * cos;

    point.x = rx;
    point.y = ry;

    main.point.translate(point, x, y);
};

/////////////////////////////////////////////////
// @poly
/////////////////////////////////////////////////

main.poly.create = (points) => {
    return {
        points: points
    };
};

main.poly.translate = (poly, dx, dy) => {
    poly.points.forEach((point) => {
        main.point.translate(point, dx, dy);
    });
};

main.poly.rotate = (poly, angle, x, y) => {
    poly.points.forEach((point) => {
        main.point.rotate(point, angle, x, y);
    });
};

/////////////////////////////////////////////////
// @block
/////////////////////////////////////////////////

main.block.create = (poly, center_point, rotation) => {
    return {
        poly: poly,
        center: center_point,
        rotation
    };
};

main.block.translate = (block, dx, dy) => {
    main.poly.translate(block.poly, dx, dy);
    main.point.translate(block.center, dx, dy);
};

main.block.move_to = (block, x, y) => {
    var dx = x - block.center.x;
    var dy = y - block.center.y;

    main.block.translate(block, dx, dy);
};

main.block.rotate = (block, rotation, x, y) => {
    block.rotation += rotation;
    
    main.poly.rotate(block.poly, rotation, x, y);
    main.point.rotate(block.center, rotation, x, y);
};

/////////////////////////////////////////////////
// @controller.binding
/////////////////////////////////////////////////

main.controller.binding.create = (keys, action) => {
    return {
        keys: keys,
        action: action
    };
};

/////////////////////////////////////////////////
// @controller.handler
/////////////////////////////////////////////////

main.controller.handler.create = () => {
    var handler = {};

    var keyhandler = main.game.events.keyhandler.create(handler);
    var mousehandler = main.game.events.mousehandler.create(handler);

    return handler;
};

/////////////////////////////////////////////////
// @controller
/////////////////////////////////////////////////

main.controller.create = (bindings, handler) => {
    var controller = {};

    controller.process = (state) => {
        bindings.forEach((binding) => {
            var run_action = true;

            binding.keys.forEach((key) => {
                if (!handler[key]) {
                    run_action = false;
                    return;
                }
            });

            if (run_action) {
                binding.action(state);
            }
        });
    };

    return controller;
};

/////////////////////////////////////////////////
// @canvas.events
/////////////////////////////////////////////////

main.canvas.events.size = (canvas) => {
    window.addEventListener('resize', () => main.canvas.fullscreen(canvas));
};

/////////////////////////////////////////////////
// @canvas
/////////////////////////////////////////////////

main.canvas.create = () => {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    return canvas;
};

main.canvas.resize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
};

main.canvas.fullscreen = (canvas) => {
    main.canvas.resize(canvas, window.innerWidth, window.innerHeight);
};

main.canvas.clear = (canvas) => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
};

main.canvas.draw = (canvas, polys) => {
    var c = canvas.getContext('2d');

    polys.forEach((poly) => {
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.moveTo(poly.points[0].x, poly.points[0].y);

        for (let i = 1; i < poly.points.length; i++) {
            var point = poly.points[i];
            c.lineTo(point.x, point.y);
        }

        c.closePath();
        c.fill();
    });
};

/////////////////////////////////////////////////
// @state
/////////////////////////////////////////////////

main.state.create = (
    state_object, 
    canvas, 
    polys, 
    controllers,
    ms_per_update
) => {
    state_object.canvas = canvas;
    state_object.polys = polys;
    state_object.controllers = controllers;
    state_object.ms_per_update = ms_per_update;
};

/////////////////////////////////////////////////
// @game.events
/////////////////////////////////////////////////

main.game.events.keyhandler.create = (handler) => {
    window.addEventListener('keydown', (e) => {
        handler[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        handler[e.key] = false;
    });
};

main.game.events.mousehandler.create = (handler) => {
    handler['mouse_x'] = 0;
    handler['mouse_y'] = 0;
    handler['mouse_pressed'] = false;

    window.addEventListener('mousemove', (e) => {
        handler['mouse_x'] = e.clientX;
        handler['mouse_y'] = e.clientY;
    });

    window.addEventListener('mousedown', () => {
        handler['mouse_pressed'] = true;
    });

    window.addEventListener('mouseup', () => {
        handler['mouse_pressed'] = false;
    });
};

/////////////////////////////////////////////////
// @game
/////////////////////////////////////////////////

main.game.draw = (state) => {
    main.canvas.clear(state.canvas);
    main.canvas.draw(state.canvas, state.polys);
};

main.game.loop = (state) => {
    main.canvas.fullscreen(state.canvas);

    var loop = () => {
        state.controllers.forEach((controller) => {
            controller.process(state);
        });

        //main.poly.rotate(state.polys[0], 0.01, 300, 300);

        main.game.draw(state);
    };

    window.setInterval(loop, state.ms_per_update);
};

main.game.start = () => {
    var canvas = main.canvas.create();
    main.canvas.events.size(canvas);

    var poly = main.poly.create([
        main.point.create(50, 50),
        main.point.create(100, 50),
        main.point.create(100, 100),
        main.point.create(50, 100)
    ]);

    var keys = ['a', 'mouse_pressed'];
    var action = (state) => {
        main.poly.rotate(state.polys[0], 0.05, 300, 300);
    };

    var binding = main.controller.binding.create(keys, action);

    var handler = main.controller.handler.create();

    var controller = main.controller.create([binding], handler);
    
    main.game.state = {};
    main.state.create(
        main.game.state, 
        canvas, 
        [poly], 
        [controller],
        30);

    main.game.loop(main.game.state);
};

window.onload = main.game.start;
