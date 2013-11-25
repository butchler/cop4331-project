var Seeker = function (engine, health, damage, entrypoint) {
    var type = 'enemy';
    var name = "seeker";
    
    var hp = health;
    var dmg = damage;
    
    var model = engine.Graphics().createModel(name, this);
    
    model.moveX(entrypoint[0]);
    model.moveY(entrypoint[1]);
    
    
    var dx = 0;
    var dy = 0;
    var frames = 0;
    var travelFrames = 0;
    
    var delay = 6 * Math.floor(10 - globals.level.difficulty) + 30;
    var delayFrames = delay;
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        var moveTo = engine.Messages().getMessage("playerPosition");

            
        var pos = model.getPosition();
        
        if (frames < travelFrames) {
            frames++;
            
            model.moveX(dx);
            model.moveY(dy);
        }
        else if (delayFrames >= delay) {
            delayFrames = 0;
            
            travelFrames = 6 * Math.floor(10 - globals.level.difficulty) + 30;
            
            dx = (moveTo[0] - pos[0]) / travelFrames;
            dy = (moveTo[1] - pos[1]) / travelFrames;
        }
        else if (frames !== 0 && frames >= travelFrames) {
            frames = 0;
            travelFrames = 0;
            dx = 0;
            dy = 0;
        }
        else {
            delayFrames++;
            
            model.setRotateZ(180*Math.atan2(moveTo[1] - pos[1], moveTo[0] - pos[0])/Math.PI + 90);
        }
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