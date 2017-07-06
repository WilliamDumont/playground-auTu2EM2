var controls = $("#controls");

var sliders = [{
    key: 'separateWeight',
    label: 'separation',
    max: 10
}, {
    key: 'alignWeight',
    label: 'alignment',
    max: 10
}, {
    key: 'coheseWeight',
    label: 'cohesion',
    max: 10
}];

// Weights
sliders.forEach(function (opt) {
    var label = opt.label || opt.key;
    var min = opt.min || 0;
    var id = opt.key + '-slider';
    var html = '<div style="display:flex;">' +
        '<input id="' + id + '" type="range" min="' + min + '" max="' + opt.max + '" step="0.1"> ' +
        label +
        '</div>';

    controls.append(html);

    $('#' + id).bind('input', function () {
        document.globals[opt.key] = +this.value;
    });
});

// Individuals
var html = '<div style="display:flex;">' +
    '<input id="boids-slider" type="range" min="2" max="198" step="1" value="100"> ' + 
    'boids' +
    '</div>';
controls.append(html);

$('#boids-slider').bind('input', function() {
    var desired = this.value;
    var got = boids.length;
    
    if (got > desired) {
        var unwanted = boids.splice(desired);
        unwanted.forEach(function(b){
            boidLayer.removeChild(b.graphics);
        });
    } else if (got < desired) {
        for (var i = 0; i < desired - got; ++i) {
            var b = new Boid(0,0);
            boids.push(new Boid(Math.random() * app.screen.width, Math.random() * app.screen.height));
        }
    }
});