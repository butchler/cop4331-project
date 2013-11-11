var IngameCM = function (engine) {
    var entityCM = [new Player(engine), new Cube(engine), new Bullet(engine)];
   
    this.draw = function () {       
        for (var i = 0; i < entityCM.length; i++) entityCM[i].draw();
    }
    
    this.update = function () {
        for (var i = 0; i < entityCM.length; i++) entityCM[i].update();  
    }
    
    this.collision = function() {
        for (var i = 0; i < entityCM.length; i++) {
            if (entityCM[i].collision()) {
                engine.Graphics().destroyModel(entityCM[i].getModel());
                
                if (entityCM.length == i+1)
                    entityCM.pop();
                else
                    entityCM[i] = entityCM.pop();                             
                
                i--;
            }
        }
    }
    
    this.init = function () {
        
    }
}