var GraphicalEntity = function (name) {
    var matrix = new Matrix4();
    var modelName = name;
    
    //                x    y    z
    var position = [0.0, 0.0, 0.0];
    
    //              a    x    y    z
    var rotation = [0.0, 0.0, 0.0, 0.0];
    
    
    // move the object
    this.moveX = function (x) {
        move(x, 0.0, 0.0);
    }
    this.moveY = function (y) {
        move(0.0, y, 0.0);
    }
    this.moveZ = function (z) {
        move(0.0, 0.0, z);
    }
    function move(x, y, z) {
        position[0] += x;
        position[1] += y;
        position[2] += z;
        matrix.translate(x, y, z);
    }
    this.move = move;
    
    
    // rotate the object
    this.rotateX = function (angle) {
        rotate(angle, 1.0, 0.0, 0.0);
    }
    this.rotateY = function (angle) {
        rotate(angle, 0.0, 1.0, 0.0);
    }
    this.rotateZ = function (angle) {
        rotate(angle, 0.0, 0.0, 1.0);
    }
    function rotate(angle, x, y, z) {
        rotation = [angle, x, y, z];
        matrix.rotate(angle, x, y, z);
    }
    this.rotate = rotate;
    
    
    // get the matrix
    this.getMatrix = function () {
        var m = new Matrix4();
        
        
        m.translate(position[0], position[1], position[2]);
        
        if (rotation[0] != 0)
            m.rotate(rotation[0], rotation[1], rotation[2], rotation[3]);
        
        return m;
    }
    
    
    // get the name of the object
    this.getName = function () {
        return modelName;
    }
    
    
    // update the name of the object
    this.updateName = function (name) {
        modelName = name;
    }
}