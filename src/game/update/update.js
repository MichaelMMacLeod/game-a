var mod = {
    controller: require('../controller/controller.js'),
    camera: require('../camera/camera.js'),
    part: require('../part/part.js')
};

var create = (state) => {
    return () => {
        mod.controller.process(state.controller, state);

        mod.part.translate(
            state.player.part,
            state.player.vector.x,
            state.player.vector.y);

        var blocks = state.parts.reduce((acc, v) => {
            acc.push(v.block);
            return acc;
        }, []);

        mod.camera.draw(state.camera, blocks);
    };
};

module.exports = {
    create: create
};
