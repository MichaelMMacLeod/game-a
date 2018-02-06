var create = (
    camera, 
    parts, 
    controller, 
    ms_per_update
) => {
    return {
        camera: camera, 
        parts: parts, 
        controller: controller, 
        ms_per_update: ms_per_update
    };
};

module.exports = { create: create };
