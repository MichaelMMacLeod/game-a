'use strict';

var main = {};

main.canvas = {};
main.canvas.events = {};
main.point = {};
main.poly = {};
main.state = {};
main.game = {};
main.game.events = {}; 
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

main.canvas.events.size = (canvas) => {
    window.addEventListener('resize', () => main.canvas.fullscreen(canvas));
};

main.point.create = (x, y) => {
    return { 
        x: x, 
        y: y 
    };
};

main.poly.create = (points) => {
    return {
        points: points
    };
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

main.state.create = (state_object, canvas, polys, keyhandler, mousehandler) => {
    state_object.canvas = canvas;
    state_object.polys = polys;
    state_object.keyhandler = keyhandler;
    state_object.mousehandler = mousehandler;
};

main.game.draw = (state) => {
    main.canvas.draw(state.canvas, state.polys);
};

main.game.loop = (state, ms_per_update) => {
    main.canvas.fullscreen(state.canvas);

    var loop = () => {
        main.game.draw(state);
    };

    window.setInterval(loop, ms_per_update);
};

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
        x: 0,
        y: 0
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    return mouse;
}

main.game.start = () => {
    var canvas = main.canvas.create();
    main.canvas.events.size(canvas);

    var keyhandler = main.game.events.keyhandler();
    var mousehandler = main.game.events.mousehandler();

    main.game.state = {};
    main.state.create(main.game.state, canvas, [], keyhandler, mousehandler);

    main.game.loop(main.game.state, 2);
};

main.game.start();
