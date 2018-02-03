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
