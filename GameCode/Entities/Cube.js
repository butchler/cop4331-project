var Cube = function(engine) {
    var name = "cube";
    
    var repositioned = false;
    
    var model = engine.Graphics().createModel(name);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        if (!repositioned) {
            repositioned = true;
            model.moveY(14);
        }
        model.rotateY(1);
       
    }
    
    
    this.getModel = function() {
        return model;
    }
    
    this.collision = function() {
        return model.isColliding();
    }
}