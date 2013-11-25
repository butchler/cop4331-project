var Boss = function (engine) {
    var type = 'enemy';
    var name = "boss";
    
    var hp = 5000;
    var dmg = 25;
    
    var model = engine.Graphics().createModel(name, this);
    
    model.moveX(-60);
    model.moveY(40);
    
    model.rotateX(-90);
    
    var speed = 0.5;
    var dx = speed;
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function (bullets) {        
        model.moveX(dx);
        
        var pos = model.getPosition();
        
        if (pos[0] > 40) dx = -speed;
        if (pos[0] < -40) dx = speed;
    }
    
    
    this.getModel = function() {
        return model;
    }
    
    this.getName = function () {
        return type;
    }
    
    this.getDamage = function () {
        return dmg;
    }
    
    this.collision = function() {
        var isDestroyed = false;
        
        var cols = model.getCollisions();
        
        for (var i = 0; i < cols.length; i++) {
            var obj = cols[i].getObj();
            if (obj.getName() != 'enemy') {
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