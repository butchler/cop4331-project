var Boss = function (engine, health, damage, entrypoint) {
    var type = 'enemy';
    var name = "boss";
    
    var hp = health;
    var dmg = damage;
    
    var model = engine.Graphics().createModel(name, this);
    
    model.moveX(entrypoint[0]);
    model.moveY(entrypoint[1]);
    
    
    var dx = 0;
    var dy = 0;
    var frames = 0;
    var travelFrames = 0;
    
    var delay = 60 / Math.floor(globals.level.difficulty / 2);
    var delayFrames = delay;
    
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        var moveTo = engine.Messages().getMessage("playerPosition");

        
        if (frames < travelFrames) {
            frames++;
            
            model.moveX(dx);
            model.moveY(dy);
        }
        else if (delayFrames >= delay) {
            delayFrames = 0;
            
            var pos = model.getPosition();
            
            travelFrames = 60 / Math.floor(globals.level.difficulty / 2);
            
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
            
            model.rotateZ(180*Math.atan2(moveTo[1], moveTo[0])/Math.PI);
            
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