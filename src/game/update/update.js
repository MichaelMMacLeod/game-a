var mod = {
    controller: require('../controller/controller.js'),
    camera: require('../camera/camera.js'),
    part: require('../part/part.js')
};

var create = (state) => {
    return () => {
        mod.controller.process(state.controller, state);

        mod.part.translate(
            state.parts[0],
            state.parts[0].ax,
            state.parts[0].ay);

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
