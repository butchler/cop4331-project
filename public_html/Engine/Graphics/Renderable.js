var Renderable = function (gl, modelObject) {
    var meshes = [];
    var bounds = [];
    
    for (var i = 0; i < modelObject.meshes.length; i++) {
        var mesh = modelObject.meshes[i];
        meshes[i] = new Drawable(gl, mesh.vertices, mesh.indices);
    }
    
    this.draw = function (locations) {
        var m = new Matrix4();
        
        gl.uniformMatrix4fv(locations[1], false, m.elements);
        
        for (var i = 0; i < meshes.length; i++)
            meshes[i].draw(locations);
    }
    
    
    // can calculate an array of bounds
    function calcBounds() {
        
    }
    
    // can be an array of bounds
    this.getBounds = function () {
        
    }
}