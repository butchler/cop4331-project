var CollisionDetection = function() {
    var objects = [];
    var repo;
    
    this.setRepo = function(objRepo) {
        repo = objRepo;
    }
    
    this.addCollider = function(obj) {
        objects.push(obj);
        
        obj.updateCIndex(objects.length - 1);
    }
    
    this.removeCollider = function(ind) {
        if (objects.length == 1 || ind == objects.length - 1) {
            objects.pop();
        }
        else if (objects.length > 1) {
            objects[ind] = objects.pop();
            objects[ind].updateCIndex(ind);
        }
    }
    
    this.runCollision = function() {
        for (var i = 0; i < objects.length; i++) objects[i].resetCollsions();
        
        for (var i = 0; i < objects.length - 1; i++) {
            for (var j = i + 1; j < objects.length; j++) {
                isColliding(objects[i], objects[j]);
            }
        }
    }
    
    // set up for cube collision detection
    function isColliding(obj1, obj2) {
        var bobj1 = calculateBounds(obj1);
        var bobj2 = calculateBounds(obj2);
        
        if (Math.abs(bobj1[1][0] - bobj2[1][0]) < bobj1[0][0] + bobj2[0][0] &&
            Math.abs(bobj1[1][1] - bobj2[1][1]) < bobj1[0][1] + bobj2[0][1] &&
            Math.abs(bobj1[1][2] - bobj2[1][2]) < bobj1[0][2] + bobj2[0][2]) {
            
            obj1.addCollision(bobj2);
            obj2.addCollision(bobj1);
        }
    }
    
    function calculateBounds(obj) {
        var bounds = repo.getEntity(obj.getName()).getBounds();
        var pos = obj.getPosition();
        
        var min = bounds[0], max = bounds[1];
        var width = [];
        var center = [];
        
        for (var i = 0; i < 3; i++) {
            width.push(Math.abs((max[i] - min[i]) / 2.0));
            center.push(((max[i] + min[i]) / 2.0) + pos[i]);
        }
        
        return [width, center];
    }
}