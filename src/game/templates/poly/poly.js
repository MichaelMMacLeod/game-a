var mod = { 
    point: require('../../point/point.js'),
    poly: require('../../poly/poly.js') 
};

var make_square = (size) => {
    var s = size / 2;

    var poly = mod.poly.create([
        mod.point.create(-s, -s),
        mod.point.create(s, -s),
        mod.point.create(s, s),
        mod.point.create(-s, s)
    ]);

    return poly;
};

module.exports = {
    make_square: make_square
};
