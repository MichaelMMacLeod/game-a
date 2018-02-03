(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod = { 
    poly: require('../poly/module.js'), 
    point: require('../point/module.js')
};

var create = (poly, center, rotation) => {
    return {
        poly: poly,
        center: center,
        rotation: rotation
    };
};

var translate = (block, dx, dy) => {
    mod.poly.translate(block.poly, dx, dy);
    mod.point.translate(block.center, dx, dy);
};

var move_to = (block, x, y) => {
    var dx = x - block.center.x;
    var dy = y - block.center.y;

    translate(block, dx, dy);
};

var rotate = (block, rotation, x, y) => {
    block.rotation += rotation;

    mod.poly.rotate(block.poly, rotation, x, y);
    mod.point.rotate(block.center, rotation, x, y);
};

module.exports = { 
    create: create, 
    translate: translate, 
    move_to: move_to, 
    rotate: rotate
};

},{"../point/module.js":13,"../poly/module.js":14}],2:[function(require,module,exports){
var mod = { resize: require('./resize/module.js') };

module.exports = { resize: mod.resize };

},{"./resize/module.js":3}],3:[function(require,module,exports){
var create = (canvas, f) => {
    window.addEventListener('resize', () => f(canvas));
};

module.exports = { create: create };

},{}],4:[function(require,module,exports){
var mod = { events: require('./events/module.js') };

var create = () => {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    return canvas;
};

var resize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
};

var fullscreen = (canvas) => {
    resize(canvas, window.innerWidth, window.innerHeight);
};

var clear = (canvas) => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
};

var draw = (canvas, polys) => {
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

module.exports = { 
    events: mod.events,
    create: create, 
    resize: resize, 
    fullscreen: fullscreen, 
    clear: clear, 
    draw: draw
};

},{"./events/module.js":2}],5:[function(require,module,exports){
var create = (keys, action) => {
    return { 
        keys: keys, 
        action: action
    };
};

module.exports = { create: create };

},{}],6:[function(require,module,exports){
var mod = { events: require('../../events/module.js') };

var create = () => {
    var handler = {};

    mod.events.keyhandler.create(handler);
    mod.events.mousehandler.create(handler);

    return handler;
};

module.exports = { create: create };

},{"../../events/module.js":10}],7:[function(require,module,exports){
var mod = { 
    binding: require('./binding/module.js'),
    handler: require('./handler/module.js'),
    process: require('./process/module.js') 
};

var create = (bindings, handler) => {
    var controller = {};

    controller.process = mod.process.create(bindings, handler);

    return controller;
};

module.exports = {
    binding: mod.binding,
    handler: mod.handler,
    process: mod.process,
    create: create 
};

},{"./binding/module.js":5,"./handler/module.js":6,"./process/module.js":8}],8:[function(require,module,exports){
var create = (bindings, handler) => {
    return (polys) => {
        bindings.forEach((binding) => {
            var run_action = true;

            binding.keys.forEach((key) => {
                if (!handler[key]) {
                    run_action = false;
                    return;
                }
            });

            if (run_action) {
                binding.action(polys);
            }
        });
    };
};

module.exports = { create: create };

},{}],9:[function(require,module,exports){
var create = (handler) => {
    window.addEventListener('keydown', (e) => {
        handler[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        handler[e.key] = false;
    });
};

module.exports = { create: create };

},{}],10:[function(require,module,exports){
var mod = { 
    keyhandler: require('./keyhandler/module.js'), 
    mousehandler: require('./mousehandler/module.js')
};

module.exports = { 
    keyhandler: mod.keyhandler, 
    mousehandler: mod.mousehandler
};

},{"./keyhandler/module.js":9,"./mousehandler/module.js":11}],11:[function(require,module,exports){
var create = (handler) => {
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

module.exports = { create: create };

},{}],12:[function(require,module,exports){
var mod = { 
    canvas: require('./canvas/module.js'), 
    point: require('./point/module.js'), 
    poly: require('./poly/module.js'), 
    block: require('./block/module.js'), 
    controller: require('./controller/module.js'), 
    state: require('./state/module.js')
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

},{"./block/module.js":1,"./canvas/module.js":4,"./controller/module.js":7,"./point/module.js":13,"./poly/module.js":14,"./state/module.js":15}],13:[function(require,module,exports){
var create = (x, y) => {
    return { 
        x: x, 
        y: y 
    };
};

var translate = (point, dx, dy) => {
    point.x += dx;
    point.y += dy;
};

var move_to = (point, x, y) => {
    point.x = x;
    point.y = y;
};

var rotate = (point, angle, x, y) => {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    translate(point, -x, -y);

    var rx = point.x * cos - point.y * sin;
    var ry = point.x * sin + point.y * cos;

    point.x = rx;
    point.y = ry;

    translate(point, x, y);
};

module.exports = { 
    create: create, 
    translate: translate, 
    move_to: move_to, 
    rotate: rotate
};

},{}],14:[function(require,module,exports){
var mod = { point: require('../point/module.js') };

var create = (points) => {
    return { points: points };
};

var translate = (poly, dx, dy) => {
    poly.points.forEach((point) => {
        mod.point.translate(point, dx, dy);
    });
};

var rotate = (poly, angle, x, y) => {
    poly.points.forEach((point) => {
        mod.point.rotate(point, angle, x, y);
    });
};

module.exports = { 
    create: create, 
    translate: translate, 
    rotate: rotate
};

},{"../point/module.js":13}],15:[function(require,module,exports){
var create = (
    canvas, 
    blocks, 
    controller, 
    ms_per_update
) => {
    return {
        canvas: canvas, 
        blocks: blocks, 
        controller: controller, 
        ms_per_update: ms_per_update
    };
};

module.exports = { create: create };

},{}],16:[function(require,module,exports){
var mod = { game: require('./game/module.js') };

window.onload = mod.game.start;

},{"./game/module.js":12}]},{},[16]);
