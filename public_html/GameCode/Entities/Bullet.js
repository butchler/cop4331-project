var Bullet = function (engine, pos) {
    var type = 'bullet';
    var name = "sphere";
    var speed = 2.0;
    var dmg = 10.0;
    
    var MAX_BULLET_HEIGHT = 50;
    var MAX_BULLET_WIDTH = 60;
    
    
    var model = engine.Graphics().createModel(name, this);
    model.setPosition(pos[0], pos[1], pos[2]);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    
    this.update = function () {
        model.moveY(speed);
    }
    
    this.collision = function () {
        var isDestroyed = false;
        
        var cols = model.getCollisions();
        
        for (var i = 0; i < cols.length; i++) {
            var obj = cols[i].getObj();
            
            if (obj.getName() !== 'player') {
                isDestroyed = true;
            }
        }
        
        return isDestroyed;
    }
    
    this.isOutside = function () {
        return model.getPosition()[1] > MAX_BULLET_HEIGHT;
    }
    
    
    this.getName = function () {
        return type;
    }
    
    this.getDamage = function () {
        return dmg;
    }
    
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}