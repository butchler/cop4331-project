var GraphicsEngine = function (gl, collisionDetection) {
    var camera = new Camera(gl, 150, [0, 1, 0]);
    var entityRepo = new EntityRepo(gl);
    
    // create the vertex shader
    var vs =
            'attribute vec3 position;' +
            'attribute vec2 texCoord;' +
            'uniform mat4 matP;' +
            'uniform mat4 matV;' +
            'uniform mat4 modelT;' +
            'varying vec2 tCoord;' +
            'void main() {' +
            '	gl_Position = matP * matV * modelT * vec4(position, 1.0);' +
            '   tCoord = texCoord;' +
            '}';



    // create the fragment shader
    var fs = 
            'precision mediump float;' +
            'uniform sampler2D sampler;' +
            'varying vec2 tCoord;' +
            'void main() {' +
            '	gl_FragColor = vec4(texture2D(sampler, tCoord).rgb, 1.0);' +
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
    
    var tLocation = gl.getAttribLocation(program, 'texCoord');
    gl.enableVertexAttribArray(tLocation);


    // get the location of the transform matrix, view matrix, and projection matrix
    var mLocation = gl.getUniformLocation(program, 'modelT');
    var projLocation = gl.getUniformLocation(program, 'matP');
    var viewLocation = gl.getUniformLocation(program, 'matV');
    
    var samplerLocation = gl.getUniformLocation(program, 'sampler');


    // create a repository of shared pointers for the different vertex variables
    var locations = [pLocation, tLocation];
   
   
   this.getRepo = function () {
       return entityRepo;
   }
   
    this.createModel = function (name, obj, collision) {
        var entity;
        
        if (entityRepo.addEntity(name)) {            
            if (collision === undefined) collision = true;      
            
            entity = new GraphicalEntity(obj, name, collision, 0);
            
            if (collision == true) {
                // add to collision detection list in the physics engine
                collisionDetection.addCollider(entity);
            }
        }
        
        return entity !== undefined? entity: false;
    }
    
    this.destroyModel = function (model) {
        collisionDetection.removeCollider(model.getCIndex());
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
        gl.uniform1i(samplerLocation, 0);
    }
    
    
    this.CURRENT_PROGRAM = function() {
        return locations;
    }
}