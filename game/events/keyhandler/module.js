var create = (handler) => {
    window.addEventListener('keydown', (e) => {
        handler[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        handler[e.key] = false;
    });
};

module.exports = { create: create };
