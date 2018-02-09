var mod = {
    poly: require('../poly/poly.js'),
    point: require('../../point/point.js'),
    block: require('../../block/block.js')
};

var make_square = (size, x, y, rotation) => {
    var block = mod.block.create(
        mod.poly.make_square(size),
        mod.point.create(0, 0),
        0);
    
    mod.block.translate(block, x, y);
    mod.block.rotate(block, rotation, x, y);

    return block;
};

module.exports = {
    make_square: make_square
};
