var mod = {
    point: require('../../point/point.js'),
    part: require('../../part/part.js'),
    link: require('../../link/link.js'),
    block: require('../block/block.js')
};

var make_square = (size, x, y, rotation) => {
    var block = mod.block.make_square(size, x, y, rotation);

    var s = size / 2;

    var lp1 = mod.point.create(s, 0);
    var lp2 = mod.point.create(0, s);
    var lp3 = mod.point.create(-s, 0);

    var root = mod.point.create(0, -s);

    mod.point.translate(lp1, x, y);
    mod.point.translate(lp2, x, y);
    mod.point.translate(lp3, x, y);

    mod.point.rotate(lp1, rotation, x, y);
    mod.point.rotate(lp2, rotation, x, y);
    mod.point.rotate(lp3, rotation, x, y);

    var links = [
        mod.link.create(null, lp1, -Math.PI / 2),
        mod.link.create(null, lp2, 0),
        mod.link.create(null, lp3, Math.PI / 2)
    ];

    return mod.part.create(block, root, links);
};

module.exports = {
    make_square: make_square
};
