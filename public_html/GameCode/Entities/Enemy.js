var Enemy = function (engine, health, damage, entrypoint) {
    var type = 'enemy';
    var name = "cube";
    
    var hp = health;
    var dmg = 25.0;
    var bulletDmg = damage;
    
    var timestep = 0;
    var prevTime = new Date().getTime();
    var timeElapsed = 0;
    
    var model = engine.Graphics().createModel(name, this);
    
    model.moveX(entrypoint[0]);
    model.moveY(entrypoint[1]);
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function (initPos, finalPos, time, steps) {
        model.rotateY(1);
       
       var currPos = model.getPosition();
       
       
       
       var currTime = new Date().getTime() - prevTime;
       prevTime = new Date().getTime();
       timeElapsed += currTime;
       
       
       if (timeElapsed >= time) {
           timestep = (timestep + 1) % steps;
           timeElapsed -= time;
           
           currTime -= timeElapsed;
           prevTime -= timeElapsed;
       }
       
       model.moveX(currTime * (finalPos[0] - initPos[0]) / time);
       model.moveY(currTime * (finalPos[1] - initPos[1]) / time);
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
    
    this.getTimeStep = function () {
        return timestep;
    }
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
        console.log("destroyed");
    }
}