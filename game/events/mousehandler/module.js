var create = (handler) => {
    handler['mouse_x'] = 0;
    handler['mouse_y'] = 0;
    handler['mouse_pressed'] = false;

    window.addEventListener('mousemove', (e) => {
        handler['mouse_x'] = e.clientX;
        handler['mouse_y'] = e.clientY;
    });

    window.addEventListener('mousedown', () => {
        handler['mouse_pressed'] = true;
    });

    window.addEventListener('mouseup', () => {
        handler['mouse_pressed'] = false;
    });
};

module.exports = { create: create };
