var create = (
    camera,
    player,
    parts,
    controller,
    ms_per_update
) => {
    return {
        camera: camera,
        player: player,
        parts: parts,
        controller: controller,
        ms_per_update: ms_per_update
    };
};

module.exports = { create: create };
