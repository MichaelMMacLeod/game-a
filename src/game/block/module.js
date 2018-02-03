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
