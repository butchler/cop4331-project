var Renderable = function (gl, modelObject) {
    var meshes = [];
    var bounds = [];
    
    calcBounds();
    
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
        if (modelObject.bounds !== undefined) {
            for (var i = 0; i < modelObject.bounds.length; i++) {
                
            }
        }
        else {
            var min = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE];
            var max = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
            
            for (var i = 0; i < modelObject.meshes.length; i++) {
                
                var verts = modelObject.meshes[i].vertices;
                for (var j = 0; j < verts.length; j++) {
                    if (min[j % 3] > verts[j]) min[j % 3] = verts[j];
                    if (max[j % 3] < verts[j]) max[j % 3] = verts[j];
                }
            }
            
            bounds.push(min);
            bounds.push(max);
        }
    }
    
    // can be an array of bounds
    this.getBounds = function () {
        return bounds.slice();
    }
}