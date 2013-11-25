var GraphicalEntity = function (objin, name, clnOn, index) {
    var matrix = new Matrix4();
    var obj = objin;
    var modelName = name;
    
    var collision = clnOn !== undefined? clnOn: true;
    var colliding = false;
    var collidingWith = [];
    var collisionIndex = index;
    
    //                x    y    z
    var position = [0.0, 0.0, 0.0];
    
    //                x    y    z
    var angles =   [0.0, 0.0, 0.0];
    
    
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
        angles[0] += angle;
    }
    this.rotateY = function (angle) {
        angles[1] += angle;
    }
    this.rotateZ = function (angle) {
        angles[2] += angle;
    }
    function rotate(angle, x, y, z) {
        
    }
    this.rotate = rotate;
    
    
    // rotate the object
    this.setRotateX = function (angle) {
        angles[0] = angle;
    }
    this.setRotateY = function (angle) {
        angles[1] = angle;
    }
    this.setRotateZ = function (angle) {
        angles[2] = angle;
    }
    
    this.getPosition = function() {
        return position.slice();
    }
    
    this.getOrientation = function() {
        return angles.slice();
    }
    
    
    // get the matrix, need a new matrix4 float
    this.getMatrix = function () {
        var m = new Matrix4();
        
        
        m.translate(position[0], position[1], position[2]);
        
        if (angles[0] != 0) m.rotate(angles[0], 1.0, 0.0, 0.0);
        if (angles[1] != 0) m.rotate(angles[1], 0.0, 1.0, 0.0);
        if (angles[2] != 0) m.rotate(angles[2], 0.0, 0.0, 1.0);
        
        return m;
    }
    
    
    // get the name of the object
    this.getObj = function () {
        return obj;
    }  
    
    this.getName = function () {
        return modelName;
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