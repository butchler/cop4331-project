var Player = function (engine) {  
    var name = "ship";
    var speed = 0.5;
    
    var rotatedBy = "";
    
    var model = engine.Graphics().createModel(name, this);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        
        if (engine.Messages().getMessage("W") == "down") {
            model.moveY(speed);
        }
        
        
        if (engine.Messages().getMessage("S") == "down") {
            model.moveY(-speed);
        }
        
        
        if (engine.Messages().getMessage("A") == "down") {
            model.moveX(-speed);
            
            if (rotatedBy != "A") {
                model.rotateY(-45);
                rotatedBy = "A";
            }
        }
        
        
        if (engine.Messages().getMessage("D") == "down") {
            model.moveX(speed);
            
            if (rotatedBy != "D") {
                model.rotateY(45);
                rotatedBy = "D";
            }
        }
        
        
        if (engine.Messages().getMessage("A") == "up") {            
            if (rotatedBy == "A") {
                model.rotateY(45);
                rotatedBy = "";
            }
        }
        
        
        if (engine.Messages().getMessage("D") == "up") {
            if (rotatedBy == "D") {
                model.rotateY(-45);
                rotatedBy = "";
            }
        }
    }
}