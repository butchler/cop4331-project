var CollisionDetection = function() {
    var objects = [];
    
    this.addCollider = function(obj) {
        objects.push(obj);
    }
    
    this.removeCollider = function(ind) {
        objects[ind] = objects[objects.length - 1];
        objects[ind].updateCIndex(ind);
        
        objects.pop();
    }
    
    this.runCollision = function() {
        
    }
    
    function isColliding(obj1, obj2) {
        
    }
}