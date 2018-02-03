var create = (canvas, f) => {
    window.addEventListener('resize', () => f(canvas));
};

module.exports = { create: create };
