var mod = { events: require('./events/module.js') };

var create = () => {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    return canvas;
};

var resize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
};

var fullscreen = (canvas) => {
    resize(canvas, window.innerWidth, window.innerHeight);
};

var clear = (canvas) => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
};

var draw = (canvas, polys) => {
    var c = canvas.getContext('2d');

    polys.forEach((poly) => {
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.moveTo(poly.points[0].x, poly.points[0].y);

        for (let i = 1; i < poly.points.length; i++) {
            var point = poly.points[i];
            c.lineTo(point.x, point.y);
        }

        c.closePath();
        c.fill();
    });
};

module.exports = { 
    events: mod.events,
    create: create, 
    resize: resize, 
    fullscreen: fullscreen, 
    clear: clear, 
    draw: draw
};
