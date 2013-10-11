var Drawable = function(gl, verts, ind) {
    var vertices = gl.createBuffer();
    var indices = gl.createBuffer();
    
    // make sure the buffers were created successfully
    if (!verts || !indices) {
        alert ("Error Code: X---");
        return;
    }
    
    
    // bind the vertices buffer, and fill it with the verts data
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    
    // bind the indices buffer, and fill it with the ind data
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ind), gl.STATIC_DRAW);
    
    
    this.draw = function(locations) {
        // bind and hook the vertices to the shader
        gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
        gl.vertexAttribPointer(locations[0], 3, gl.FLOAT, false, 0, 0);
        
        
        // bind and use indices to draw elements
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
        gl.drawElements(gl.TRIANGLES, ind.length, gl.UNSIGNED_SHORT, 0);
    }
}