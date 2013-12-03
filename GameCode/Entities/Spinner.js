var Spinner = function (engine, health, damage, entrypoint) {
    var type = 'enemy';
    var name = "scattershot";
    
    var hp = health;
    var dmg = 25.0;
    var bulletDmg = damage;
    
    var rotation = 0;
    
    
    var fireRate = 6 * (10 - globals.level.difficulty) + 30;
    var fireRateFrames = 0;
    
    var model = engine.Graphics().createModel(name, this);
    
    
    var endpoint = [Math.random() * 80 - 40, Math.random() * 30];
    
    model.moveX(entrypoint[0]);
    model.moveY(entrypoint[1]);
    model.rotateX(90);
    
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function (bullets) {
        model.rotateY(1);
        rotation += Math.PI * 1 / 180;
        var pos = model.getPosition();
        
        if (pos[1] >= endpoint[1]) {
            var rx = (endpoint[0] - entrypoint[0]) / 30;
            var ry = (endpoint[1] - entrypoint[1]) / 30;
            
            model.moveX(rx);
            model.moveY(ry);
        }
        else {
            fireRateFrames++;
            
            if (fireRateFrames >= fireRate) {
                fireRateFrames = 0;
                
                
                
                bullets.push(new Bullet(engine, model.getPosition(), bulletDmg, type, 
                    [Math.cos(rotation), Math.sin(rotation)]));
                bullets.push(new Bullet(engine, model.getPosition(), bulletDmg, type, 
                    [Math.cos(Math.PI / 2 + rotation), Math.sin(Math.PI / 2 + rotation)]));
                bullets.push(new Bullet(engine, model.getPosition(), bulletDmg, type, 
                    [Math.cos(Math.PI + rotation), Math.sin(Math.PI + rotation)]));
                bullets.push(new Bullet(engine, model.getPosition(), bulletDmg, type, 
                    [Math.cos(3 * Math.PI / 2 + rotation), Math.sin(3 * Math.PI / 2 + rotation)]));
            }
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