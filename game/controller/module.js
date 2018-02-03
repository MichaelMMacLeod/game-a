var mod = { 
    binding: require('./binding/module.js'),
    handler: require('./handler/module.js'),
    process: require('./process/module.js') 
};

var create = (bindings, handler) => {
    var controller = {};

    controller.process = mod.process.create(bindings, handler);

    return controller;
};

module.exports = {
    binding: mod.binding,
    handler: mod.handler,
    process: mod.process,
    create: create 
};
