var IngameCM = function (engine) {
    var entityCM = [new Player(engine)];
    
    this.draw = function () {
        for (var i = 0; i < entityCM.length; i++) entityCM[i].draw();
    }
    
    this.update = function () {
        for (var i = 0; i < entityCM.length; i++) entityCM[i].update();
    }
    
    this.collision = function() {
        for (var i = 0; i < entityCM.length; i++) entityCM[i].collision();
    }
    
    this.init = function () {
        
    }
}