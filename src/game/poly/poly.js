var mod = { point: require('../point/point.js') };

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

var scale = (poly, scalar) => {
    poly.points.forEach((point) => {
        mod.point.scale(point, scalar);
    });
};

var copy = (poly) => {
    var c = [];
    
    for (let i = 0; i < poly.points.length; i++) {
        c[i] = mod.point.copy(poly.points[i]);
    }

    return create(c);
};

module.exports = { 
    create: create, 
    translate: translate, 
    rotate: rotate,
    scale: scale,
    copy: copy
};
