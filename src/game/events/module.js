var mod = { 
    keyhandler: require('./keyhandler/module.js'), 
    mousehandler: require('./mousehandler/module.js')
};

module.exports = { 
    keyhandler: mod.keyhandler, 
    mousehandler: mod.mousehandler
};
