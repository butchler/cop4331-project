var Enemy = function (engine, health, damage, entrypoint) {
    var type = 'enemy';
    var name = "enemy";
    
    var hp = health;
    var dmg = 25.0;
    var bulletDmg = damage;
    
    var LONGEST_SHOT_TIME = 10000 / globals.level.difficulty;
    var SHORTEST_SHOT_TIME = 1800 / globals.level.difficulty;
    
    
    var fireRate = updateFireRate();
    var fireRateFrames = 0;
    
    
    //var MAX_FRAMES = 20;
    var frames = Math.floor((10 - globals.level.difficulty) / 2) + 3;
    var spent = 0;
    var segment = 0;
    var path = 0;
    
    var model = engine.Graphics().createModel(name, this);
    
    model.moveX(entrypoint[0]);
    model.moveY(entrypoint[1]);
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function (prevLocal, newLocal, bullets) {
        model.rotateY(1);


        if (++fireRateFrames >= fireRate) {
             fireRateFrames = 0;
             fireRate = updateFireRate();

             bullets.push(new Bullet(engine, model.getPosition(), 
                 damage, type, [0, -1]));
        }


        // handle pathing
        var rx = (newLocal[0] - prevLocal[0]) / frames;
        var ry = (newLocal[1] - prevLocal[1]) / frames;

        spent++;
        if (spent == frames) {
            spent = 0;
            segment++;
        }

        model.moveX(rx);
        model.moveY(ry);
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
    
    this.getSegment = function () {
        return segment;
    }
    
    this.getPath = function () {
        return path;
    }
    
    this.updatePath = function (newPath) {
        path = newPath;
        segment = 0;
        spent = 0;
    }
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
    
    
    function updateFireRate () {
        return fireRate = Math.floor(Math.random() * LONGEST_SHOT_TIME) + SHORTEST_SHOT_TIME;
    }
}