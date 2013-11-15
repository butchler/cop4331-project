var Enemy = function (engine) {
    var type = 'enemy';
    var name = "cube";
    
    var hp = 20;
    
    var model = engine.Graphics().createModel(name, this);
    model.moveY(30);
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        model.rotateY(1);
       
    }
    
    
    this.getModel = function() {
        return model;
    }
    
    this.getName = function () {
        return type;
    }
    
    this.collision = function() {
        var isDestroyed = false;
        
        var cols = model.getCollisions();
        
        for (var i = 0; i < cols.length; i++) {
            var obj = cols[i].getObj();
            
            if (obj.getDamage !== undefined) {
                hp -= obj.getDamage();
            }
        }
        
        if (hp <= 0) isDestroyed = true;
        
        return isDestroyed;
    }
    
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}