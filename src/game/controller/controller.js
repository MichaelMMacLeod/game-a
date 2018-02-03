var mod = { 
    binding: require('./binding/binding.js'),
    handler: require('./handler/handler.js'),
    process: require('./process/process.js') 
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
