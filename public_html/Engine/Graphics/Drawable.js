var Drawable = function(gl, verts, tex) {
    var vertices = gl.createBuffer();
    var texCoord = gl.createBuffer();
    
    // make sure the buffers were created successfully
    if (!verts || !texCoord) {
        alert ("Error Code: X---");
        return;
    }
    
    
    // bind the vertices buffer, and fill it with the verts data
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    
    // bind the texCoord buffer, and fill it with the tex data
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tex), gl.STATIC_DRAW);
    
    
    this.draw = function(locations) {
        // bind and hook the vertices to the shader
        gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
        gl.vertexAttribPointer(locations[0], 3, gl.FLOAT, false, 0, 0);
        
        
        // bind and use indices to draw elements
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoord);
        gl.vertexAttribPointer(locations[1], 2, gl.FLOAT, false, 0, 0);
        
        gl.drawArrays(gl.TRIANGLES, 0, verts.length / 3);
    }
}