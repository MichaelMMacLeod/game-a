'use strict';

var main = {};

main.canvas = {};
main.canvas.events = {};
main.point = {};
main.poly = {};
main.block = {};
main.state = {};
main.game = {};
main.game.events = {}; 

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

/////////////////////////////////////////////////
// @block
/////////////////////////////////////////////////

main.block.create = (poly, center_point) => {
    return {
        poly: poly,
        center: center_point
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
    keyhandler, 
    mousehandler, 
    ms_per_update
) => {
    state_object.canvas = canvas;
    state_object.polys = polys;
    state_object.keyhandler = keyhandler;
    state_object.mousehandler = mousehandler;
    state_object.ms_per_update = ms_per_update;
};

/////////////////////////////////////////////////
// @game.events
/////////////////////////////////////////////////

main.game.events.keyhandler = () => {
    var keys = [];

    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    return keys;
};

main.game.events.mousehandler = () => {
    var mouse = {
        point: main.point.create(0, 0),
        pressed: false
    };

    window.addEventListener('mousemove', (e) => {
        mouse.point.x = e.clientX;
        mouse.point.y = e.clientY;
    });

    window.addEventListener('mousedown', () => {
        mouse.pressed = true;
    });

    window.addEventListener('mouseup', () => {
        mouse.pressed = false;
    });

    return mouse;
};

/////////////////////////////////////////////////
// @game
/////////////////////////////////////////////////

main.game.draw = (state) => {
    main.canvas.draw(state.canvas, state.polys);
};

main.game.loop = (state) => {
    main.canvas.fullscreen(state.canvas);

    var loop = () => {
        main.game.draw(state);
    };

    window.setInterval(loop, state.ms_per_update);
};

main.game.start = () => {
    var canvas = main.canvas.create();
    main.canvas.events.size(canvas);

    var keyhandler = main.game.events.keyhandler();
    var mousehandler = main.game.events.mousehandler();

    main.game.state = {};
    main.state.create(
        main.game.state, 
        canvas, 
        [], 
        keyhandler, 
        mousehandler, 
        30);

    main.game.loop(main.game.state);
};

window.onload = main.game.start;
