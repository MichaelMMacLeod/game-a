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

var overlaps = (poly, point) => {
    var min_x = poly.points[0].x;
    var max_x = poly.points[0].x;
    var min_y = poly.points[0].y;
    var max_y = poly.points[0].y;

    for (let i = 1; i < poly.points.length; i++) {
        var p = poly.points[i];

        if (p.x < min_x) {
            min_x = p.x;
        } else if (p.x > max_x) {
            max_x = p.y;
        }

        if (p.y < min_y) {
            min_y = p.y;
        } else if (p.y > max_y) {
            max_y = p.y;
        }
    }

    return point.x >= min_x && point.x <= max_x 
        && point.y >= min_y && point.y <= max_y;
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
    overlaps: overlaps,
    copy: copy
};
