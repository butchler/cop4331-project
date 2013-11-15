var Player = function (engine) {  
    var type = 'player';
    var name = "ship";
    var speed = 0.5;
    
    var model = engine.Graphics().createModel(name, this);
    
    var XBOUNDS = 50;
    var YBOUNDS = 40;
    
    
    
    var hpBar = document.getElementById('hp');
    var hp = 100;
    
    
    var timer = 300, prevTime = new Date().getTime();
    
    
    
    
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
    
    this.collision = function() {
        var x = model.getPosition()[0];
        var y = model.getPosition()[1];
        
        
        if (y < -YBOUNDS) model.moveY(-YBOUNDS - y);
        if (y >  YBOUNDS) model.moveY( YBOUNDS - y);
        
        if (x < -XBOUNDS) model.moveX(-XBOUNDS - x);
        if (x >  XBOUNDS) model.moveX( XBOUNDS - x);
        
        return model.isColliding();
    }
}