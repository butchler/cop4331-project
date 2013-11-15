var GraphicalEntity = function (name, clnOn, index) {
    var matrix = new Matrix4();
    var modelName = name;
    
    var collision = clnOn !== undefined? clnOn: true;
    var colliding = false;
    var collidingWith = [];
    var collisionIndex = index;
    
    //                x    y    z
    var position = [0.0, 0.0, 0.0];
    
    //                a    x    y    z
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
    }
    this.move = move;
    
    this.setPosition = function (x, y, z) {
        position[0] = x;
        position[1] = y;
        position[2] = z;
    }
    
    
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
        var nx, ny, nz, na, max, min;
        
        nx = rotation[0] * rotation[1] + x * angle;
        ny = rotation[0] * rotation[2] + y * angle;
        nz = rotation[0] * rotation[3] + z * angle;
        
        max = Math.max(nx, ny, nz);
        min = Math.min(nx, ny, nz);
        
        na = Math.abs(max) > Math.abs(min)? max: min;
        
        rotation[0] = na;
        rotation[1] = na != 0? nx / na: nx;
        rotation[2] = na != 0? ny / na: ny;
        rotation[3] = na != 0? nz / na: nz;
    }
    this.rotate = rotate;
    
    
    this.getPosition = function() {
        return position.slice();
    }
    
    this.getOrientation = function() {
        return rotation.slice();
    }
    
    
    // get the matrix, need a new matrix4 float
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
    
    
    // collision
    this.isColliding = function() {
        return colliding;
    }
    
    this.addCollision = function(obj) {
        colliding = true;
        collidingWith.push(obj);
    }
    
    this.resetCollsions = function() {
        collidingWith = [];
        colliding = false;
    }
    
    this.getCollisions = function() {
        return collidingWith.slice();
    }
    
    this.isCollisionOn = function() {
        return collision;
    }
    
    
    
    this.updateCIndex = function(index) {
        collisionIndex = index;
    }
    
    
    this.getCIndex = function() {
        return collisionIndex;
    }
}