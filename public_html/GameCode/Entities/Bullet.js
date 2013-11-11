var Bullet = function(engine) {
    var name = "bullet";
    var speed = 0.5
    var repositioned = false;
    var visable = false;
    
    var model = engine.Graphics().createModel(name);
    
    this.draw = function () {
        if(visable){
            engine.Graphics().draw(model);
        }
    }
    
    this.update = function () {
        if (!repositioned) {
            repositioned = true;
            model.moveY(4);
        }
        
        model.rotateY(10);
        model.rotateX(10);
        
        if (engine.Messages().getMessage(" ") == "down") {
            visable = true;
                  
        }
        if(visable)
            model.moveY(speed*2);
        
        
        if (engine.Messages().getMessage("W") == "down" && !visable) {
            model.moveY(speed);
        }                
        if (engine.Messages().getMessage("S") == "down" && !visable) {
            model.moveY(-speed);
        }
        if (engine.Messages().getMessage("A") == "down" && !visable) {
            model.moveX(-speed);
        }
        if (engine.Messages().getMessage("D") == "down" && !visable) {
            model.moveX(speed);
        }
    }
    
    
    this.getModel = function() {
        return model;
    }
    this.isVisable = function() {
        return visable;
    }
    
    this.collision = function() {
        return model.isColliding();
    }
}