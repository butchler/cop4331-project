var Player = function (engine) {  
    var name = "ship";
    var speed = 0.5;
    
    var XBOUNDS = 50;
    var YBOUNDS = 40;
    
    var hpBar = document.getElementById('hp');
    var hp = 100;
    var scale = 1;
    
    var rotatedBy = "";
    
    var model = engine.Graphics().createModel(name);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        if (engine.Messages().getMessage(" ") == "down") {
            hp -= scale;
            progress(hpBar, hp + '%');
        }
        
        
        if (engine.Messages().getMessage("W") == "down")
            model.moveY(speed);
        
        
        if (engine.Messages().getMessage("S") == "down")
            model.moveY(-speed);
        
        
        if (engine.Messages().getMessage("A") == "down")
            model.moveX(-speed);
        
        
        if (engine.Messages().getMessage("D") == "down")
            model.moveX(speed);
    }
    
    this.getModel = function() {
        return model;
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