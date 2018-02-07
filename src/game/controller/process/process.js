var create = (bindings, handler) => {
    return (state) => {
        bindings.forEach((binding) => {
            var run_action = true;

            binding.keys.forEach((key) => {
                if (!handler[key]) {
                    run_action = false;
                    return;
                }
            });

            if (run_action) {
                binding.action(state);
            }
        });
    };
};

module.exports = { create: create };
