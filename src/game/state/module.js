var create = (
    canvas, 
    blocks, 
    controller, 
    ms_per_update
) => {
    return {
        canvas: canvas, 
        blocks: blocks, 
        controller: controller, 
        ms_per_update: ms_per_update
    };
};

module.exports = { create: create };
