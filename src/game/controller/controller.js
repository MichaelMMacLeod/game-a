var mod = { 
    binding: require('./binding/binding.js'),
    handler: require('./handler/handler.js')
};

var create = (bindings) => {
    return {
        bindings: bindings,
        handler: mod.handler.create()
    };
};

var process = (controller, state) => {
    controller.bindings.forEach((binding) => {
        var run_action = true;

        binding.keys.forEach((key) => {
            if (!controller.handler[key]) {
                run_action = false;
                return;
            }
        });

        if (run_action) {
            binding.action(state);
        }
    });
};

module.exports = {
    binding: mod.binding,
    handler: mod.handler,
    create: create,
    process: process
};
