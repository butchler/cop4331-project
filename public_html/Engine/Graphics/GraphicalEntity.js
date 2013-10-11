var GraphicalEntity = function (name) {
    var matrix = new Matrix4();
    var modelName = name;
    
    
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
        matrix.translate(x, y, z);
    }
    this.move = move;
    
    
    // rotate the object
    this.rotateX = function (angle) {
        rotate(angle, 1.0, 0.0, 0.0);
    }
    this.rotateY = function (angle) {
        rotate(angle, 1.0, 0.0, 0.0);
    }
    this.rotateZ = function (angle) {
        rotate(angle, 0.0, 0.0, 1.0);
    }
    function rotate(angle, x, y, z) {
        matrix.rotate(angle, x, y, z);
    }
    this.rotate = rotate;
    
    
    // get the matrix
    this.getMatrix = function () {
        return new Matrix4(matrix);
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