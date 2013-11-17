var Player = function (engine) {  
    var type = 'player';
    var name = "ship";
    
    
    var hpBar = document.getElementById('hp');
    
    
    var speed = globals.speedStat / 200.0;
    var maxhp = globals.healthStat;
    var dmg = 50.0;
    var bulletDmg = globals.damageStat;
    var timer = 1000 / globals.rateStat;
    
    var alive = true;
    
    var model = engine.Graphics().createModel(name, this);
    model.moveY(-30);
    
    var XBOUNDS = 50;
    var YBOUNDS = 40;
    
    
    var prevTime = new Date().getTime();
    
    
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        if (engine.Messages().getMessage("W") == "down")
            model.moveY(speed);
        
        
        if (engine.Messages().getMessage("S") == "down")
            model.moveY(-speed);
        
        
        if (engine.Messages().getMessage("A") == "down")
            model.moveX(-speed);
        
        
        if (engine.Messages().getMessage("D") == "down")
            model.moveX(speed);
    }
    
    this.isShooting = function(list) {
        if (engine.Messages().getMessage(" ") == "down" && canCreateBullet()) {
            list.push(new Bullet(engine, model.getPosition()));
            prevTime = new Date().getTime();
        }
    }
    
    function canCreateBullet() {
        var canCreate = false;
        var curTime = new Date().getTime();
        
        if (curTime - prevTime > timer) {
            canCreate = true;
        }
        
        return canCreate;
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
        var x = model.getPosition()[0];
        var y = model.getPosition()[1];
        
        
        if (y < -YBOUNDS) model.moveY(-YBOUNDS - y);
        if (y >  YBOUNDS) model.moveY( YBOUNDS - y);
        
        if (x < -XBOUNDS) model.moveX(-XBOUNDS - x);
        if (x >  XBOUNDS) model.moveX( XBOUNDS - x);
        
        
        var cols = model.getCollisions();
        
        for (var i = 0; i < cols.length; i++) {
            var obj = cols[i].getObj();
            
            if (obj.getName() != 'bullet' && obj.getDamage !== undefined) {
                globals.currentHealth -= obj.getDamage();
                
                progress(hpBar, (globals.currentHealth / maxhp) * 100 + '%');
            }
        }
        
        
        if (globals.currentHealth <= 0)
            alive = false;
        
        return !alive;
    }
    
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}