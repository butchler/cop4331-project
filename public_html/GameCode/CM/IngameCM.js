var IngameCM = function (engine) {
    var entityCM = [new Player(engine), new Cube(engine)];
    
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
                
                if (entityCM.length > 1)
                    entityCM[i] = entityCM.pop();
                else
                    entityCM.pop();
                
                i--;
            }
        }
    }
    
    this.init = function () {
        
    }
}