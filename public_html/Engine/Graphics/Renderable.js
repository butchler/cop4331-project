var Renderable = function (gl, modelObject) {
    var DEFAULT_TEXTURE = "Content/Textures/";
    
    var meshes = [];
    var textures = [];
    var bounds = [];
    
    calcBounds();
    
    for (var i = 0; i < modelObject.meshes.length; i++) {
        var mesh = modelObject.meshes[i];
        meshes[i] = new Drawable(gl, mesh.vertices, mesh.texCoords);
        textures[i] = setTexture(mesh.material);
    }
    
    this.draw = function (locations) {
        var m = new Matrix4();
        
        gl.uniformMatrix4fv(locations[2], false, m.elements);
        
        for (var i = 0; i < meshes.length; i++) {
            gl.ActiveTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textures[i]);
            meshes[i].draw(locations);
        }
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
    
    
    function isPowerOfTwo(x) {
        return (x & (x - 1)) == 0;
    }
    function nextHighestPowerOfTwo(x) {
        --x;
        for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }
        return x + 1;
    }
    
    function setTexture(textureFileName)
    {
        var tex = gl.createTexture();
        tex.width = 0; tex.height = 0;
        var img = new Image();
        globals.imagecount++;
        img.onload = function(){
            globals.imagecount--; 
            tex.complete = img.complete;
            if (!isPowerOfTwo(img.width) || !isPowerOfTwo(img.height)) {
                // Scale up the texture to the next highest power of two dimensions.
                var canvas = document.createElement("canvas");
                canvas.width = nextHighestPowerOfTwo(img.width);
                canvas.height = nextHighestPowerOfTwo(img.height);
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                img = canvas;
            }
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.bindTexture(gl.TEXTURE_2D, null);
        };
        img.src = DEFAULT_TEXTURE + textureFileName;
        return tex;
    }
    
    // can be an array of bounds
    this.getBounds = function () {
        return bounds.slice();
    }
}