var Boss = function (engine) {
    var type = 'enemy';
    var name = "boss";
    
    var hp = 5000;
    var dmg = 300;
    
    var bulletDmg = 25;
    
    var model = engine.Graphics().createModel(name, this);
    
    model.moveX(-70);
    model.moveY(40);
    
    model.rotateX(-90);
    
    var speed = 0.5;
    var dx = speed;
    
    var fireRate = 60;
    var fireRateFrames = 0;
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function (bullets) {        
        model.moveX(dx);
        
        var pos = model.getPosition();
        
        if (pos[0] > 50) dx = -speed;
        if (pos[0] < -50) dx = speed;
        
        
        fireRateFrames++;
            
        if (fireRateFrames >= fireRate) {
            fireRateFrames = 0;
            
            var pos = model.getPosition();
        
            bullets.push(new Bullet(engine, [pos[0] + 5, pos[1], pos[2]], bulletDmg, type, 
                [0, -1]));
            bullets.push(new Bullet(engine, [pos[0] - 5, pos[1], pos[2]], bulletDmg, type, 
                [0, -1]));
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