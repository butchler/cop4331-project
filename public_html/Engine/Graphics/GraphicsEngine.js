var GraphicsEngine = function (gl) {
    var camera = new Camera(gl, [50, 50, 50], [0, 1, 0]);
    var entityRepo = new EntityRepo(gl);
    
    // create the vertex shader
    var vs =
            'attribute vec3 position;' +
            'uniform mat4 matP;' +
            'uniform mat4 matV;' +
            'uniform mat4 modelT;' +
            'void main() {' +
            '	gl_Position = matP * matV * modelT * vec4(position, 1.0);' +
            '}';



    // create the fragment shader
    var fs = 
            'precision mediump float;' +
            'void main() {' +
            '	gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);' +
            '}';
    
    
    
    // create the program to run the vertex and fragment shader
    var program = createProgram(gl, vs, fs);
    gl.useProgram(program);


    // check if it is alive
    if (!program) {
            console.log('Failed to create program.');
            return;
    }
    
    
    
    
    // get locations
    // get the location of the position in the vertex shader and enable it
    var pLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pLocation);


    // get the location of the transform matrix, view matrix, and projection matrix
    var mLocation = gl.getUniformLocation(program, 'modelT');
    var projLocation = gl.getUniformLocation(program, 'matP');
    var viewLocation = gl.getUniformLocation(program, 'matV');


    // create a repository of shared pointers for the different vertex variables
    var locations = [pLocation];
   
   
   
   
    this.createModel = function (name, collision) {
        var entity;
        
        if (entityRepo.addEntity(name)) {
            entity = new GraphicalEntity(name);
            
            if (collision === undefined) collision = true;
            
            if (collision == true) {
                // add to collision detection list in the physics engine
            }
        }
        
        return entity !== undefined? entity: false;
    }
    
    this.destroyModel = function (model) {
        // check that a model is no longer being used, requires garbage collection
        // remove specific model data from collision array
        
    }
    
    
    this.draw = function(model) {
        var drawn = false;
        
        if (entityRepo.entityExists(model.getName())) {
            gl.uniformMatrix4fv(mLocation, false, model.getMatrix().elements);
            entityRepo.getEntity(model.getName()).draw(this.CURRENT_PROGRAM());
            drawn = true;
        }
        
        return drawn;
    }
    
    this.drawCamera = function () {
        // set the view and projection matrix in the vertex shader
        gl.uniformMatrix4fv(projLocation, false, camera.getProjMatrix().elements);
        gl.uniformMatrix4fv(viewLocation, false, camera.getViewMatrix().elements);

    }
    
    
    this.CURRENT_PROGRAM = function() {
        return locations;
    }
}