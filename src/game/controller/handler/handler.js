var mod = { events: require('../../events/events.js') };

var create = () => {
    var handler = {};

    mod.events.keyhandler.create(handler);
    mod.events.mousehandler.create(handler);

    return handler;
};

module.exports = { create: create };
