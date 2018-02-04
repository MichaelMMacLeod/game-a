var create = (
    canvas, 
    parts, 
    controller, 
    ms_per_update
) => {
    return {
        canvas: canvas, 
        parts: parts, 
        controller: controller, 
        ms_per_update: ms_per_update
    };
};

module.exports = { create: create };
