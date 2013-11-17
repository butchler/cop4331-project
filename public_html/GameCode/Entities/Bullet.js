var Bullet = function (engine, pos, damage, side, dir) {
    var type = side;
    var name = "sphere";
    var speed = 2.0;
    var dmg = damage;
    var direction = dir;
    
    var MAX_BULLET_HEIGHT = 50;
    var MAX_BULLET_WIDTH = 60;
    
    
    var model = engine.Graphics().createModel(name, this);
    model.setPosition(pos[0], pos[1], pos[2]);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    
    this.update = function () {
        model.moveY(dir[1] * speed);
        model.moveX(dir[0] * speed);
    }
    
    this.collision = function () {
        var isDestroyed = false;
        
        var cols = model.getCollisions();
        
        for (var i = 0; i < cols.length; i++) {
            var obj = cols[i].getObj();
            
            if (obj.getName() !== type) {
                isDestroyed = true;
            }
        }
        
        return isDestroyed;
    }
    
    this.isOutside = function () {
        return model.getPosition()[1] > MAX_BULLET_HEIGHT 
                || model.getPosition()[1] < -MAX_BULLET_HEIGHT
                || model.getPosition()[0] > MAX_BULLET_WIDTH
                || model.getPosition()[0] < -MAX_BULLET_WIDTH;
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