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
