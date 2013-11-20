var Player = function (engine) {  
    var type = 'ally';
    var name = "ship";
    
    
    var hpBar = document.getElementById('hp');
    
    
    var speed = globals.speedStat / 200.0;
    var maxhp = globals.healthStat;
    var dmg = 50.0;
    var bulletDmg = globals.damageStat;
    var timer = 1000 / globals.rateStat;
    var direction = [0, 1];
    
    var alive = true;
    
    var model = engine.Graphics().createModel(name, this);
    model.moveY(-30);
    
    var XBOUNDS = 50;
    var YBOUNDS = 40;
    
    
    var prevBulletTime = new Date().getTime();
    var prevRocketTime = new Date().getTime();
    
    
    
    
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
    
    this.isShooting = function(bullets, rockets) {
        if (engine.Messages().getMessage(" ") == "down" && canCreateBullet()) {
            
            bullets.push(new Bullet(engine, model.getPosition(), 
                bulletDmg, type, direction));
                
            prevBulletTime = new Date().getTime();
        }
        if (engine.Messages().getMessage("Q") == "down" 
                && globals.user.rockets > 0
                && canCreateMissile()) {
            
            rockets.push(new Rocket(engine, model.getPosition(),
                50.0, type, direction));
            
            prevRocketTime = new Date().getTime();
            setRockets(globals.user.rockets - 1);
        }
    }
    
    function canCreateBullet() {
        return (new Date().getTime() - prevBulletTime) > timer;
    }
    
    function canCreateMissile() {
        return (new Date().getTime() - prevRocketTime) > timer;
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
            
            if (obj.getName() != type && obj.getDamage !== undefined) {
                globals.user.currentHealth -= obj.getDamage();
                
                progress(hpBar, (globals.user.currentHealth / maxhp) * 100 + '%');
            }
        }
        
        
        if (globals.user.currentHealth <= 0) {
            alive = false;
            globals.user.currentHealth = 0;
        }
        
        return !alive;
    }
    
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}
