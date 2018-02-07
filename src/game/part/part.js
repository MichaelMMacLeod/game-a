var mod = { 
    block: require('../block/block.js'),
    link: require('../link/link.js'),
    point: require('../point/point.js')
};

var create = (block, root, links) => {
    return {
        block: block,
        root: root,
        links: links
    };
};

var translate = (part, dx, dy) => {
    mod.block.translate(part.block, dx, dy);

    mod.point.translate(part.root, dx, dy);

    part.links.forEach((link) => {
        mod.point.translate(link.point, dx, dy);

        if (link.part !== null) {
            translate(link.part, dx, dy);
        }
    });
};

var rotate = (part, rotation, x, y) => {
    mod.block.rotate(part.block, rotation, x, y);

    mod.point.translate(part.root, rotation, x, y);

    part.links.forEach((link) => {
        link.rotation += rotation;
        mod.point.rotate(link.point, rotation, x, y);

        if (link.part !== null) {
            rotate(link.part, rotation, x, y);
        }
    });
};

module.exports = { 
    create: create,
    translate: translate,
    rotate: rotate
};
